<template>
  <div class="">
    <alert />
    <div class="container-fluid">
      <div class="row">
        <sidebar />
        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4 pt-7">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import sidebar from "./sidebar";
import alert from "@/components/kit/alertnote";

export default {
  data() {
    return {
      paginations: {},
    };
  },
  components: {
    sidebar,
    alert,
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)custToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    this.$http.defaults.headers.common.Authorization = `${token}`;
    this.getproducts();
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.paginations = response.data.pagination;
      });
    },
  },
};
</script>

<style scoped>
body {
  font-size: 0.875rem;
}
navbar {
  z-index: 0;
}
</style>