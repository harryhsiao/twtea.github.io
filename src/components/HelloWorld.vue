<template>
  <div>      
    <navbar />        
    <router-view />
    <footers class="section"/>
  </div>
</template>

<script>
import navbar from "./navbar";
import footers from "./footer";
export default {
  components: {
    navbar,
    footers,
  }, 
};
</script>
