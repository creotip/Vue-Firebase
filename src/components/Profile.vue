<template>
  <div class="container">
    <div class="page-header">
      <h1 style="text-align: center">This is profile page</h1>
    </div>
    <div v-if="isAuthenticated" class="profile-page" id="content">

      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Welcome {{displayName()}}</h3>
            </div>

            <div class="panel-body">
              <p>You have been currently logged-in using firebase.</p>
              <br/>
              <h4>{{displayName()}} Profile Details</h4>
              <hr/>
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="inputUserName" class="col-sm-2 control-label">Username</label>
                  <div class="col-sm-10">
                    <input v-model="auth.userName" type="text" class="form-control" id="inputUserName"
                           placeholder="Username">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button @click="updateProfile" type="button" class="btn btn-default">Update Profile</button>
                  </div>
                </div>
              </form>
              <div v-if="auth.message !== ''" class="alert" role="alert"
                   :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                <p><strong>{{auth.message}}</strong></p>
              </div>
            </div>

            <div class="panel-footer">
              <button @click="signOut" class="btn btn-danger" type="button">Signout</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import Firebase from 'firebase'
  export default {
    name: 'profile',
    data () {
      return {
        profileName: '',
        auth: {
          user: null,
          email: '',
          password: '',
          message: '',
          userName: '',
          hasErrors: false
        }
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
      updateProfile: function () {
        if (this.auth.userName === '') {
          alert('Please provide a username to update.')
          return
        }

        var user = Firebase.auth().currentUser,
          vm = this

        user.updateProfile({
          displayName: vm.auth.userName
        }).then(function () {
          vm.auth.message = 'Successfully updated user profile.'
          // console.log(vm.auth.username)
        }, function (error) {
          vm.auth.message = 'Failed to update user profile.'
          vm.auth.hasErrors = true
        })
      },
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
      dismissAlert: function () {
        this.auth.message = ''
        this.auth.hasErrors = false;
      },
      displayName: function () {
        return this.auth.user.displayName ? this.auth.user.displayName : this.auth.user.email
      }
    }
  }
</script>
