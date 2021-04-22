<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <main>
      <div class="container">
        <!--Section: Block Content-->
        <section class="mt-5 mb-4">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div class="col-lg-8">
              <!-- Card -->
              <div class="card wish-list mb-4">
                <div class="card-body">
                  <h5 class="mb-4">
                    購物車 (共<span>{{ cartlong }}</span> 筆購物內容)
                  </h5>

                  <div class="row mb-4" v-for="item in incart" :key="item.id">
                    <div class="col-md-5 col-lg-3 col-xl-3">
                      <div
                        class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0"
                      >
                        <a href="#!">
                          <img
                            class="img-fluid w-100"
                            :src="item.imageUrl"
                            :alt="item.category"
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h5>{{ item.title }}</h5>
                            <p class="mb-3 text-muted text-uppercase small">
                              {{ item.category }}
                            </p>
                          </div>
                          <div>
                            <div
                              class="def-number-input number-input safari_only mb-0 w-100"
                            >
                              <button @click="minercart(item)" class="minus">
                                <i class="fas fa-minus"></i>
                              </button>
                              <input
                                class="quantity"
                                min="1"
                                name="quantity"
                                :value="item.qty"
                                type="number"
                              />
                              <button @click="pluscart(item)" class="plus">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <small
                              id="passwordHelpBlock"
                              class="form-text text-muted text-center"
                            >
                              {{ item.unit }}
                            </small>
                          </div>
                        </div>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <a
                              href="#!"
                              type="button"
                              class="card-link-secondary small text-uppercase mr-3 text-danger"
                              @click.prevent="deletedcart(item.id)"
                              ><i class="fas fa-trash-alt mr-1"></i> 刪除商品
                            </a>
                          </div>
                          <p class="mb-0" v-if="!item.price">
                            <span
                              ><strong
                                >價格
                                {{ item.origin_price | currency }} 元</strong
                              ></span
                            >
                          </p>
                          <p class="mb-0" v-else>
                            <span
                              ><strong
                                >價格 {{ item.price | currency }} 元</strong
                              ></span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mb-4" />

                  <div class="card wish-list mb-4">
                    <div class="card-body">
                      <h5 class="mb-4">其他人也買了...</h5>
                      <div class="productcard d-flex">
                        <div class="productcard">
                          <h3>123456</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Card -->

              <!-- Card -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="mb-4">我們接受以下付款方式</h5>

                  <img
                    class="mr-2"
                    width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <img
                    class="mr-2"
                    width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <img
                    class="mr-2"
                    width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                </div>
              </div>
              <!-- Card -->
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-lg-4">
              <!-- Card -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="mb-3">結帳</h5>

                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                    >
                      金額
                      <span>{{ totalprice | currency }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center px-0"
                      v-if="totalprice < 3000 && totalprice > 0"
                    >
                      運費
                      <span>{{ 60 | currency }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center px-0 text-success"
                      v-else
                    >
                      運費
                      <span>{{ 0 | currency }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                    >
                      <div>
                        <strong class="h3">總價</strong>
                        <strong>
                          <p class="mb-0">(含稅)</p>
                        </strong>
                      </div>
                      <span
                        class="h2"
                        v-if="totalprice < 5000 && totalprice > 0"
                        ><strong>{{
                          (totalprice + 60) | currency
                        }}</strong></span
                      >
                      <span class="h2" v-else
                        ><strong>{{ totalprice | currency }}</strong></span
                      >
                    </li>
                  </ul>                  

                  <router-link
                    to="/checkpage/custinfo"
                    class="btn btn-primary btn-block waves-effect waves-light"
                    @click.native="postcart()"
                  >
                    結帳去
                  </router-link>

                   <router-link
                    to="/cart"
                    class="btn btn-secondary btn-block waves-effect waves-light"
                  >
                    繼續購物
                  </router-link>

                </div>
              </div>              
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      custcart: {},
      coupons: [],
      incart: JSON.parse(localStorage.getItem("mycart")) || [],
      couponcode: "",
      isnext: false,
      isLoading: false,
      cartlong: 0,
      totalprice: 0,
    };
  },
  created() {
    this.getcart();
    this.getcoupon();
    this.pricecal();
  },
  computed: {
    changestyle() {
      const vm = this;
      switch (vm.isnext) {
        case true:
          return "text-info";
          break;

        default:
          return "text-secondary";
          break;
      }
    },
  },
  methods: {
    pricecal() {
      const vm = this;
      const pricepack = [];
      vm.incart.forEach((item) => {
        if (item.price > 0 || item.price !== "") {
          pricepack.push(item.price * item.qty);
        } else {
          pricepack.push(item.origin_price * item.qty);
        }
        console.log(pricepack)
      });
      if (pricepack.length > 0) {
        vm.totalprice = pricepack.reduce((a, b) => a + b);
      } else {
        vm.totalprice = pricepack;
      }
    },
    getcoupon() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.coupons = response.data.coupons;
      });
    },
    getcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      let cartnum = [];
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.custcart = resp.data.data;
        cartnum = resp.data.data.carts;
      });
      vm.cartlong = vm.incart.length;
    },
    postcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cacheID = [];
      const vm = this;
      vm.isLoading = true;
      if(vm.incart.length > 0 ){
      vm.$http
        .get(api)
        .then((res) => {
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        })
        .then(() => {
          cacheID.forEach((item) => {
            vm.$http.delete(`${api}/${item}`).then(() => {
              console.log("購物車已經清空");
            });
          });
        })
        .then(() => {
          vm.incart.forEach((item) => {
            const cache = {
              product_id: item.product_id,
              qty: item.qty,
            };
            vm.$http.post(api, { data: cache }).then(() => {
              vm.incart = [];
              localStorage.removeItem("mycart");
              vm.isLoading = false;
              vm.getcart();
              vm.pricecal();
            });
          });
        });
      }else{}
    },
    pluscart(data) {
      const vm = this;
      const cacheCarID = []; //為達成利用id來判斷資料是否存在,先抓取舊有資料內的id
      vm.incart.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      let cache = {};
      vm.incart.forEach((item, keys) => {
        if (item.product_id === data.id) {
          let { qty } = item;
          cache = {
            category: data.category,
            content: data.content,
            description: data.description,
            id: data.id,
            imageUrl: data.imageUrl,
            origin_price: parseInt(data.origin_price),
            price: parseInt(data.price),
            title: data.title,
            unit: data.unit,
            product_id: data.id,
            qty: parseInt((qty += 1)),
          };
          vm.incart.splice(keys, 1, cache);
        }
      });
      localStorage.setItem("mycart", JSON.stringify(vm.incart));
      vm.pricecal();
    },
    minercart(data) {
      const vm = this;
      const cacheCarID = []; //為達成利用id來判斷資料是否存在,先抓取舊有資料內的id
      vm.incart.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      let cache = {};
      vm.incart.forEach((item, keys) => {
        if (item.product_id === data.id && data.qty > 1) {
          let { qty } = item;
          cache = {
            category: data.category,
            content: data.content,
            description: data.description,
            id: data.id,
            imageUrl: data.imageUrl,
            origin_price: parseInt(data.origin_price),
            price: parseInt(data.price),
            title: data.title,
            unit: data.unit,
            product_id: data.id,
            qty: parseInt((qty -= 1)),
          };
          vm.incart.splice(keys, 1, cache);
        }
      });
      localStorage.setItem("mycart", JSON.stringify(vm.incart));
      vm.pricecal();
    },
    deletedcart(id) {
      const vm = this;
      vm.incart.forEach((item, keys) => {
        if (item.product_id === id) {
          vm.incart.splice(keys, 1);
        }
      });
      localStorage.setItem("mycart", JSON.stringify(vm.incart));
      vm.pricecal();
    },
    usecoupon(data) {
      const vm = this;
      let cache = {};
      const cacheCarID = []; //為達成利用id來判斷資料是否存在,先抓取舊有資料內的id
      const couponid = [];
      vm.coupons.forEach((item)=>{
        couponid.push(item.code)
      })
      vm.incart.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      vm.incart.forEach((item, keys) => {
        if (item.product_id === data.id && vm.couponid.indexOf(vm.couponcode) === 1) {
          cache = {
            category: data.category,
            content: data.content,
            description: data.description,
            id: data.id,
            imageUrl: data.imageUrl,
            origin_price: data.origin_price,
            price: data.price,
            title: data.title,
            unit: data.unit,
            product_id: data.id,
            qty: data.qty,
            coupon: {
              code: vm.couponcode,
            },
          };
          vm.incart.splice(keys, 1, cache);
        }
      });
      localStorage.setItem("mycart", JSON.stringify(vm.incart));
    },
  },
};
</script>