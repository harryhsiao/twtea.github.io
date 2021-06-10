<template>
  <div>
    <nav class="navbar navbar-expand-lg heightback" :class="stylechange">
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
        <div class="animated-icon" :class="{ open: hambtn }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link
            class="nav-item nav-link"
            to="/login"
            href="#"
            v-if="memberin == 'no'"
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
          <router-link class="nav-item nav-link" to="/" href="#"
            >品牌介紹</router-link
          >
          <router-link class="nav-item nav-link" to="/menu" href="#"
            >美味菜單</router-link
          >
          <router-link class="nav-item nav-link" to="/cart" href="#"
            >線上訂購</router-link
          >
          <router-link class="nav-item nav-link" to="/shop" href="#"
            >門市據點</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.heightback {
  transition: padding ease-in-out 0.5s;
}
@media screen and (max-width: 600px){
  .heightback {
    transition: background-color ease-in-out 0.3s;
  }
}
</style>

<script>
export default {
  data() {
    return {
      memberin: "no",
      open: true,
      windowTop: 0,
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
            return "navbar-light bg-bwood fixed-top py-lg-2";
          } else {

            if(vm.hambtn === true){

              return "navbar-light bg-bwood fixed-top py-lg-2";

            }else{

              return "navbar-dark bg-transparent fixed-top py-lg-5";

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
        console.log(response.data);
        if (response.data.success) {
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
        console.log(response.data);
        if (response.data.success) {
          vm.memberin = "yes";
        } else {
          vm.memberin = "no";
        }
      });
    },
  },
};
</script>