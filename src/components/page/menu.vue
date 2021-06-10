<template>
  <div>
    <loading :active.sync="isLoading" class="bg-bwood w-100 fullpg-bgcover loadopacity">
      <img
        class="img-fluid mx-auto d-block"
        src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
        alt="logo"
        style="height: 90px"
      />
      <h3 class="text-white border-top pt-4">台灣特色料理餐廳</h3>
    </loading>
    <section class="py-4 fricephoto bgimage">
      <div class="container p-2 p-md-5 border border-maincolor">
        <div class="card p-3 border border-maincolor">
          <div class="card-body">
            <img
              class="img-fluid mx-auto d-block"
              src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
              alt="logo"
              style="height: 90px"
            />
            <ul
              class="
                price-style
                menu-content
                mx-auto
                d-lg-block d-none
                text-primary
              "
            >
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
    </section>
    <section>
      <div class="menu-title-box sticky-top text-center pt-4 pb-5 bg-white">
        <h2>本店菜單<br />Menu</h2>
      </div>
      <div class="container">
        <div class="row">
          <div
            class="col-md-4 mb-5 thumbnail"
            v-for="item in custproducts"
            :key="item.id"
          >
            <router-link :to="{ path: `/product/${item.id}` }">
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

.loadopacity {
  transition: opacity ease-in-out 0.3s;
}

.menu-content {
  writing-mode: vertical-rl;
  font-size: 2rem;
}

.thumbnail:hover {
  transition: box-shadow ease-in-out 0.3s;
  box-shadow: 0 1rem 1rem rgb(0 0 0 / 8%);
}

.fullpg-bgcover {
  transition: background-color ease-in-out 0.3s;
}

.price-style {
  list-style: none;
}

.price-style li span {
  writing-mode: horizontal-tb;
  color: tomato;
}
</style>

<script>
export default {
  data() {
    return {
      custproducts: [],
      isLoading: false,
      status: {
        fileuploading: false,
      },
    };
  },
  created() {
    this.getproducts();
  },
  methods: {
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
        vm.custproducts = resp.data.products;
      });
    },
  },
};
</script>