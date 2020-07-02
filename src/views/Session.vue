<script>
import { SocketAPI, SOCKET_ROUTE, ServerAPI } from '@web-rtc-demo/shared'
import Modal from '../components/Modal.vue'
import Drawer from '../components/Drawer.vue'
import { PeersManager } from '../web-rtc/PeersManager'

function getRandomPeerId () {
  const id = Math.round(Math.random() * 100000)
  return `peer-${id}`
}

export default {
  name: 'Session',
  components: {
    Modal,
    Drawer,
  },
  data: () => ({
    joinSessionLoading: false,
    canJoinSession: undefined,
    unableToReachServer: undefined,
    error: undefined,

    isChatDrawerOpened: false,
    chatMessage: '',

    isLocalPeerSetupReady: false,
    localStream: null,
    localPeerId: getRandomPeerId(), // must NOT be changed accross component lifetime

    peersManager: null,
  }),

  async mounted () {
    const { serverUrl, password, sessionName } = this.$route.query
    const serverAPI = new ServerAPI({ url: new URL(serverUrl).origin })
    if (typeof sessionName !== 'string') throw new Error('sessionName should be a string')

    this.joinSessionLoading = true
    console.info('local peer id', this.localPeerId)
    try {
      const joinSessionResult = await serverAPI.joinSession(sessionName, password)
      this.canJoinSession = joinSessionResult.ok
    } catch (error) {
      console.error(error)
      this.unableToReachServer = true
    }
    this.joinSessionLoading = false
    if (!this.canJoinSession || this.unableToReachServer) return

    await this.askLocalStream()
  },

  errorCaptured (error) {
    this.error = error
  },

  beforeDestroy () {
    console.info('beforeDestroy()')
    if (this.peersManager) {
      this.peersManager.closeAllConnections()
    }
  },

  methods: {
    finishInitialSetup () {
      this.isLocalPeerSetupReady = true
      this.$nextTick(() => {
        this.$refs['local-peer-video'].srcObject = this.localStream

        const { serverUrl, sessionName } = this.$route.query
        const socketBaseUrl = new URL(serverUrl)
        socketBaseUrl.protocol = window.location.protocol.replace('http', 'ws')
        const url = SOCKET_ROUTE
          .replace('{sessionName}', sessionName)
          .replace('{peerId}', this.localPeerId)

        this.peersManager = new PeersManager({
          socketAPI: new SocketAPI({
            url: new URL(url, socketBaseUrl).href,
            sessionName,
            peerId: this.localPeer,
          }),
          videosRootNode: this.$refs['peers-video-root'],
          chatMessagesRootNode: this.$refs['chat-messages-root'],
          localPeerId: this.localPeerId,
          localStream: this.localStream,
        })
      })
    },

    async askLocalStream () {
      const mediaTrackConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
      }
      this.localStream = await window.navigator.mediaDevices.getUserMedia({
        audio: mediaTrackConstraints,
        video: mediaTrackConstraints,
      })
      this.$refs['test-video'].srcObject = this.localStream
    },

    submitChatMessage () {
      console.debug('Session: send message', this.chatMessage, this)
      this.peersManager.sendChatMessage(this.chatMessage)
    },
  },
}
</script>

<template>
  <main>
    <h1>{{ `Session ${$route.query.sessionName}` }}</h1>

    <Modal v-if="!$route.query.serverUrl" fixed open v-on:close="$router.replace('/')">
      <template v-slot:header>
        <h3>{{ 'Error !' }}</h3>
      </template>
      <p>{{ 'A server URL is required.' }}</p>
    </Modal>

    <Modal fixed :open="!!error" v-on:close="error = undefined">
      <template v-slot:header>
        <h3>{{ 'An unknown error occurred' }}</h3>
      </template>
      <p>{{ 'This is the error' }}</p>
      <pre v-if="error">
        {{ error.message }}
        {{ error.stack }}
      </pre>
    </Modal>

    <Modal fixed :open="unableToReachServer" v-on:close="unableToReachServer = undefined">
      <template v-slot:header>
        <h3>Oopsie…</h3>
      </template>
      <p>Looks like the server is taking a nap, we can’t reach it…</p>
    </Modal>

    <div v-if="!canJoinSession">
      <h3>Let’s initialize that session dude.</h3>
      <div v-if="joinSessionLoading">
        Joining the session…
      </div>

      <Modal fixed :open="canJoinSession === false" v-on:close="$router.replace('/')">
        <template v-slot:header>
          <h3>Aïe aïe aïe</h3>
        </template>
        <p>
          You cannot join this session. Either this session does not exist, either the URL you were given is wrong.
        </p>
      </Modal>
    </div>

    <div v-else-if="!isLocalPeerSetupReady">
      <ul style="text-align: left; line-height: 2.5em;">
        <h3 style="margin: 0;">Before joining the session:</h3>
        <li>Accept sharing your audio &amp; video with this us.</li>
        <li>Check out your video (below) to see if everything is OK.</li>
        <li>If necessary, you can <button v-on:click="askLocalStream">Re-ask to get your audio &amp; video</button></li>
      </ul>
      <div>
        <video ref="test-video" playsinline autoplay muted key="local-peer-video"></video>
      </div>
      <div style="padding: 2em 0;">
        <button :disabled="!localStream" v-on:click="finishInitialSetup">Let’s go to that conference call</button>
      </div>
    </div>

    <div v-else>
      <h3>Conference {{ $route.query.sessionName }}&nbsp;−&nbsp;{{ localPeerId }}</h3>
      <p>
        <button v-on:click="isChatDrawerOpened = true">Open chat</button>
      </p>
      <Drawer position="left" :open="isChatDrawerOpened" v-on:close="isChatDrawerOpened = false">
        <div ref="chat-messages-root" class="chat-messages"></div>
        <form ref="chat-form" class="chat-form" v-on:submit.prevent="submitChatMessage">
          <input name="message" v-model="chatMessage" placeholder="Type something…" required>
          <button type="submit">Send 👻</button>
        </form>
      </Drawer>
      <video ref="local-peer-video" playsinline autoplay muted key="local-peer-video"></video>
      <span ref="peers-video-root" style="display: inline-block;"></span>
    </div>
  </main>
</template>

<style>
video {
  border-radius: 0.25em;
  display: inline-block;
  margin: 1em;
  max-width: 100%;
}
.chat-messages {
  padding-bottom: 3em;
}
.chat-messages .bubble {
  padding: .5em;
  border-radius: 3px;
  color: white;
  max-width: 70%;
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
