<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Modal from '../components/Modal.vue'
import { ServerApi } from '@web-rtc-demo/shared'

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data: () => ({
    sessionName: '',
    sessionWithPassword: false,
    password: '',
    serverUrl: window.location.origin.includes('localhost') ? 'http://localhost:43210/' : 'https://njcyp.sse.codesandbox.io/',

    sessionUrl: undefined,

    unableToReachServer: undefined,
    sessionExistsLoading: false,
    sessionExists: undefined,

    createSessionLoading: false,
    createdSessionSuccessfully: undefined,
  }),
  methods: {
    async submit () {
      const serverApi = new ServerApi({ baseUrl: this.serverUrl })
      this.sessionExistsLoading = true
      try {
        const sessionExistsResult = await serverApi.sessionExists(this.sessionName)
        this.sessionExists = sessionExistsResult.ok
      } catch (error) {
        this.unableToReachServer = true
      }
      this.sessionExistsLoading = false

      if (!this.unableToReachServer && !this.sessionExists) {
        this.createSessionLoading = true
        try {
          const createSessionResult = await serverApi.createSession(this.sessionName, this.password)
          this.createdSessionSuccessfully = createSessionResult.ok
          this.sessionUrl = new URL('/', window.location.origin)
          this.sessionUrl.searchParams.set('serverUrl', this.serverUrl)
          this.sessionUrl.searchParams.set('sessionName', this.sessionName)
          if (this.password) this.sessionUrl.searchParams.set('password', this.password)
        } catch (error) {
          this.unableToReachServer = true
        }
        this.createSessionLoading = false
      }
    },
    resetForm () {
      // this.sessionName = ''
      // this.sessionWithPassword = false
      // this.password = ''
      // this.serverUrl = ''

      this.unableToReachServer = undefined

      this.sessionUrl = undefined

      this.sessionExistsLoading = false
      this.sessionExists = undefined

      this.createSessionLoading = false
      this.createdSessionSuccessfully = undefined
    },
  },
}
</script>

<template>
  <main class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <form class="form" v-on:submit.prevent="submit">
      <fieldset>
        <legend>
          Start a conference
        </legend>
        <label>
          Server URL
          <input type="url" v-model="serverUrl" required>
        </label>
        <label>
          Session Name
          <input type="text" class="text-input" v-model="sessionName" required>
        </label>
        <label>
          <input type="checkbox" v-model="sessionWithPassword">
          Add a password
        </label>
        <label v-if="sessionWithPassword">
          Password
          <input type="password" class="text-input" v-model="password">
        </label>

        <hr>

        <div class="form-footer">
          <button type="submit">Submit</button>
        </div>
      </fieldset>

      <Modal fixed :open="createSessionLoading || sessionExistsLoading" v-on:close="resetForm">
        <template v-slot:header>
          <h3>Loading…</h3>
        </template>
        <p v-if="sessionExistsLoading">Checking if session is available</p>
        <p v-if="createSessionLoading">Creating session</p>
        <template v-slot:footer>
          <p style="text-align: center;">No actions</p>
        </template>
      </Modal>

      <Modal fixed :open="sessionExists" v-on:close="resetForm">
        <template v-slot:header>
          <h3>Sorry!</h3>
        </template>
        <p>This section already exists</p>
      </Modal>

      <Modal fixed :open="createdSessionSuccessfully === false" v-on:close="resetForm">
        <template v-slot:header>
          <h3>Something went wrong</h3>
        </template>
        <p>For an unknown reason, we were unable to create your session. Please try again.</p>
        <p>If the problem persists, maybe try a bit later. Sorry for the inconvenience.</p>
      </Modal>

      <Modal fixed :open="unableToReachServer === true" v-on:close="resetForm">
        <template v-slot:header>
          <h3>Oopsie…</h3>
        </template>
        <p>It looks like the server is taking a nap, we can’t reach it… :/</p>
      </Modal>

      <Modal fixed :open="createdSessionSuccessfully">
        <template v-slot:header>
          <h3>Success !</h3>
        </template>
        <p v-if="sessionUrl">
          Copy the following link to share with your friends:
          <input type="text" :value="`${sessionUrl.origin}/web-rtc-demo-app/dist${sessionUrl.pathname}${sessionUrl.search}${sessionUrl.hash}`">
        </p>
        <template v-slot:footer v-if="sessionUrl">
          <button v-on:click="$router.push(sessionUrl.href.replace(sessionUrl.origin, ''))">Let’s go !</button>
        </template>
      </Modal>
    </form>
  </main>
</template>

<style scoped>
.form {
  position: relative;
  text-align: left;
}
.form-footer {
  text-align: center;
}

hr {
  border: 1px solid threedface;
  margin: 2em 0;
}
</style>
<style>
main {
  max-width: 40em;
  margin: auto;
}
input:not([type=radio]):not([type=checkbox]) {
  display: inline-block;
  width: 100%;
  padding: 0.5em;
  font-size: inherit;
}
fieldset {
  border-radius: 0.25em;
  border-style: solid;
  padding: 1em;
}
legend {
  display: inline-block;
  padding: 0.25em 1em;
  font-weight: bold;
  color: inherit;
}
label {
  font-weight: bold;
  display: block;
}
label + label {
  margin-top: 1em;
}
input {
  font-weight: normal;
  box-sizing: border-box;
}
button {
  padding: 0.5em 1em;
  font-weight: bold;
}
</style>
