<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <section class="contact section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 mx-auto col-md-7 col-12 py-5 mt-5 text-center">
                <h1 class="mb-4">Selamat Datang, Silahkan <strong>Buat Akun Anda</strong></h1>
              </div>

              <div class="col-lg-4 mx-auto col-md-10 col-12">
                <form v-on:submit.prevent="Register" action="#" method="post" class="login-form"  role="form">
                  <div class="row">
                    <div class="col-lg-12 col-12">
                      <input type="number" class="form-control" name="nik" v-model="nik" placeholder="NIK">
                    </div>

                    <div class="col-lg-12 col-12">
                      <input type="text" class="form-control" name="nama" v-model="nama" placeholder="Nama">
                    </div>

                    <div class="col-lg-12 col-12">
                        <input type="text" class="form-control" name="username" v-model="username" placeholder="Username">
                    </div>

                    <div class="col-lg-12 col-12">
                      <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
                    </div>

                    <div class="col-lg-12 col-12">
                      <input type="number" class="form-control" name="telp" v-model="telp" placeholder="No Telepon">
                    </div>

                    <div class="col-lg-12 col-12 text-center">
                      <p>Sudah punya akun? <a href="/Login">Login disini</a></p>
                    </div>

                    <div class="col-lg-5 mx-auto col-7">
                      <button type="submit" class="form-control" id="submit-button" name="submit">Daftar</button>
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
    name: 'Register',
    data () {
        return {
            nik: '',
            nama: '',
            username:'',
            password: '',
            telp:'',
        }
    },
    methods: {
      Register: function () {
        let data = {
          nik: this.nik,
          nama: this.nama,
          username: this.username,
          password: this.password,
          telp: this.telp,
        };
        this.$store.dispatch("register", data)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: 'login'
          })
        }).catch(error => {
          this.errors = error.response.data.errors
        })
     }
   }
 };
</script>