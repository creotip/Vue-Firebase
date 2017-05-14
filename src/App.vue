<template>
  <div id="app" class="app">
    <div v-if="loader" class="loader">
      <img src="./assets/ring.svg" alt="">
    </div>

    <top-menu :profile="profileName"></top-menu>
    <div class="container">

      <div v-if="!isAuthenticated" id="loginContainer">
        <div class="row">
          <div class="col-md-12">

            <h3 style="text-align: center;">Login and SignUp using firebase + Vue</h3>

            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="auth.email" type="email" class="form-control" id="exampleInputEmail1"
                       placeholder="Email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="auth.password" type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Password">
              </div>

              <div v-if="auth.message !== ''" class="alert" role="alert"
                   :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                <p><strong>{{auth.message}}</strong></p>
              </div>

              <button type="button" @click="login" class="btn btn-primary">Login</button>

              <button type="button" @click="signUp" class="btn btn-success">Signup</button>

            </form>
          </div>
        </div>
      </div>

    </div>
    <router-view v-if="isAuthenticated"></router-view>
  </div>
</template>

<script>
  /* eslint-disable */
  import TopMenu from './components/TopMenu.vue'
  import Firebase from 'firebase'

  export default {
    name: 'app',
    components: {
      TopMenu
    },
    data () {
      return {
        loader: true,
        profileName: '',
        auth: {
          user: null,
          email: '',
          password: '',
          message: '',
          userName: '',
          hasErrors: false
        },
        showToast: false
      }
    },
    computed: {
      /**
       * Determines if the user is authenticated
       *
       * @return boolean
       */
      isAuthenticated: function () {
        // This function changes the auth.user state when
        // the auth status of user changes.
        Firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            this.auth.user = user;
            this.profileName = this.auth.user.email
          } else {
            this.auth.user = null;
          }
        }.bind(this));

        return (this.auth.user !== null);
      }
    },
    methods: {
      removeBook (book) {
        // booksRef.child(book['.key']).remove()
      },
      closeToast () {
        this.showToast = false
      },

      /**
       * Authenticate the user
       *
       * @param object event
       */
      login: function (event) {
        this.loader = true
        var vm = this
        vm.auth.message = ''
        vm.auth.hasErrors = false

        if (vm.auth.email === '' || vm.auth.password === '') {
          alert('Please provide the email and password')
          vm.loader = false
          return
        }
        // Sign-in the user with the email and password
        Firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
          .then(function (data) {
            vm.auth.user = Firebase.auth().currentUser;
            vm.loader = false
            vm.$router.push('/quiz')
          }).catch(function (error) {
          vm.auth.message = error.message
          vm.auth.hasErrors = true
          vm.loader = false
        });
      },

      /**
       * Create a new user account
       *
       * @param object event
       */
      signUp: function (event) {
        var vm = this;
        vm.auth.message = '';
        vm.auth.hasErrors = false;

        if (vm.auth.email === '' || vm.auth.password === '') {
          alert('Please provide the email and password');
          return;
        }

        // Create a new user in firebase
        Firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
          .then(function (data) {
            vm.auth.message = 'Successfully created user';
            vm.auth.user = Firebase.auth().currentUser;
            vm.auth.email = '';
            vm.auth.password = '';
          }).catch(function (error) {
          vm.auth.message = error.message;
          vm.auth.hasErrors = true;
        });
      },

      /**
       * Signout the currently logged-in user
       */
      signOut: function () {
        // Signout the user using firebase
        Firebase.auth().signOut()
          .then(function (error) {
            this.auth.user = Firebase.auth().currentUser;
            this.auth.message = 'User signed out Successfully';
            this.profileName = ''

          }.bind(this), function (error) {
            alert('Failed to signout user, try again later');
          });
      },

      /**
       * Update the user profile details.
       */
      updateProfile: function () {
        if (this.auth.userName === '') {
          alert('Please provide a username to update.');
          return;
        }

        var user = Firebase.auth().currentUser,
          vm = this;

        user.updateProfile({
          displayName: vm.auth.userName
        }).then(function () {
          vm.auth.message = 'Successfully udpated user profile.';
          // console.log(vm.auth.username)
        }, function (error) {
          vm.auth.message = 'Failed to update user profile.';
          vm.auth.hasErrors = true;
        });
      },

      /**
       * Dismiss the alert message
       */
      dismissAlert: function () {
        this.auth.message = ''
        this.auth.hasErrors = false;
      },

      /**
       * Display name computed property
       */
      displayName: function () {
        return this.auth.user.displayName ? this.auth.user.displayName : this.auth.user.email
      }
    },
    mounted () {
      setTimeout(function () {
        this.loader = false
      }.bind(this), 1000)
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
