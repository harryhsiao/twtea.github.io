<template>
  <div>
    <!--section class="py-4 mt-5 fricephoto bgimage">
      <div class="container p-2 p-md-5 border border-maincolor">
        <div class="card p-3 border border-maincolor">
          <div class="card-body">
            <ul class="price-style menu-content d-lg-block d-none text-primary">
              <li class="mx-4">牛肉炒芥藍&nbsp; <span>350</span>元</li>
              <li class="mx-4">三層炒蒜苗&nbsp; <span>100</span>元</li>
              <li class="mx-4">金莎嫩豆腐&nbsp; <span>250</span>元</li>
              <li class="mx-4">黃金烏魚子&nbsp; <span>750</span>元</li>
              <li class="mx-4">螃蟹豆腐煲&nbsp; <span>450</span>元</li>
              <li class="mx-4">古早味封肉&nbsp; <span>350</span>元</li>
              <li class="mx-4">純味蘿蔔糕&nbsp; <span>250</span>元</li>
              <li class="mx-4">薑絲鮮魚湯&nbsp; <span>350</span>元</li>
              <li class="mx-4">蒜蓉海戰車&nbsp; <span>時&nbsp;價</span></li>
              <li class="mx-4">以及其他菜色&nbsp;．．．</li>
            </ul>
            <ul
              class="
                price-style
                d-lg-none d-block
                text-primary text-center
                pl-0
              "
            >
              <li class="my-4">牛肉炒芥藍&nbsp; <span>350</span>元</li>
              <li class="my-4">三層炒蒜苗&nbsp; <span>100</span>元</li>
              <li class="my-4">金莎嫩豆腐&nbsp; <span>250</span>元</li>
              <li class="my-4">黃金烏魚子&nbsp; <span>750</span>元</li>
              <li class="my-4">螃蟹豆腐煲&nbsp; <span>450</span>元</li>
              <li class="my-4">古早味封肉&nbsp; <span>350</span>元</li>
              <li class="my-4">純味蘿蔔糕&nbsp; <span>250</span>元</li>
              <li class="my-4">薑絲鮮魚湯&nbsp; <span>350</span>元</li>
              <li class="my-4">蒜蓉海戰車&nbsp; <span>時&nbsp;價</span></li>
              <li class="my-4">以及其他菜色&nbsp;．．．</li>
            </ul>
            <p
              class="text-center"
              style="line-height: 2rem; letter-spacing: 0.1rem"
            >
              30人以上團體請先預約<br />本店亦有販售自製料理包,請來電預約<br />或參考網路商店
            </p>
          </div>
        </div>
      </div>
    </section-->
    <section class="section">
      <div class="progress mt-5" :class="{ 'd-none': isLoading === false }">
        <div
          class="
            progress-bar progress-bar-striped progress-bar-animated
            bg-maincolor
          "
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div
        class="menu-title-box sticky-top text-center pt-4 bg-white"
        style="top: 44px"
      >
        <img
          class="img-fluid mx-auto d-block"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt="logo"
          style="height: 90px"
        />
        <h2>本店菜單<br />Menu</h2>
      </div>
      <div class="container">
        <div class="row">
          <div
            class="col-md-4 my-5 pt-5"
            :class="{ 'd-none': !isLoading }"
            v-for="index in 3"
            :key="index"
          >
            <div class="cards m-5">
              <div class="limage card-img-top" style="height: 300px"></div>
              <div class="card-body content px-3 py-4">
                <h2 class="text-center isload p-3"></h2>
              </div>
            </div>
          </div>
          <div
            class="col-md-4 my-5 pt-5 thumbnail"
            v-for="item in custproducts"
            :key="item.id"
          >
            <router-link
              :to="{ path: `/product/${item.id}` }"
              data-aos="fade-in"
              data-offset="10"
            >
              <img
                class="card-img-top"
                :src="item.imageUrl"
                :alt="item.category"
                style="height: 35vh"
              />
              <h3 class="text-center mt-3 text-dark">{{ item.title }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 0%;
  animation: progres 4s linear;
  animation-fill-mode: forwards;
}

@keyframes progres {
  0% {
    width: 0%;
  }
  25% {
    width: 50%;
  }
  50% {
    width: 75%;
  }
  75% {
    width: 85%;
  }
  100% {
    width: 100%;
  }
} ;
</style>


<script>
export default {
  data() {
    return {
      custproducts: [],
      status: {
        barValue: 0,
        isLoading: false,
        fileuploading: false,
      },
    };
  },
  mounted() {
    this.progressbar();
  },
  created() {
    this.getproducts();
  },
  methods: {
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        this.$http.get(api).then((resp) => {
          console.log(resp.data);
          vm.isLoading = false;
          vm.custproducts = resp.data.products;
        });
      }, 4000);
    },
  },
};
</script>