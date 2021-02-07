<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-fixed-top navbar-light bg-white p-5">      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link" href="#/">品牌介紹</a>
          <a class="nav-item nav-link" href="#">嚴選好茶</a>
          <a class="nav-item nav-link" href="#">門市據點</a>
          <a class="nav-item nav-link" href="#/admin/products" v-show="memberin == 'yes'">客戶中心</a>
          <a class="nav-item nav-link" href="#/login" v-show="memberin == 'no'">登入</a>
          <a class="nav-item nav-link" href="#" @click.prevent="logout()" v-show="memberin == 'yes'"
            >登出</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberin: 'no',
    };
  },
  created() {
    let api = `${process.env.APIPATH}/api/user/check`;
    let vm = this;     
    vm.$http.get(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {

        vm.memberin = 'yes';

      } else {
        vm.memberin = 'no';
      }
    });
  },

  methods: {

    logout() {
      let api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/");
        }
      });
    },
    
  }, 
   
};


</script>