<template>
  <div>
    <nav
      class="
        navbar navbar-dark
        fixed-top
        bg-maincolor
        flex-md-nowrap
        p-0
        shadow
      "
    >
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/">回到主頁</a>
      <button
        class="navbar-brand col-sm-3 col-md-2 mr-0 d-inline d-md-none"
        @click="onsider"
      >
        管理員項目
        <i class="fas fa-bars"></i>
      </button>
    </nav>
    <nav class="col-md-2 bg-light sidebar" :class="{ showSidebar: tran,hideSidebar: !tran }">
      <div class="sidebar-sticky">
        <h6
          class="
            sidebar-heading
            d-flex
            justify-content-between
            align-items-center
            px-3
            mt-4
            mb-1
            text-muted
          "
        >
          <span class="h2">管理員項目</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/products"
              ><i class="fas fa-box-open fa-fw"></i
              >&nbsp;&nbsp;產品列表</router-link
            >
          </li>
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/orders"
              ><i class="fas fa-clipboard-list fa-fw"></i
              >&nbsp;&nbsp;訂單列表</router-link
            >
          </li>
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/coupon"
              ><i class="fas fa-ticket-alt fa-fw"></i
              >&nbsp;&nbsp;優惠券</router-link
            >
          </li>
          <li class="nav-item border py-4">
            <a class="nav-link h4" href="#" @click.prevent="logout()"
              ><i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;登出</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  transition: transform ease-in-out 0.5s;
}

.hideSidebar {
  transform: translate(-100%);
}

.showSidebar {
  transform: translate(0%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>

<script>
export default {
  data() {
    return {
      tran: false,
    };
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
    onsider() {
      const vm = this;
      vm.tran = !vm.tran;
    },
  },
};
</script>