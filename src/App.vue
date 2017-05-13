<template>
  <div id="app" class="app">
    <router-link to="/items">Go to Foo</router-link>
    <button v-show="user.uid" @click="logout">
      Logout
    </button>

    <div class="login" v-show="!user.uid">
      <div id="firebaseui-auth-container"></div>
    </div>
    <router-view v-show="user.uid"></router-view>
  </div>
</template>

<script>
  /* eslint-disable */
  import auth from './firebaze/auth'

  const user = auth.getUser()

  export default {
    name: 'app',
    data: function () {
      return {
        user
      }
    },
    methods: {
      logout: auth.logout
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
  }

  .loader {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 12;
    transition: all 350ms ease;
  }
</style>
