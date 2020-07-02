import { SocketAPI, SocketMessage } from '@web-rtc-demo/shared'
import { PeerConnection } from './PeerConnection'

type PeerId = string

export const connectedPeers: Map<PeerId, PeerConnection> = new Map()

const RTC_OFFER_OPTIONS: RTCOfferOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
  voiceActivityDetection: true,
}

interface PeersInit {
  socketAPI: SocketAPI;
  localPeerId: string;
  localStream: MediaStream;
}
export class PeersManager {
  public peerConnections: Map<PeerId, PeerConnection>
  private localPeerId: string
  private localStream: MediaStream
  private socketAPI: SocketAPI

  constructor ({ socketAPI, localPeerId, localStream }: PeersInit) {
    this.socketAPI = socketAPI
    this.localPeerId = localPeerId
    this.localStream = localStream
    this.peerConnections = new Map()

    socketAPI.onConnectedPeers((socketMessage) => this.onConnectedPeers(socketMessage))
    socketAPI.onOffer((socketMessage) => this.onOffer(socketMessage))
    socketAPI.onAnswer((socketMessage) => this.onAnswer(socketMessage))
  }

  public getPeerConnection (remotePeerId: string): PeerConnection {
    const peerConnection = this.peerConnections.get(remotePeerId)
    if (!peerConnection) {
      console.debug('PeersManager: available peer connections', this.peerConnections, this)
      throw new Error(`No peer connection with remote peer ${remotePeerId}`)
    }
    return peerConnection
  }

  public closeAllConnections () {
    this.socketAPI.close()
  }

  // When the local peer arrives on the session, it receives the current remote peers
  // With that information, the local peer sends an offer to each remote peer
  private onConnectedPeers (socketMessage: SocketMessage): void {
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
        this.peerConnections.set(remotePeerId, peerConnection)

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
  private async onOffer (socketMessage: SocketMessage): Promise<void> {
    if (socketMessage.type !== 'offer') throw new Error('Invalid offer socket message')

    console.debug('PeersManager: received offer', socketMessage, this.peerConnections, this)
    // if the local peer received an offer, it means there’s a new (remote) kid in town !
    const peerConnection = new PeerConnection({
      localPeerId: this.localPeerId,
      remotePeerId: socketMessage.offererId,
      localStream: this.localStream,
      socketAPI: this.socketAPI
    })
    this.peerConnections.set(socketMessage.offererId, peerConnection)

    // create the answer, apply it to the peer connection
    await peerConnection.connection.setRemoteDescription(socketMessage.description)
    const answer = await peerConnection.connection.createAnswer(RTC_OFFER_OPTIONS)
    await peerConnection.connection.setLocalDescription(answer)

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
  private onAnswer (socketMessage: SocketMessage): void {
    if (socketMessage.type !== 'answer') throw new Error('Invalid answer socket message')

    console.debug('PeersManager: received answer', socketMessage, this.peerConnections, this)
    const peerConnection = this.getPeerConnection(socketMessage.answererId)

    // Accept the answer
    peerConnection.connection.setRemoteDescription(socketMessage.description)
  }
}
