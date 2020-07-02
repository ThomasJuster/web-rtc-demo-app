type ChatDataMessage =
  | { type: 'chat-message'; author: string; content: string }

function parseChatMessage (event: MessageEvent): ChatDataMessage {
  const chatDataMessage = JSON.parse(event.data.toString('utf-8')) as ChatDataMessage
  switch (chatDataMessage.type) {
    case 'chat-message':
      return chatDataMessage
    default:
      throw new Error('Invalid data message')
  }
}

type Listener = (chatDataMessage: ChatDataMessage) => unknown

interface PeerChatAPIInit {
  dataChannel: RTCDataChannel;
  localPeerId: string;
  chatMessagesRootNode: HTMLElement;
}

export class PeerChatAPI {
  public dataChannel: RTCDataChannel
  private localPeerId: string
  private chatMessagesRootNode: HTMLElement

  constructor ({ dataChannel, localPeerId, chatMessagesRootNode }: PeerChatAPIInit) {
    this.dataChannel = dataChannel
    this.localPeerId = localPeerId
    this.chatMessagesRootNode = chatMessagesRootNode

    dataChannel.addEventListener('open', () => console.debug('data channel opened', localPeerId))
    dataChannel.addEventListener('close', () => console.debug('data channel closed', localPeerId))
    dataChannel.addEventListener('error', (event) => console.error(event.error))
    this.onChatMessage((chatDataMessage) => {
      console.debug('PeerChatAPI: received chat message', chatDataMessage, this)
      this.appendMessageNode(chatDataMessage.content, chatDataMessage.author)
    })
  }

  public onChatMessage (listener: Listener): PeerChatAPI {
    this.dataChannel.addEventListener('message', (event) => {
      console.debug('PeerChatAPI: onmessage listener execution')
      const chatDataMessage = parseChatMessage(event)
      if (chatDataMessage.type !== 'chat-message') return
      listener(chatDataMessage)
    })
    return this
  }

  public sendMessage (message: string): PeerChatAPI {
    const chatDataMessage: ChatDataMessage = {
      type: 'chat-message',
      author: this.localPeerId,
      content: message,
    }
    console.debug('PeerChatAPI: sendMessage', chatDataMessage, this)
    this.dataChannel.send(JSON.stringify(chatDataMessage))
    this.appendMessageNode(message, this.localPeerId)
    return this
  }

  private appendMessageNode (message: string, author: string) {
    const divBubble = this.chatMessagesRootNode.appendChild(document.createElement('div'))
    divBubble.className = 'bubble ' + (author === this.localPeerId ? 'local-peer' : 'remote-peer')
    const divAuthor = divBubble.appendChild(document.createElement('div'))
    divAuthor.className = 'author'
    divAuthor.textContent = author
    const divMessage = divBubble.appendChild(document.createElement('div'))
    divMessage.textContent = message
  }
}
