<template>
    <div class="container-scroller">
    <!-- partial:partials/_horizontal-navbar.html -->
    <div class="horizontal-menu">
      <nav class="navbar navbar-expand-lg position-absolute">
            <div class="container">
              
              <a class="navbar-brand" href="index.html">
                  <!-- <i class="fa fa-line-chart"></i> -->
                  <img class="logo" src="assets/images/logopemas.png" alt="">
                  Pengaduan Masyarakat
              </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="/" class="nav-link">Masyarakat</a>
                        </li>
                        <!-- <li class="nav-item">
                            <a href="/dataPetugas" class="nav-link">Data Petugas</a>
                        </li>
                        <li class="nav-item">
                            <a href="/dataMasyarakat" class="nav-link">Data Masyarakat</a>
                        </li> -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/dataMasyarakat">Data Masyarakat</a>
                            <a class="dropdown-item" href="/dataPetugas">Data Petugas</a>
                            <a class="dropdown-item" href="/dataPengaduan">Data Pengaduan</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/kategori">Kategori Pengaduan</a>
                            <a class="dropdown-item" href="/reportPengaduan">Report Pengaduan</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a @click="logout" class="btn btn-warning">
                                <i class="mdi mdi-logout text-primary"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout: function () {
      let conf = { headers: { Authorization: "Bearer " + localStorage.getItem("Authorization"), }, };
      // let form = new FormData();
      this.axios.post('/logout', conf) .then((response) => {
          if (response.data.success === false || response.data.status === 0) {
            this.$store.commit('logout');
            localStorage.removeItem("Authorization");
            this.$router.push('/login');
          }
        })
        .catch((error) => {
          // this.$store.commit('logout')
          console.log(error);
        });
    },
  },
}
</script>