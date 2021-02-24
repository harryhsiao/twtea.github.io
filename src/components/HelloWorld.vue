<template>
  <div>      
    <navbar />        
    <router-view />
    <footers />
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

<style scoped>
header, main{
  height: calc(101vh - 136px - 180px);
}
.title--jr {
  letter-spacing: 105px;
}
.line {
  width: 75%;
  height: 1px;
  background-color: #000;
}

.title h1 {
  font-size: 350px;
  font-family: PMingLiU;
  letter-spacing: 135px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}
.con-h1 {
  font-size: 120px;
}

.footer {
  max-width: 100%;
}

</style>