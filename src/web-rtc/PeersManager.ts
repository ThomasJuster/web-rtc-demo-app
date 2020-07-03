import { SocketAPI, SocketMessage } from '@web-rtc-demo/shared'
import { PeerConnection } from './PeerConnection'
import { ChatDataMessage } from './PeerChatAPI'

type PeerId = string

export const connectedPeers: Map<PeerId, PeerConnection> = new Map()

const RTC_OFFER_OPTIONS: RTCOfferOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
  voiceActivityDetection: true,
}

interface PeersManagerInit {
  socketAPI: SocketAPI;
  localPeerId: string;
  localStream: MediaStream;
}
export class PeersManager extends EventTarget {
  public peerConnections: Map<PeerId, PeerConnection>
  private localPeerId: string
  private localStream: MediaStream
  private socketAPI: SocketAPI
  private chatMessages: ChatDataMessage[]

  constructor ({ socketAPI, localPeerId, localStream }: PeersManagerInit) {
    super()
    this.socketAPI = socketAPI
    this.localPeerId = localPeerId
    this.localStream = localStream
    this.peerConnections = new Map()
    this.chatMessages = []

    socketAPI.onConnectedPeers((socketMessage) => this.sendOfferToConnectedPeers(socketMessage))
    socketAPI.onOffer((socketMessage) => this.answerToReceivedOffer(socketMessage))
    socketAPI.onAnswer((socketMessage) => this.acceptReceivedAnswer(socketMessage))
    this.sendChatMessage = this.sendChatMessage.bind(this)
    this.closeAllConnections = this.closeAllConnections.bind(this)
  }

  public closeAllConnections () {
    this.socketAPI.close()
  }

  public sendChatMessage (message: string) {
    console.info('peer connections', this.peerConnections)
    this.peerConnections.forEach((peerConnection) => {
      console.debug('PeersManager: sendChatMessage', message, peerConnection, this)
      if (!peerConnection.peerChatAPI) {
        window.alert('He-hem, wait a bit')
      } else {
        peerConnection.peerChatAPI.sendChatMessage(message)
      }
    })
  }

  private getPeerConnection (remotePeerId: string): PeerConnection {
    const peerConnection = this.peerConnections.get(remotePeerId)
    if (!peerConnection) {
      console.debug('PeersManager: available peer connections', this.peerConnections, this)
      throw new Error(`No peer connection with remote peer ${remotePeerId}`)
    }
    return peerConnection
  }

  private dispatchPeerConnectionEvent (peerConnection: PeerConnection): void {
    this.dispatchEvent(new CustomEvent('peerconnection', { detail: peerConnection }))
  }

  private dispatchChatMessageEvent (message: ChatDataMessage): void {
    this.chatMessages = [...this.chatMessages, message]
    this.dispatchEvent(new CustomEvent('chatmessage', { detail: this.chatMessages }))
  }

  private setPeerConnection (remotePeerId: string, peerConnection: PeerConnection): void {
    peerConnection.addEventListener('chatapiopen', (event) => {
      const peerChatAPI = event.detail
      const forwardChatMessage = (event: CustomEvent<ChatDataMessage>) => this.dispatchChatMessageEvent(event.detail)
      peerChatAPI.addEventListener('chatmessage', forwardChatMessage)
      peerChatAPI.dataChannel.addEventListener('close', () => peerChatAPI.removeEventListener('chatmessage', forwardChatMessage))
    })
    this.peerConnections.set(remotePeerId, peerConnection)
    this.dispatchPeerConnectionEvent(peerConnection)
  }

