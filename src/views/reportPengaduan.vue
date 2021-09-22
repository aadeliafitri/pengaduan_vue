<template>
  <div>
    <section class="contact section-padding">
      <div class="container mt-3">
        <div class="row">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <p class="card-title float-left"><b>Report Laporan Pengaduan</b></p>
                <div class="table-responsive">
                  <!-- <b-form-input type="number" v-on:keyup.enter="searching" v-model="tahun" placeholder="Inputkan tahun"></b-form-input> -->
                  <div class="dropdown-divider"></div>
                  <div id="printMe">
                    <b-table striped hover :items="pengaduan" :fields="fields">
                      <template v-slot:cell(nama_kategori)="data">
                        {{ data.item.kategori.nama_kategori }}
                      </template>
                      <template v-slot:cell(nama)="data">
                        {{ data.item.user.nama }}
                      </template>
                      <!-- <template v-slot:cell(nama)="data">
                        <div v-for="users in user" :key="users.id">
                          {{ data.item.user.nama }}
                        </div>
                      </template> -->
                    </b-table>
                  </div>

                  <button class="btn btn-warning" @click="print">Print</button>

                  <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                    <b-spinner label="Spinning" variant="success"></b-spinner>
                    <strong class="text-success">Loading...</strong>
                  </b-toast>

                  <!-- toast untuk tampilan message box -->
                  <b-toast id="message" title="Message">
                    <strong class="text-success">{{ message }}</strong>
                  </b-toast>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search:"",
      tahun: "",
      id_pengaduan: "",
      tgl_pengaduan: "",
      isi_laporan:"",
      status:"",
      nama_kategori:"",
      nama:"",
      id_user:"",
      id_kategori:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      kategori: [],
      user:[],
      fields: ["tgl_pengaduan","isi_laporan", "status", "nama_kategori", "nama"],
      // fields_detail: ["tanggal", "nama_pelanggaran", "kategori", "keterangan","poin"],
    }
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.kategori = response.data.data.kategori;
          this.user = response.data.data.pengaduan.user;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan report data semua laporan pengaduan atau anda bukan admin"
          this.$bvToast.show("message");
          // this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    
    searching : function(){
    let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
          // let offset = (this.currentPage - 1) * this.perPage;
          this.$bvToast.show("loadingToast");
          let form = new FormData();
          form.append("tahun", this.tahun);
          this.axios.post("/pengaduan/report", form, conf)
          .then(response => {
            // if(response.data.status == 1){
              this.$bvToast.hide("loadingToast");
              this.pengaduan = response.data.data.pengaduan;
              this.kategori = response.data.data.peangaduan.kategori;
              this.user = response.data.data.pengaduan.user;
              // this.rows = response.data.data.count;
            // } else {
            //   window.location = "/poinsiswa";
            // }
          })
          .catch(error => {
              console.log(error);
          });
          // console.log('abc')
    },
    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },
    print() {
      this.$htmlToPaper('printMe');
    }
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>