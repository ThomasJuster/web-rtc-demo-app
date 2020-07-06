import { SocketApi } from '@web-rtc-demo/shared'
import { PeerChatAPI } from './PeerChatAPI'

const ICE_SERVERS: RTCIceServer[] = [
  // { urls: 'stun:stunserver.org:3478' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'turn:137.74.113.202:3478', username: 'azfne', credential: 'oegiojre' },
]

interface PeerConnectionInit {
  localPeerId: string;
  remotePeerId: string;
  localStream: MediaStream;
  socketAPI: SocketApi;
}

// NOTE: A connection involves two peers, the local peer and the remote one.
export class PeerConnection extends EventTarget {
  public connection: RTCPeerConnection
  public localPeerId: string
  public remotePeerId: string
  public peerChatAPI: PeerChatAPI | null
  private socketAPI: SocketApi

  constructor (params: PeerConnectionInit) {
    super()
    this.localPeerId = params.localPeerId
    this.remotePeerId = params.remotePeerId
    this.socketAPI = params.socketAPI
    this.connection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    this.peerChatAPI = null

    this.setLocalStream(params.localStream)
    this.registerICECandidatesListener()

    this.connection.addEventListener('track', (event) => {
      console.debug('PeerConnection: received remote stream')
      this.dispatchRemoteStreamEvent(event.streams[0])
    })

    this.connection.addEventListener('datachannel', (event) => {
      console.debug('PeerConnection: received datachannel')
      this.setChatDataChannel(event.channel)
    })

    this.connection.addEventListener('connectionstatechange', (event) => {
      console.debug('PeerConnection: connection state change', event, 'connection state:', this.connection.connectionState)
      switch (this.connection.connectionState) {
        case 'closed':
        case 'disconnected':
        case 'failed':
          this.dispatchConnectionCloseEvent()
          break
        default:
          break
      }
    })
  }

  public setLocalStream (stream: MediaStream): void {
    stream.getTracks().map((track) => this.connection.addTrack(track, stream))
  }

  public createChatDataChannel () {
    console.debug('PeerConnection: create and share datachannel')
    this.setChatDataChannel(this.connection.createDataChannel('chat', { priority: 'high' }))
  }

  public setChatDataChannel (dataChannel: RTCDataChannel) {
    this.peerChatAPI = new PeerChatAPI({
      dataChannel,
      localPeerId: this.localPeerId
    })
    this.dispatchChatApiOpen(this.peerChatAPI)
    this.addEventListener('connectionclose', () => {
      if (this.peerChatAPI) this.peerChatAPI.dataChannel.close()
    })
  }

  private dispatchChatApiOpen (peerChatAPI: PeerChatAPI): void {
    this.dispatchEvent(new CustomEvent('chatapiopen', { detail: peerChatAPI }))
  }

  private dispatchConnectionCloseEvent (): void {
    this.dispatchEvent(new Event('connectionclose'))
  }

  private dispatchRemoteStreamEvent (stream: MediaStream): void {
    this.dispatchEvent(new CustomEvent('remotestream', { detail: stream }))
  }

  private registerICECandidatesListener (): void {
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
  }
}

export interface PeerConnection extends EventTarget {
  addEventListener (type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  addEventListener (type: 'remotestream', listener: Listener<CustomEvent<MediaStream>>): void;
  addEventListener (type: 'connectionclose', listener: Listener<Event>): void;
  addEventListener (type: 'chatapiopen', listener: Listener<CustomEvent<PeerChatAPI>>): void;
  removeEventListener (type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener (type: 'remotestream', listener: Listener): void;
  removeEventListener (type: 'connectionclose', listener: Listener): void;
  removeEventListener (type: 'chatapiopen', listener: Listener): void;
  dispatchEvent (event: Event): boolean;
  dispatchEvent (event: CustomEvent<MediaStream>): void;
  dispatchEvent (event: CustomEvent<PeerChatAPI>): void;
}
