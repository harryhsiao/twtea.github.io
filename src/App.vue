<template>
  <div id="app">
    <!--font-awesome-icon icon="user-secret" /-->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
    console.log(process.env.APIPATH);
    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
