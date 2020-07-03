<script>
import Drawer from '../../components/Drawer.vue'
import { SOCKET_ROUTE, SocketAPI } from '@web-rtc-demo/shared'
import { PeersManager } from '../../web-rtc/PeersManager'

export default {
  name: 'SessionConference',
  components: {
    Drawer,
  },
  props: {
    localStream: MediaStream,
    localPeerId: String,
  },
  data: () => ({
    isChatDrawerOpened: false,
    chatMessage: '',
    peersManager: null,
    peers: [],
    messages: [],
  }),

  methods: {
    submitChatMessage () {
      console.debug('SessionConference: send message', this.chatMessage, this)
      this.peersManager.sendChatMessage(this.chatMessage)
      this.chatMessage = ''
    },

    onPeerConnection (peerConnection) {
      this.peers.push(peerConnection.remotePeerId)
      // on next tick, the video is appended to the DOM, so its $ref is accessible
      this.$nextTick(() => {
        peerConnection.addEventListener('remotestream', (event) => {
          const remoteStream = event.detail
          this.$refs[`video-${peerConnection.remotePeerId}`].srcObject = remoteStream
        })
      })
    },

    onChatMessage (chatDataMessage) {
      this.messages.push(chatDataMessage)
    },
  },

  async mounted () {
    this.$refs['local-peer-video'].srcObject = this.localStream

    const { serverUrl, sessionName } = this.$route.query
    const socketBaseUrl = new URL(serverUrl)
    socketBaseUrl.protocol = window.location.protocol.replace('http', 'ws')
    const url = SOCKET_ROUTE
      .replace('{sessionName}', sessionName)
      .replace('{peerId}', this.localPeerId)
    const socketAPI = new SocketAPI({
      url: new URL(url, socketBaseUrl).href,
      sessionName,
      peerId: this.localPeer,
    })

    this.peersManager = new PeersManager({
      socketAPI,
      localPeerId: this.localPeerId,
      localStream: this.localStream,
    })
    // listen to new connections
    this.peersManager.addEventListener('peerconnection', (event) => {
      this.onPeerConnection(event.detail)
    })

    // listen to new messages
    this.peersManager.addEventListener('chatmessage', (event) => {
      this.onChatMessage(event.detail)
    })
  },

  beforeDestroy () {
    console.info('beforeDestroy()')
    if (this.peersManager) {
      this.peersManager.closeAllConnections()
    }
  },
}
</script>

<template>
  <div>
    <h3>{{ `Conference ${$route.query.sessionName} − ${ localPeerId}` }}</h3>
    <p>
      <button v-on:click="isChatDrawerOpened = true">{{ 'Open chat' }}</button>
    </p>
    <Drawer position="left" :open="isChatDrawerOpened" v-on:close="isChatDrawerOpened = false">
      <div class="chat-messages">
        <div v-for="({ author, message }, index) of messages" :key="index" class="bubble" :class="author === localPeerId ? 'local-peer' : 'remote-peer'">
          <div class="author">{{ author }}</div>
          <div>{{ message }}</div>
        </div>
      </div>
      <form class="chat-form" v-on:submit.prevent="submitChatMessage">
        <input name="message" v-model="chatMessage" placeholder="Type something…" required>
        <button type="submit">{{ 'Send 👻' }}</button>
      </form>
    </Drawer>
    <video ref="local-peer-video" playsinline autoplay muted></video>
    <video v-for="peer of peers" :key="peer" :ref="`video-${peer}`" playsinline autoplay></video>
  </div>
</template>

<style>
.chat-messages {
  padding: 2em 1em;
  max-height: calc(100% - 10em);
  overflow: auto;
}
.chat-messages .bubble {
  padding: .5em;
  border-radius: 3px;
  color: white;
  max-width: 70%;
  margin: 1em 0;
}
.bubble.local-peer {
  background: cadetblue;
  margin-left: auto;
}
.bubble.remote-peer {
  background: crimson;
  margin-right: auto;
}
.chat-messages .author {
  font-weight: bold;
  font-size: 1.1em;
  padding: .25em;
}
.chat-form {
  padding: 0.5em 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 2em);
}
</style>
