<script>
export default {
  name: 'SessionManageSelfSetUp',
  components: {},
  data: () => ({
    localStream: null,
  }),
  methods: {
    async shareVideo () {
      const mediaTrackConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
      }
      this.localStream = await window.navigator.mediaDevices.getUserMedia({
        audio: mediaTrackConstraints,
        video: mediaTrackConstraints,
      })
      this.$refs.localPeerVideo.srcObject = this.localStream
      this.$emit('localstream', this.localStream)
    },
    async shareScreen () {
      this.localStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
      this.$refs.localPeerVideo.srcObject = this.localStream
      this.$refs.localPeerVideo.addEventListener('suspend', async () => {
        await this.shareVideo()
      })
    },
  },
  mounted () {
    this.shareVideo()
  }
}
</script>

<template>
  <div>
    <ul style="text-align: left; line-height: 2.5em;">
      <h3 style="margin: 0;">{{ 'Before joining the session:' }}</h3>
      <li>{{ 'Accept sharing your audio & video with this us.' }}</li>
      <li>{{ 'Check out your video (below) to see if everything is OK.' }}</li>
      <li>{{ 'If necessary, you can ' }}<button v-on:click="shareVideo">{{ 'Re-ask to get your audio & video' }}</button></li>
      <li>{{ 'Share your screen: ' }}<button v-on:click="shareScreen">{{ 'Start sharing' }}</button></li>
    </ul>
    <div>
      <video ref="localPeerVideo" playsinline autoplay muted key="local-peer-video"></video>
    </div>
    <div style="padding: 2em 0;">
      <button :disabled="!localStream" v-on:click="$emit('finish')">Let’s go to that conference call</button>
    </div>
  </div>
</template>
