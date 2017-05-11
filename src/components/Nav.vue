<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="collapsed navbar-toggle" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-5" aria-expanded="false"><span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
        <a href="#" class="navbar-brand">Brand</a></div>
      <ul class="nav navbar-nav"> <li class="active"><a href="#">Home</a></li> <li><a href="#">Link</a></li> <li><a href="#">Link</a></li> </ul>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-5"><p class="navbar-text navbar-right">
        Signed in as <a href="#" class="navbar-link">{{ profile }}</a></p></div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'top-menu',
    props: ['profile'],
    methods: {
      changeMessage (event) {}
    }
  }
</script>