  // When the local peer arrives on the session, it receives the current remote peers
  // With that information, the local peer sends an offer to each remote peer
  private sendOfferToConnectedPeers (socketMessage: SocketMessage): void {
    if (socketMessage.type !== 'connected-peers-id') throw new Error('Invalid connected peers message')
    console.debug('PeersManager: connected-peers-id', socketMessage, this)
    const promises = socketMessage.peerIds
      .filter((peerId) => peerId !== this.localPeerId)
      .map(async (remotePeerId) => {
        // Create the connection object
        const peerConnection = new PeerConnection({
          localPeerId: this.localPeerId,
          remotePeerId,
          localStream: this.localStream,
          socketAPI: this.socketAPI,
        })
        console.debug('PeersManager: set peer connection with', remotePeerId, this)
        this.setPeerConnection(remotePeerId, peerConnection)

        console.debug('PeersManager: before offer, create chat data channel')
        peerConnection.createChatDataChannel()

        // Create an offer
        const offer = await peerConnection.connection.createOffer(RTC_OFFER_OPTIONS)
        await peerConnection.connection.setLocalDescription(offer)

        console.debug('PeersManager: send offer to peer', remotePeerId, this)
        // Send the offer to the remote peer
        this.socketAPI.send({
          type: 'offer',
          description: offer,
          offererId: this.localPeerId,
          answererId: remotePeerId,
        })
      })
    Promise.all(promises).catch(console.error)
  }

  // When receiving an offer, the local peer should accept the offer by sending an answer back to the remote peer
  private async answerToReceivedOffer (socketMessage: SocketMessage): Promise<void> {
    if (socketMessage.type !== 'offer') throw new Error('Invalid offer socket message')

    console.debug('PeersManager: received offer', socketMessage, this.peerConnections, this)
    // if the local peer received an offer, it means there’s a new (remote) kid in town !
    const peerConnection = new PeerConnection({
      localPeerId: this.localPeerId,
      remotePeerId: socketMessage.offererId,
      localStream: this.localStream,
      socketAPI: this.socketAPI,
    })
    this.setPeerConnection(socketMessage.offererId, peerConnection)

    // create the answer, apply it to the peer connection
    await peerConnection.connection.setRemoteDescription(socketMessage.description)
    const answer = await peerConnection.connection.createAnswer(RTC_OFFER_OPTIONS)
    await peerConnection.connection.setLocalDescription(answer)

    console.debug('PeersManager: before answer, add listener on "datachannel"')
    peerConnection.connection.addEventListener('datachannel', (event) => {
      console.debug('PeersManager: "datachannel" event triggered', event, this)
      if (event.channel.label !== 'chat') return
      peerConnection.setChatDataChannel(event.channel)
    })

    console.debug('PeersManager: send answer', this)
    // send the answer to the remote peer
    this.socketAPI.send({
      type: 'answer',
      answererId: this.localPeerId,
      offererId: socketMessage.offererId,
      description: answer,
    })
  }

  // when receiving an answer, the local peer should accept the remote peer’s and notify the remote peer s⋅he did accept the answer
  private acceptReceivedAnswer (socketMessage: SocketMessage): void {
    if (socketMessage.type !== 'answer') throw new Error('Invalid answer socket message')

    console.debug('PeersManager: received answer', socketMessage, this.peerConnections, this)
    const peerConnection = this.getPeerConnection(socketMessage.answererId)

    // Accept the answer
    peerConnection.connection.setRemoteDescription(socketMessage.description)
  }
}

export interface PeersManager extends EventTarget {
  addEventListener (type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  addEventListener (type: 'peerconnection', listener: Listener<CustomEvent<PeerConnection>>): void;
  addEventListener (type: 'chatmessage', listener: Listener<CustomEvent<ChatDataMessage[]>>): void;
  removeEventListener (type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener (type: 'peerconnection', listener: Listener<CustomEvent<PeerConnection>>): void;
  removeEventListener (type: 'chatmessage', listener: Listener<CustomEvent<ChatDataMessage[]>>): void;
  dispatchEvent (event: Event): boolean;
  dispatchEvent (event: CustomEvent<PeerConnection>): void;
  dispatchEvent (event: CustomEvent<ChatDataMessage[]>): void;
}
