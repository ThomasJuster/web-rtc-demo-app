<script>
export default {
  name: 'Modal',
  props: {
    open: Boolean,
    fixed: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<template>
  <div class="modal" :class="{ 'is-fixed': fixed }" v-if="this.open">
    <div class="backdrop" v-on:click="$emit('close')"></div>

    <div class="dialog">
      <header class="header">
        <slot name="header"></slot>
        <span class="close-icon" v-on:click="$emit('close')">
          <slot name="close-icon">×</slot>
        </span>
      </header>

      <div class="content">
        <slot></slot>
      </div>

      <footer class="footer">
        <slot name="footer">
          <button v-on:click="$emit('close')">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal {
  z-index: 1000;
}
.modal, .backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal.is-fixed {
  position: fixed;
}

.backdrop {
  background: rgba(0, 0, 0, .3);
  z-index: 10;
}

.dialog {
  z-index: 100;
  position: absolute;
  top: 20%;
  max-height: calc(100% - 20% * 2);
  width: 30em;
  left: calc(50% - (30em / 2));
  overflow-y: auto;
  background: white;
  border-radius: 0.25em;
}

.header, .footer {
  padding: 0.3em 1em;
}

.content {
  padding: 2em 1em;
}

.header {
  border-bottom: 1px solid lightgrey;
}

.close-icon {
  position: absolute;
  right: 1em;
  top: 1em;
  padding: 0.5em 0.75em;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid threedface;
}

.footer {
  text-align: right;
  border-top: 1px solid lightgrey;
}

.footer button + button {
  margin-left: 1em;
}
</style>
