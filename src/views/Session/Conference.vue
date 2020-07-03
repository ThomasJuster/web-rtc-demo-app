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
    console: console,
  }),

  methods: {
    submitChatMessage () {
      console.debug('SessionConference: send message', this.chatMessage, this)
      this.peersManager.sendChatMessage(this.chatMessage)
      this.chatMessage = ''
    },

    onPeerConnection (peerConnection) {
      this.peers.push(peerConnection.remotePeerId)
      let remoteStream = null // as long as the HTML video is not defined, we store the remoteStream in that variable
      const setRemoteStream = (event) => { remoteStream = event.detail }
      peerConnection.addEventListener('remotestream', setRemoteStream)

      this.$nextTick(() => {
        peerConnection.removeEventListener('remotestream', setRemoteStream)
        const video = this.$refs[`video-${peerConnection.remotePeerId}`]
        video.srcObject = remoteStream
        peerConnection.addEventListener('remotestream', (event) => {
          video.srcObject = event.detail
        })
      })
    },

    onChatMessage (chatDataMessage) {
      this.messages.push(chatDataMessage)
    },

    openDrawer () {
      this.isChatDrawerOpened = true
      this.$refs['chat-input'].focus()
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
    <h3>{{ `Conference ${$route.query.sessionName} − ${localPeerId}` }}</h3>
    <p>
      <button v-on:click="openDrawer">{{ 'Open chat' }}</button>
    </p>
    <Drawer position="left" :open="isChatDrawerOpened" v-on:close="isChatDrawerOpened = false">
      <div class="chat-messages">
        {{ console.info('before v-for', { messages }) }}
        <template v-for="(data, index) in messages">
          <div :key="index" class="bubble" :class="data.author === localPeerId ? 'local-peer' : 'remote-peer'">
            {{ console.info('v-for messages', { index, data }) }}
            <div class="author">{{ data.author }}</div>
            <div>{{ data.message }}</div>
          </div>
        </template>
      </div>
      <form class="chat-form" v-on:submit.prevent="submitChatMessage">
        <input name="message" ref="chat-input" v-model="chatMessage" placeholder="Type something…" required>
        <button type="submit">{{ 'Send 👻' }}</button>
      </form>
    </Drawer>
    <video ref="local-peer-video" playsinline="" autoplay="" muted=""></video>
    <video v-for="peer in peers" :key="peer" :ref="`video-${peer}`" playsinline="" autoplay=""></video>
    <template v-for="peer in peers">
      {{ console.info('v-for peer', { peer }) }}
    </template>
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
