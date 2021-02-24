<template>
  <div id="app">
    <!--font-awesome-icon icon="user-secret" /-->   
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
    console.log(process.env.APIPATH);
    this.$http.get(api).then((response) => {
      console.log(response.data);
    });
  },
};
</script>

<style lang="scss">
@import './assets/all';
</style>
