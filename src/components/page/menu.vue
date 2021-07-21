<template>
  <div>
    <section class="section">
      <div class="sticky-top t-5">
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
        <div class="menu-title-box text-center pt-4 bg-white pb-3">
          <img
            class="img-fluid mx-auto d-block hpx-9"
            src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
            alt="logo"
          />
          <h2>本店菜單<br />Menu</h2>
        </div>
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
              <div class="limage card-img-top hpx-30"></div>
              <div class="card-body content px-3 py-4">
                <h2 class="text-center isload p-3"></h2>
              </div>
            </div>
          </div>
          <div
            class="col-md-4 my-6 pt-5"
            v-for="item in custproducts"
            :key="item.id"
          >
            <router-link
              :to="{ path: `/product/${item.id}` }"
              data-aos="fade-in"
              data-offset="10"
            >
              <img
                class="card-img-top hvh-3 thumbnail"
                :src="item.imageUrl"
                :alt="item.category"
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
/* 把 scss 拆出去額外管理 , 進度調會吃不到 */
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