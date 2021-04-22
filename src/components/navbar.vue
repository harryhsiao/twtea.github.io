<template>
  <div>
    <nav class="navbar navbar-expand-lg heightback" :class="stylechange">
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
          <router-link class="nav-item nav-link" to="/" href="#"
            >品牌介紹</router-link
          >
          <router-link class="nav-item nav-link" to="/cart" href="#"
            >嚴選好食</router-link
          >
          <router-link class="nav-item nav-link" to="/shop" href="#"
            >門市據點</router-link
          >
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
              class="btn btn-secondary btn-circle ml-4 mr-5"
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
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.btn-circle {
  border-radius: 50px;
}

.heightback {
  transition: padding ease-in-out 0.5s;
}
</style>

<script>
export default {
  data() {
    return {
      memberin: "no",
      open: true,
      windowTop: 0,
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
      console.log(vm.$route.path);
      let homePath = vm.$route.path;
      switch (homePath) {
        case "/dashboard/products":
          return "navbar-light bg-white p-5";
          break;
        case "/dashboard/orders":
          return "navbar-light bg-white p-5";
          break;
        case "/dashboard/coupon":
          return "navbar-light bg-white p-5";
          break;
        case "/":
          if (vm.windowTop > 30) {
            return "navbar-dark bg-dark fixed-top p-lg-2";
          } else {
            return "navbar-dark bg-dark fixed-top p-lg-5";
          }
          break;
        default:
          return "navbar-dark bg-dark p-2";
          break;
      }
      console.log(vm.open);
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