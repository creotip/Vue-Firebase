<template>
  <div id="app">
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
  import auth from './firebase/auth'

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
