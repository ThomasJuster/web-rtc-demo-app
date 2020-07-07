import { SocketApi } from '@web-rtc-demo/shared'
import { PeerChatApi } from './PeerChatApi'

const ICE_SERVERS: RTCIceServer[] = [
  // { urls: 'stun:stunserver.org:3478' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'turn:137.74.113.202:3478', username: 'azfne', credential: 'oegiojre' },
]

interface PeerConnectionInit {
  localPeerId: string;
  remotePeerId: string;
  localStream: MediaStream;
  socketApi: SocketApi;
}

// NOTE: A connection involves two peers, the local peer and the remote one.
export class PeerConnection extends EventTarget {
  public connection: RTCPeerConnection
  public localPeerId: string
  public remotePeerId: string
  public peerChatApi: PeerChatApi | null
  public dataChannels: Map<string, RTCDataChannel>
  private socketApi: SocketApi

  constructor (params: PeerConnectionInit) {
    super()
    this.localPeerId = params.localPeerId
    this.remotePeerId = params.remotePeerId
    this.socketApi = params.socketApi
    this.connection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    this.peerChatApi = null
    this.dataChannels = new Map()

    this.setLocalStream(params.localStream)
    this.registerICECandidatesListener()

    this.connection.addEventListener('track', (event) => {
      console.debug('PeerConnection: received remote stream')
      this.dispatchRemoteStreamEvent(event.streams[0])
    })

    this.connection.addEventListener('datachannel', (event) => {
      console.debug('PeerConnection: received datachannel')
      this.setDataChannel(event.channel)
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
    this.connection.getSenders().forEach((sender) => {
      console.info('PeerConnection: remove sender', sender)
      this.connection.removeTrack(sender)
    })
    stream.getTracks().forEach((track) => {
      console.info('PeerConnection: add track', track, stream)
      this.connection.addTrack(track, stream)
    })
  }

  public createDataChannel (label: string, options?: RTCDataChannelInit): void {
    console.debug('PeerConnection: createDataChannel')
    this.setDataChannel(this.connection.createDataChannel(label, options))
  }

  private setDataChannel (dataChannel: RTCDataChannel): void {
    this.dataChannels.set(dataChannel.label, dataChannel)
    this.dispatchEvent(new CustomEvent('datachannelopen', { detail: dataChannel }))
    this.addEventListener('connectionclose', () => {
      dataChannel.close()
      this.dataChannels.delete(dataChannel.label)
    })
    if (dataChannel.label === 'chat') {
      this.setPeerChatApi(dataChannel)
    }
  }

  private setPeerChatApi (dataChannel: RTCDataChannel) {
    this.peerChatApi = new PeerChatApi({
      dataChannel,
      localPeerId: this.localPeerId
    })
    this.dispatchChatApiOpen(this.peerChatApi)
  }

  private dispatchChatApiOpen (peerChatAPI: PeerChatApi): void {
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
      this.socketApi.send({
        type: 'ice-candidate',
        candidate: event.candidate,
        fromPeerId: this.localPeerId,
        toPeerId: this.remotePeerId,
      })
    })

    // when receiving a remote peer’s ICE candidates, we can add them to the PeerConnection to make the connection effective
    // without ICE candidates, the connection would exist but it’d be useless, it’s ICE candidates that allow exchanging data
    this.socketApi.onIceCandidate((data) => {
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
  addEventListener (type: 'chatapiopen', listener: Listener<CustomEvent<PeerChatApi>>): void;
  removeEventListener (type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener (type: 'remotestream', listener: Listener): void;
  removeEventListener (type: 'connectionclose', listener: Listener): void;
  removeEventListener (type: 'chatapiopen', listener: Listener): void;
  dispatchEvent (event: Event): boolean;
  dispatchEvent (event: CustomEvent<MediaStream>): void;
  dispatchEvent (event: CustomEvent<PeerChatApi>): void;
}
