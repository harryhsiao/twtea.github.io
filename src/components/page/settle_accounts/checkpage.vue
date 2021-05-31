<template>
  <div>
    <navbar />
    <div id="v-content" class="container" :style="{ minHeight: Height + 'px' }">
      <h2 class="text-center my-4">{{ CurrentTitle }}</h2>
      <section class="form-row text-center">
        <div class="col-12 col-sm-4">
          <div
            class="alert alert-rounded"
            role="alert"
            :class="{ 'alert-primary': alertopen == '/checkpage/custinfo' }"
          >
            1. 確認訂單
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div
            class="alert alert-rounded"
            role="alert"
            :class="{ 'alert-primary': alertopen == '/checkpage/custcheckout' }"
          >
            2. 送出訂單
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div
            class="alert alert-rounded"
            role="alert"
            :class="{
              'alert-primary': alertopen == `/checkpage/checkcomp/${orderId}`,
            }"
          >
            3. 完成
          </div>
        </div>
      </section>
      <router-view />
    </div>
    <footers />
  </div>
</template>


<script>
import navbar from "@/components/navbar";
import footers from "@/components/footer";
export default {
  data() {
    return {
      Height: 0,
      alertopen: "",
      orderId: "",
      CurrentTitle: "",
    };
  },
  computed: {
    stylechange() {
      const vm = this;
      console.log(vm.$route.path);
      let homePath = vm.$route.path;
      let IDaddress = `/checkpage/checkcomp/${vm.orderId}`;
      switch (homePath) {
        case "/checkpage/csutinfo":
          vm.CurrentTitle = "購物訂單";

          break;
        case "/checkpage/csutcheckout":
          vm.CurrentTitle = "最終確認";

          break;
        case IDaddress:
          vm.CurrentTitle = "購物成功";
          break;
      }
      vm.alertopen = homePath;
    },
  },
  components: {
    navbar,
    footers,
  },
  created() {
    this.orderId = this.$route.params.order_id;
    console.log(this.orderId);
    this.getcoupons();
  },
  mounted() {
    //動態設置內容高度 讓footer始終居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100; //監聽瀏覽器窗口變化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 100;
    };
  },
};
</script>