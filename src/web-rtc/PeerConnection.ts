import { SocketAPI } from '@web-rtc-demo/shared'
import { PeerChatAPI } from './PeerChatAPI'

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
  chatMessagesRootNode: HTMLElement;
}
// NOTE: A connection involves two peers, the local peer and the remote one.
export class PeerConnection {
  public connection: RTCPeerConnection
  public localPeerId: string
  public remotePeerId: string
  public peerChatAPI: PeerChatAPI | null
  private remoteStream: MediaStream | null
  private remotePeerVideo: HTMLVideoElement | null
  private chatMessagesRootNode: HTMLElement
  private socketAPI: SocketAPI

  constructor (params: PeerConnectionInit) {
    this.localPeerId = params.localPeerId
    this.remotePeerId = params.remotePeerId
    this.socketAPI = params.socketAPI
    this.connection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    this.remoteStream = null
    this.remotePeerVideo = null
    this.peerChatAPI = null
    this.chatMessagesRootNode = params.chatMessagesRootNode

    params.localStream.getTracks().map((track) => this.connection.addTrack(track, params.localStream))
    this.registerICECandidatesListener()

    this.connection.addEventListener('track', (event) => {
      [this.remoteStream] = event.streams
      console.debug('PeerConnection: received remote stream')
      if (this.remotePeerVideo) this.remotePeerVideo.srcObject = this.remoteStream
    })

    this.connection.addEventListener('datachannel', (event) => {
      console.debug('PeerConnection: received datachannel')
      this.setChatDataChannel(event.channel)
    })
  }

  public onClose (listener: PeerConnectionListener): PeerConnection {
    this.connection.addEventListener('connectionstatechange', (event) => {
      console.debug('PeerConnection: connection state change', event, 'connection state:', this.connection.connectionState)
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

  public registerVideo (video: HTMLVideoElement): PeerConnection {
    this.remotePeerVideo = video
    console.debug('PeerConnection: registerVideo()')
    if (this.remoteStream) this.remotePeerVideo.srcObject = this.remoteStream
    return this
  }

  public unregisterVideo (): PeerConnection {
    this.remotePeerVideo = null
    return this
  }

  public createChatDataChannel () {
    console.debug('PeerConnection: create and share datachannel')
    this.setChatDataChannel(this.connection.createDataChannel('chat', { priority: 'high' }))
  }

  public setChatDataChannel (dataChannel: RTCDataChannel) {
    this.peerChatAPI = new PeerChatAPI({
      dataChannel,
      chatMessagesRootNode: this.chatMessagesRootNode,
      localPeerId: this.localPeerId
    })
    this.onClose(() => {
      if (this.peerChatAPI) this.peerChatAPI.dataChannel.close()
    })
  }

  private registerICECandidatesListener (): PeerConnection {
    // NOTE: the icecandidate event is trigger AFTER creating an offer/answer.
    // As soon as we have the local peer’s ice candidates, we send them to the remote peer so that
    // both peers add the ICE candidates of the other peer.
    this.connection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) return
      // console.debug('PeerConnection: emit ICE candidate to', this.remotePeerId, event.candidate)
      // console.debug('PeerConnection: PeerConnection send ICE candidates')
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
      // console.debug('PeerConnection:', this.localPeerId, 'receive ice candidate from', data.fromPeerId, data.candidate)
      this.connection.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(console.error)
    })

    // this.connection.addEventListener('iceconnectionstatechange', (event) => {
    //   console.debug('PeerConnection: ice connection state change', event, this.connection.iceConnectionState)
    // })

    return this
  }
}
