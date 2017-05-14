<template>
  <div class="hello">
<h1>    This page is logged in</h1>
    {{ items }}
    <ul>
      <li v-for="item in items">
        {{ item['.value'] }}
      </li>
    </ul>
  </div>
</template>

<script>
  import auth from '../firebase/auth'
  import database from '../firebase/database'

  // Using vuefire
  const getItems = function () {
    const user = auth.getUser()
    if (user.uid) {
      this.$bindAsArray('classes', database.getRef(`items/${user.uid}`))
    }
  }

  export default {
    name: 'hello',
    data: () => {
      return {
        items: []
      }
    },
    created: getItems
  }
</script>
