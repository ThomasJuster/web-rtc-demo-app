export type ChatDataMessage =
  | { type: 'chat-message'; author: string; message: string }

function parseChatMessage (event: MessageEvent): ChatDataMessage {
  const chatDataMessage = JSON.parse(event.data.toString('utf-8')) as ChatDataMessage
  switch (chatDataMessage.type) {
    case 'chat-message':
      return chatDataMessage
    default:
      throw new Error('Invalid data message')
  }
}

interface PeerChatAPIInit {
  dataChannel: RTCDataChannel;
  localPeerId: string;
}

export class PeerChatAPI extends EventTarget {
  public dataChannel: RTCDataChannel
  private localPeerId: string

  constructor ({ dataChannel, localPeerId }: PeerChatAPIInit) {
    super()
    this.dataChannel = dataChannel
    this.localPeerId = localPeerId

    dataChannel.addEventListener('open', () => console.debug('data channel opened', localPeerId))
    dataChannel.addEventListener('close', () => console.debug('data channel closed', localPeerId))
    dataChannel.addEventListener('error', (event) => console.error(event.error))
    dataChannel.addEventListener('message', (event) => {
      const chatDataMessage = parseChatMessage(event)
      console.debug('PeerChatAPI: received chat message', chatDataMessage, this)
      this.dispatchChatMessageEvent(chatDataMessage)
    })
  }

  public sendChatMessage (message: string): PeerChatAPI {
    const chatDataMessage: ChatDataMessage = {
      type: 'chat-message',
      author: this.localPeerId,
      message,
    }
    console.debug('PeerChatAPI: sendMessage', chatDataMessage, this)
    this.dataChannel.send(JSON.stringify(chatDataMessage))
    this.dispatchChatMessageEvent(chatDataMessage)
    return this
  }

  private dispatchChatMessageEvent (chatDataMessage: ChatDataMessage) {
    this.dispatchEvent(new CustomEvent('chatmessage', { detail: chatDataMessage }))
  }
}

export interface PeerChatAPI extends EventTarget {
  addEventListener (type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  addEventListener (type: 'chatmessage', listener: Listener<CustomEvent<ChatDataMessage>>): void;
  removeEventListener (type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener (type: 'chatmessage', listener: Listener<CustomEvent<ChatDataMessage>>): void;
  dispatchEvent (event: Event): boolean;
  dispatchEvent (event: CustomEvent<ChatDataMessage>): void;
}
