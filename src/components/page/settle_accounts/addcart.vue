<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <main class="container mt-6 section-footer">
      <div class="row">
        <div class="col-lg-8">
          <div class="card mb-4">
            <div
              class="
                card-header
                d-md-flex
                justify-content-between
                align-items-center
              "
            >
              <h5 class="p-3">
                購物車 (共<span class="text-maincolor p-3 h2">{{
                  cartlong
                }}</span>
                筆購物內容)
              </h5>
              <a
                class="float-md-none float-right"
                href="#"
                @click.prevent="killall()"
                v-show="!isnone"
                ><i class="fas fa-snowplow p-2"></i>清空購物車</a
              >
            </div>
            <div class="card-body overflow-auto hvh-8">
              <p class="text-center mt-9" v-show="isnone">購物車是空的...</p>
              <div
                class="row mb-4 border-bottom"
                v-for="item in incart"
                :key="item.id"
              >
                <div class="col-md-5 col-lg-3">
                  <div class="mb-3 mb-md-0">
                    <img
                      class="img-fluid w-100"
                      :src="item.imageUrl"
                      :alt="item.category"
                    />
                  </div>
                </div>
                <div class="col-md-7 col-lg-9">
                  <div class="row">
                    <div class="col-md-5">
                      <h5>{{ item.title }}</h5>
                      <p class="mb-3 small">
                        {{ item.category }}
                      </p>
                    </div>
                    <div class="col-md-7">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button
                            @click="minercart(item)"
                            class="minus border-right-0 border border-dark"
                            :disabled="item.qty < 2"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                        <input
                          class="text-center"
                          min="1"
                          name="quantity"
                          :value="item.qty"
                          type="number"
                        />
                        <div class="input-group-prepend">
                          <button
                            @click="pluscart(item)"
                            class="plus border-left-0 border border-dark"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      my-5
                    "
                  >
                    <a
                      href="#!"
                      type="button"
                      class="small mr-3 text-danger"
                      @click.prevent="deletedcart(item.id)"
                      ><i class="fas fa-trash-alt mr-1"></i> 刪除商品
                    </a>
                    <p class="mb-0" v-if="!item.price">
                      <span>
                        <strong>價格 {{ item.origin_price | currency }}</strong>
                      </span>
                    </p>
                    <p class="mb-0" v-else>
                      <span>
                        <strong> 價格 {{ item.price | currency }} </strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="mb-3">結帳</h5>

              <ul class="list-group list-group-flush">
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    border-0
                    px-0
                    pb-0
                  "
                >
                  金額
                  <span>{{ totalprice | currency }}</span>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                  "
                  v-if="totalprice < 3000 && totalprice > 0"
                >
                  運費
                  <span>{{ 60 | currency }}</span>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                    text-success
                  "
                  v-else
                >
                  運費
                  <span>{{ 0 | currency }}</span>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    border-0
                    px-0
                    mb-3
                  "
                >
                  <div>
                    <strong class="h3">總價</strong>
                    <strong>
                      <p class="mb-0">(含稅)</p>
                    </strong>
                  </div>
                  <span class="h2" v-if="totalprice < 5000 && totalprice > 0"
                    ><strong>{{ (totalprice + 60) | currency }}</strong></span
                  >
                  <span class="h2" v-else
                    ><strong>{{ totalprice | currency }}</strong></span
                  >
                </li>
              </ul>

              <button class="btn btn-primary btn-block" @click="postcart()">
                結帳去
              </button>

              <router-link to="/cart" class="btn btn-secondary btn-block">
                繼續購物
              </router-link>
            </div>
          </div>
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
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      incart: JSON.parse(localStorage.getItem("mycart")) || [],
      isnext: false,
      isLoading: false,
      isnone: true,
      cartlong: 0,
      mytotalprice: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  created() {
    this.pricecal();
    this.incartnum();
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
        if (item.price !== null) {
          pricepack.push(item.price * item.qty);
        } else {
          pricepack.push(item.origin_price * item.qty);
        }
        console.log(pricepack);
      });
      if (pricepack.length > 0) {
        vm.totalprice = pricepack.reduce((a, b) => a + b);
      } else {
        vm.totalprice = pricepack;
      }
    },
    incartnum() {
      const vm = this;
      vm.cartlong = vm.incart.length;
      if (vm.cartlong === 0) {
        vm.isnone = true;
      } else {
        vm.isnone = false;
      }
    },
    postcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cacheID = [];
      const vm = this;
      if (vm.incart.length > 0) {
        vm.isLoading = true;
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
        this.$router.push("/checkpage/custinfo");
      } else {
        alert("購物車是空的噢");
      }
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
      vm.incartnum();
    },
    killall() {
      const vm = this;
      vm.incart = [];
      vm.cartlong = 0;
      localStorage.removeItem("mycart");
      vm.isnone = true;
    },
  },
};
</script>