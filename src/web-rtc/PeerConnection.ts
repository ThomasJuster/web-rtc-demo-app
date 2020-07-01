import { SocketAPI } from '@rtc-demo/api'

const ICE_SERVERS: RTCIceServer[] = [
  // { urls: 'stun:stunserver.org:3478' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'turn:137.74.113.202:3478', username: 'azfne', credential: 'oegiojre' },
]

type PeerConnectionListener = (event: Event) => unknown

interface PeerConnectionInit {
  localPeerId: string;
  remotePeerId: string;
  localStream: MediaStream;
  socketAPI: SocketAPI;
}
// NOTE: A connection involves two peers, the local peer and the remote one.
export class PeerConnection {
  public connection: RTCPeerConnection
  public localPeerId: string
  public remotePeerId: string
  public remoteStream: MediaStream | null;
  private socketAPI: SocketAPI

  constructor (params: PeerConnectionInit) {
    this.localPeerId = params.localPeerId
    this.remotePeerId = params.remotePeerId
    this.socketAPI = params.socketAPI
    this.connection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    this.remoteStream = null

    params.localStream.getTracks().map((track) => this.connection.addTrack(track, params.localStream))
    this.registerICECandidatesListener()

    this.connection.addEventListener('track', (event) => {
      [this.remoteStream] = event.streams
      // const [remoteStream] = event.streams
      // this.video.srcObject = remoteStream
    })
  }

  public onClose (listener: PeerConnectionListener): PeerConnection {
    this.connection.addEventListener('connectionstatechange', (event) => {
      console.debug('connection state change', event, 'connection state:', this.connection.connectionState)
      switch (this.connection.connectionState) {
        case 'closed':
        case 'disconnected':
        case 'failed':
          listener(event)
          break
        default:
          break
      }
    })
    return this
  }

  public applyRemoteStream (video: HTMLVideoElement): PeerConnection {
    video.srcObject = this.remoteStream
    return this
  }

  private registerICECandidatesListener (): PeerConnection {
    // NOTE: the icecandidate event is trigger AFTER creating an offer/answer.
    // As soon as we have the local peer’s ice candidates, we send them to the remote peer so that
    // both peers add the ICE candidates of the other peer.
    this.connection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) return
      console.debug('emit ICE candidate to', this.remotePeerId, event.candidate)
      this.socketAPI.send({
        type: 'ice-candidate',
        candidate: event.candidate,
        fromPeerId: this.localPeerId,
        toPeerId: this.remotePeerId,
      })
    })

    // when receiving a remote peer’s ICE candidates, we can add them to the PeerConnection to make the connection effective
    // without ICE candidates, the connection would exist but it’d be useless, it’s ICE candidates that allow exchanging data
    this.socketAPI.onIceCandidate((data) => {
      if (data.type !== 'ice-candidate') return
      console.debug(this.localPeerId, 'receive ice candidate from', data.fromPeerId, data.candidate)
      this.connection.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(console.error)
    })

    this.connection.addEventListener('iceconnectionstatechange', (event) => {
      console.debug('ice connection state change', event, this.connection.iceConnectionState)
    })

    return this
  }
}
