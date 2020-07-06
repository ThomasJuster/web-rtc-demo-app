<script>
import { ServerApi } from '@web-rtc-demo/shared'
import Modal from '../../components/Modal.vue'

export default {
  name: 'JoinSession',
  components: {
    Modal,
  },
  data: () => ({
    joinSessionLoading: false,
    unableToReachServer: false,
    canJoinSession: undefined,
  }),
  async mounted () {
    const { serverUrl, password, sessionName } = this.$route.query
    const serverApi = new ServerApi({ baseUrl: serverUrl })
    if (typeof sessionName !== 'string') throw new Error('sessionName should be a string')

    this.joinSessionLoading = true
    try {
      const joinSessionResult = await serverApi.joinSession(sessionName, password)
      this.canJoinSession = joinSessionResult.ok
    } catch (error) {
      console.error(error)
      this.unableToReachServer = true
    }
    this.joinSessionLoading = false
    if (this.canJoinSession) this.$emit('canjoinsession')
  },
}
</script>
<template>
  <div>
    <h3>{{ 'Let’s initialize that session dude.' }}</h3>
    <div v-if="joinSessionLoading">
      {{ 'Joining the session…' }}
    </div>

    <Modal fixed :open="unableToReachServer" v-on:close="unableToReachServer = undefined">
      <template v-slot:header>
        <h3>{{ 'Oopsie…' }}</h3>
      </template>
      <p>{{ 'Looks like the server is taking a nap, we can’t reach it…' }}</p>
    </Modal>

    <Modal fixed :open="canJoinSession === false" v-on:close="$emit('cannotjoinsession')">
      <template v-slot:header>
        <h3>{{ 'Aïe aïe aïe' }}</h3>
      </template>
      <p>
        {{ 'You cannot join this session. Either this session does not exist, either the URL you were given is wrong.' }}
      </p>
    </Modal>
  </div>
</template>
