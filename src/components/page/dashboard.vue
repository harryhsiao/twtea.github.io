<template>
  <div class="">
    <navbar />

    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
         <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../navbar";
import sidebar from "../sidebar";
export default {
  components: {
    navbar,
    sidebar,
  },
};
</script>

<style scoped>
body {
  font-size: 0.875rem;
}
navbar{
  z-index: 0;
}
</style>