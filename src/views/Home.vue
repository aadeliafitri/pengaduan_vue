<template>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <section class="contact section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 mx-auto col-md-7 col-12 py-3 mt-5 text-center" >
                <h2 class="mb-4">Selamat datang, silahkan <strong>buat laporan pengaduan</strong> anda</h2>
              </div>
              <div class="col-lg-8 mx-auto col-md-10 col-12 text-center">
                <a class="new-btn btn-pm btn mt-5" v-b-modal.modalPengaduan v-on:click="Add">
                  <i class="fa fa-edit"></i>
                  Tulis Pengaduan
                </a>  
                <a class="new-btn btn-pm btn mt-5 ml-2" href="/lihatPengaduan">
                  <i class="fa fa-folder"></i>
                  Lihat Pengaduan
                </a>      
              </div>
            </div>
            <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
              <b-spinner label="Spinning" variant="success"></b-spinner>
              <strong class="text-success">Loading...</strong>
            </b-toast>
                <!-- toast untuk tampilan message box -->
            <b-toast id="message" title="Message">
              <strong class="text-success">{{ message }}</strong>
            </b-toast>
          </div>
        </section>
      </div>
      <b-modal id="modalPengaduan" @ok="Save">
        <template v-slot:modal-title>
          Form Laporan Pengaduan
        </template>
        <form ref="form">
          <div class="form-group">
            <label for="tgl_pengaduan" class="col-form-label">Tanggal Pengaduan</label>
            <input type="date" name="tgl_pengaduan" class="form-control" id="tgl_pengaduan" placeholder="Tanggal" v-model="tgl_pengaduan">
          </div>
          <div class="form-group">
            <label for="isi_laporan" class="col-form-label">Isi Laporan</label>
            <input type="text" name="isi_laporan" class="form-control" id="Isi Laporan" placeholder="Isi Laporan" v-model="isi_laporan">
          </div>
          <div class="form-group">
            <label for="id_kategori" class="col-form-label">Kategori</label>
            <select class="form-control" v-model="id_kategori">
              <option value="1">Fasilitas Umum</option>
              <option value="2">Kesehatan</option>
              <option value="3">Ekonomi</option>
              <option value="4">Pelayanan Publik</option>
            </select>
          </div>
          <div class="form-group">
            <label for="foto" class="col-form-label">Foto</label>
            <input type="file" name="foto" class="form-control" id="foto" placeholder="Foto">
          </div>
        </form>
      </b-modal>
    </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      search: "",
      id_pengaduan: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      foto: "",
      id_kategori:"",
      status: "",
      action:"",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      fields: ["id_pengaduan","id_user", "id_kategori", "tgl_pengaduan", "isi_laporan", "foto", "status"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == 1){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data Masyarakat atau anda login sebagai admin/petugas"
          this.$bvToast.show("message");
            // this.$router.push({name: "login"})
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
      
    Add : function(){
      this.action = "insert";
      this.tgl_pengaduan = "";
      this.isi_laporan = "";
      this.id_kategori="";
      document.getElementById("foto").value = null; 
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("isi_laporan", this.isi_laporan);
        form.append("id_kategori", this.id_kategori);
        form.append("foto", document.getElementById("foto").files[0]);
            
        this.axios.post("masyarakat/pengaduan", form, conf)
        .then(response => {
        this.$bvToast.hide("loadingToast");
        if(this.search == ""){
          this.getData();
        } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
        console.log(error);
        });
      } 
      // else {
      // //   let form = {
      // //     tgl_pengaduan: this.tgl_pengaudan,
      // //     isi_laporan: this.isi_laporan,
      // //     id_kategori: this.id_kategori,
      // //     foto: this.foto,
      // //   }
      // //   this.axios.put("/siswa/" + this.id, form, conf)
      // //   .then(response => {
      // //     this.$bvToast.hide("loadingToast");
      // //     if(this.search == ""){
      // //       this.getData();
      // //     } else {
      // //       this.searching();
      // //     }
      // //     this.message = response.data.data.message;
      // //     this.$bvToast.show("message");
      // //   })
      // //   .catch(error => {
      // //     console.log(error);
      // //   });
      // }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    // this.getData();
  }
}
</script>
