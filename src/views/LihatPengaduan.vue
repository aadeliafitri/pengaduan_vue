<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <section class="contact section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <p class="card-title float-left"><b>Data Pengaduan</b></p>
                    <div class="table-responsive" >
                    <b-table striped hover :items="pengaduan" :fields="fields">
                      <template v-slot:cell(foto)="data">
                        <img style="width:200px; height: 150px; border-radius:5%" :src="'http://localhost:8000/uploads/' + data.item.foto" />
                      </template>
                      <template v-slot:cell(tanggapan)="data">
                        {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                      </template>
                    </b-table>
                    </div>
                    <b-pagination
                      v-model="currentPage"
                      :per-page="perPage"
                      :total-rows="rows"
                      align="center"
                      v-on:input="pagination">
                    </b-pagination>

                    <!-- toast untuk tampilan message box -->
                    <b-toast id="message" title="Message">
                      <strong class="text-success">{{ message }}</strong>
                    </b-toast>
                  </div>
                </div>
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
      data() {
        return {
          search: "",
          id_pengaduan: "",
          tgl_pengaduan: "",
          isi_laporan: "",
          foto: "",
          status: "",
          tanggapan: "",
          message: "",
          currentPage: 1,
          rows: 0,
          perPage: 3,
          key: "",
          pengaduan: [],
          tanggapan: [],
          fields: ["id_pengaduan", "tgl_pengaduan", "isi_laporan", "foto", "status", "tanggapan"],
        }
      },
      
    methods: {
      getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan masyarakat atau anda login sebagai admin/petugas"
          this.$bvToast.show("message");
          // this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
       
      pagination : function(){
        if(this.search == ""){
          this.getData();
        } else {
          this.searching();
        } 
      },
    },
    
    mounted() {
      this.key = localStorage.getItem("Authorization");
      this.getData();
    }
}
</script>