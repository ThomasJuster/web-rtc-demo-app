<script>
import Home from './views/Home.vue'
import Session from './views/Session.vue'

export default {
  name: 'App',
  components: {
    Home,
    Session,
  },
}
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <Home v-if="!$route.query.sessionName"></Home>
    <Session v-if="$route.query.sessionName"></Session>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
