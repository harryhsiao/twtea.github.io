<template>
  <div>
    <nav class="navbar navbar-expand-lg p-5" :class="{'navbar-light':!stylechange,'navbar-dark':stylechange,'bg-white':!stylechange,'bg-transparent':stylechange}">      
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
          <router-link class="nav-item nav-link" to="/" href="#">品牌介紹</router-link>
          <router-link class="nav-item nav-link" to="/cart" href="#">嚴選好茶</router-link>
          <router-link class="nav-item nav-link" to="/shop" href="#">門市據點</router-link>
          <router-link class="nav-item nav-link" to="/dashboard/products" href="#" v-show="memberin == 'yes'">客戶中心</router-link>
          <router-link class="nav-item nav-link" to="/login" href="#" v-show="memberin == 'no'">登入</router-link>
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
      open:true,
    };
  },
  created() {
    let api = `${process.env.APIPATH}/api/user/check`;
    let vm = this; 
    vm.$http.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {

        vm.memberin = 'yes';

      } else {
        vm.memberin = 'no';
      }
    });    
  },
  computed:{
    stylechange(){
      console.log(this.$route.path);
      const vm = this;
      let homePath = vm.$route.path;
      switch (homePath) {
        case '/':
          return true;
          break;
        case '/cart':
          return true;
          break;         
        default:
          return false;
          break;
      }
      console.log(vm.open);
      
    }
  },
  methods: {
    logout() {
      let api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/homepage");
        }
      });
    },     
    
  }, 
   
};


</script>