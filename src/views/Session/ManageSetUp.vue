<script>
export default {
  name: 'SessionManageSelfSetUp',
  components: {},
  data: () => ({
    localStream: null,
  }),
  methods: {
    async askLocalStream () {
      const mediaTrackConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
      }
      this.localStream = await window.navigator.mediaDevices.getUserMedia({
        audio: mediaTrackConstraints,
        video: mediaTrackConstraints,
      })
      this.$refs['local-peer-video'].srcObject = this.localStream
      this.$emit('localstream', this.localStream)
    },
  },
  mounted () {
    this.askLocalStream()
  }
}
</script>

<template>
  <div>
    <ul style="text-align: left; line-height: 2.5em;">
      <h3 style="margin: 0;">{{ 'Before joining the session:' }}</h3>
      <li>{{ 'Accept sharing your audio & video with this us.' }}</li>
      <li>{{ 'Check out your video (below) to see if everything is OK.' }}</li>
      <li>{{ 'If necessary, you can ' }}<button v-on:click="askLocalStream">{{ 'Re-ask to get your audio & video' }}</button></li>
    </ul>
    <div>
      <video ref="local-peer-video" playsinline autoplay muted key="local-peer-video"></video>
    </div>
    <div style="padding: 2em 0;">
      <button :disabled="!localStream" v-on:click="$emit('finish')">Let’s go to that conference call</button>
    </div>
  </div>
</template>
