<template>
  <div>
    <navbar />
    <backtop />
    <router-view />
    <footers />
  </div>
</template>



<script>
import backtop from "@/components/kit/back2top";
import navbar from "./navbar";
import footers from "./footer";
export default {  
  components: {
    navbar,
    footers,
    backtop,
  },
};
</script>
