<template>
  <div class="hello container">
    <div class="page-header">
      <h1 style="text-align: center">This is home page</h1>
    </div>
    <div class="jumbotron">
      <h3>Hello, world!</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dicta dolorum porro quasi. Culpa itaque tempora ut? Atque ex odio omnis veniam voluptatum. A consequuntur illo laudantium neque pariatur?</p>
      <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


</style>
