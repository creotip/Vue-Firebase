<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="collapsed navbar-toggle" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-5" aria-expanded="false"><span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
        <router-link to="/" class="navbar-brand">Firebase</router-link>
      </div>
      <ul class="nav navbar-nav">

        <li>
          <router-link to="/quiz" >quiz</router-link>
        </li>
        <li>
          <router-link to="/profile" >profile</router-link>
        </li>
      </ul>
      <div v-if="profile.length" class="collapse navbar-collapse" id="bs-example-navbar-collapse-5"><p
        class="navbar-text navbar-right">
        Signed in as <a href="#" class="navbar-link">{{ profile }}</a></p></div>
    </div>
  </nav>
</template>

<script>
  // import Firebase from 'firebase'
  export default {
    name: 'top-menu',
    props: ['profile']
  }
</script>
