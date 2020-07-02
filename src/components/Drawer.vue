<script>
const POSITIONS = ['left', 'right']
export default {
  name: 'Drawer',
  props: {
    open: Boolean,
    position: {
      required: true,
      validator: (value) => POSITIONS.includes(value),
    },
  },
}
</script>

<template>
  <div>
    <div v-if="open" class="backdrop" v-on:click="$emit('close')"></div>
    <div :class="`drawer drawer-${this.position}${this.open ? ' open' : ''}`">
      <span class="close-icon" v-on:click="$emit('close')">
        <slot name="close-icon">×</slot>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  z-index: 900;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.drawer {
  position: fixed;
  padding-top: 2em;
  z-index: 1000;
  width: 40em;
  height: calc(100vh - 2em);
  max-height: calc(100vh - 2em);
  overflow-y: auto;
  top: 0;
  border-radius: 3px;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px -2px #333;
  background: white;
}
.drawer-left {
  left: 0;
  transform: translateX(-110%);
}
.drawer-right {
  right: 0;
  transform: translateX(110%);
}
.drawer.open {
  transform: translateX(0);
}
.close-icon {
  position: fixed;
  top: 0.5em;
  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  border: 1px solid threedface;
}
.drawer-left .close-icon {
  right: 0.5em;
}
.drawer-ight .close-icon {
  left: 0.5em;
}
</style>
