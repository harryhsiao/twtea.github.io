<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top heightback" :class="stylechange">
      <button
        @touchstart="hambtn = !hambtn"
        class="navbar-toggler border-0 ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div class="animated-icon" :class="{ 'open': hambtn }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div class="collapse navbar-collapse text-center" @touchstart="hambtn = !hambtn" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto navtext">
          <router-link
            class="nav-item nav-link"
            to="/login"
            href="#"
            v-if="memberin==false"
            >登入</router-link
          > 
          <div class="dropdown" v-else>
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-light text-bwood rounded-circle mr-2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <router-link
                class="dropdown-item"
                to="/dashboard/products"
                href="#"
                >客戶中心</router-link
              >
              <a class="dropdown-item" href="#" @click.prevent="logout()"
                >登出</a
              >
            </div>
          </div>
          <router-link class="nav-item nav-link" to="/" href="#" data-toggle="collapse" data-target=".navbar-collapse.show"
            >品牌介紹</router-link
          >
          <router-link class="nav-item nav-link" to="/menu" href="#" data-toggle="collapse" data-target=".navbar-collapse.show"
            >美味菜單</router-link
          >
          <router-link class="nav-item nav-link" to="/cart" href="#" data-toggle="collapse" data-target=".navbar-collapse.show"
            >線上訂購</router-link
          >
          <router-link class="nav-item nav-link" to="/shop" href="#" data-toggle="collapse" data-target=".navbar-collapse.show"
            >門市據點</router-link
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
      windowTop: 0,
      memberin: false,
      hambtn: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  created() {
    this.islogin();
  },
  computed: {
    stylechange() {
      const vm = this;
      let homePath = vm.$route.path;
      switch (homePath) {
        case "/":
          if (vm.windowTop > 10) {
            return "navbar-light bg-bwood py-lg-2";
          } else {

            if(vm.hambtn === true){

              return "navbar-light bg-bwood py-lg-2";

            }else{

              return "navbar-dark bg-transparent py-lg-5";

            }            
          }
          break;
        default:
          return "navbar-light bg-bwood p-2";
          break;
      }
    },
  },
  methods: {
    logout() {
      let api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.memberin = false;
          vm.$router.push("/");
        }
      });
    },
    onScroll(e) {
      const vm = this;
      vm.windowTop =
        window.top.scrollY; /* or: e.target.documentElement.scrollTop */
    },
    islogin() {
      let api = `${process.env.APIPATH}/api/user/check`;
      let vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.memberin = true;
        } else {
          vm.memberin = false;
        }
      });
    },
  },
};
</script>