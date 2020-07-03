<script>
import Modal from '../components/Modal.vue'
import JoinSession from './Session/Join.vue'
import ManageSessionSetUp from './Session/ManageSetUp.vue'
import SessionConference from './Session/Conference.vue'

function getRandomPeerId () {
  const id = Math.round(Math.random() * 100000)
  return `peer-${id}`
}

export default {
  name: 'Session',
  components: {
    Modal,
    JoinSession,
    ManageSessionSetUp,
    SessionConference,
  },
  data: () => ({
    error: undefined,

    canJoinSession: undefined,

    isLocalPeerSetupReady: false,
    localStream: null,
    localPeerId: getRandomPeerId(), // must NOT be changed accross component lifetime
  }),

  async mounted () {
    console.info('local peer id', this.localPeerId)
  },

  errorCaptured (error) {
    this.error = error
  },

  methods: {
    onLocalStream (value) {
      this.localStream = value
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

    <JoinSession
      v-if="!canJoinSession"
      v-on:canjoinsession="canJoinSession = true"
      v-on:cannotjoinsession="$router.replace('/')"
    />

    <ManageSessionSetUp
      v-else-if="!isLocalPeerSetupReady"
      v-on:finish="isLocalPeerSetupReady = true"
      v-on:localstream="onLocalStream"
    />

    <SessionConference
      v-else
      :localStream="localStream"
      :localPeerId="localPeerId"
    />
  </main>
</template>

<style>
video {
  border-radius: 0.25em;
  display: inline-block;
  margin: 1em;
  max-width: calc(100% - 2em);
}
</style>
