<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <section class="contact section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 mx-auto col-md-7 col-12 py-5 mt-5 text-center">
                <h1 class="mb-4">Silahkan <strong>Login</strong> dan buat
                <strong>Pengaduan</strong> anda</h1>
              </div>
              <div class="col-lg-4 mx-auto col-md-10 col-12 mt-5">
                <form v-on:submit.prevent="Login" action="#" method="post" class="login-form" role="form">
                  <div class="row">
                    <div class="col-lg-12 col-12">
                      <input type="text" class="form-control" name="username" id="inputUsername" v-model="username"  placeholder="Username">
                    </div>

                    <div class="col-lg-12 col-12">
                      <input type="password" class="form-control" name="password" v-model="password" id="inputPassword"  placeholder="Password" autocomplete="on">
                    </div>

                    <div class="col-lg-12 col-12 text-center">
                      <p>Belum punya akun? <a href="/Register">Daftar disini</a></p>
                    </div>

                    <div class="col-lg-5 mx-auto col-7">
                      <button type="submit" class="form-control auth-form-btn" id="submit-button" name="submit">LOGIN</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {  
    data(){
      return {
          username: "",
          password: "",
      }
    },
    methods: {
      Login: function(){
        let username = this.username 
        let password = this.password
        this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      }
    }
  }
</script>
     
