<template>
  <div>
    <button class=" position-fixed border-0 p-3 topbutton " :class="stylechange" @click="gotop">
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<style scoped>

.topbutton {
  bottom: 85px;
  right: 10px;
  z-index: 999;
  outline: none;
  transition: opacity ease-in-out 0.2s,background-color ease-in-out 0.2s;
}

.topbutton:hover{
    background-color: rgb(57, 231, 217);
}
</style>

<script>
export default {
  data() {
    return {
      windowTop: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    stylechange() {
      const vm = this;
      if (document.body.scrollTop > 800 || vm.windowTop > 800) {
        return "opacity-5";
      } else {
        return "opacity-0";
      }
    },
  },
  methods: {
    gotop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    onScroll(e) {
      const vm = this;
      vm.windowTop =
        window.top.scrollY; /* or: e.target.documentElement.scrollTop */
    },
  },
};
</script>