<template>
  <div>
    <div
      class="jumbotron jumbotron-fluid text-white main-image image-cover mt-4"
    >
      <div
        class="
          d-flex
          justify-content-center
          image-text-combo
          text-center
          align-items-center
        "
      >
        <img
          class="img-fluid mb-2 hpx-10"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt="logo"
        />
        <h3 class="text-white border-top pt-4">台灣特色料理餐廳</h3>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!--商品過濾選項-->
        <div class="col-sm-4">
          <div class="row align-items-baseline">
            <div class="col-7">
              <breadcrumb class="h3" />
            </div>
            <div class="col-5">
              <!--前往購物車頁面按鈕-->
              <router-link
                to="/addcart"
                class="
                  position-relative
                  text-info
                  float-right
                  pr-3
                  d-block d-md-none
                "
              >
                <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
                <span
                  class="badge badge-pill position-absolute t-20 badge-danger"
                  v-if="cartlong > 0"
                  >{{ cartlong }}</span
                >
              </router-link>
              <!--前往購物車頁面按鈕-->
            </div>
          </div>
          <div class="list-group d-none d-sm-block">
            <a
              href="#"
              class="
                list-group-item list-group-item-action
                border-0
                h3
                chselection
              "
              v-for="(item, index) in categorys"
              :key="index"
              :class="{ active: optiontext === item }"
              @click.prevent="changeoption"
              >{{ item }}</a
            >
          </div>
        </div>
        <!--商品過濾選項-->
        <!--商品-->
        <div class="col-sm-8">
          <div class="container">
            <div class="row">
              <div class="col-12 mb-4">
                <div class="row align-center">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="輸入想要搜尋的商品"
                        aria-label="輸入想要搜尋的商品"
                        aria-describedby="button-addon2"
                        v-model="productsearch"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">搜尋</span>
                      </div>
                    </div>
                    <!--RWD商品過濾選項-->
                    <select
                      name=""
                      id=""
                      class="d-sm-none d-block w-100 mb-4"
                      @change="changeValue"
                    >
                      <option v-for="(item, index) in categorys" :key="index">
                        {{ item }}
                      </option>
                    </select>
                    <!--RWD商品過濾選項-->
                  </div>
                  <div class="col-md-6 text-right">
                    <!--前往購物車頁面按鈕-->
                    <router-link
                      to="/addcart"
                      class="badge-pop-up text-info d-none d-md-block"
                    >
                      <i
                        class="fas fa-shopping-cart fa-2x"
                        aria-hidden="true"
                      ></i>
                      <span
                        class="badge badge-pill badge-danger"
                        v-if="cartlong > 0"
                        >{{ cartlong }}</span
                      >
                    </router-link>
                    <!--前往購物車頁面按鈕-->
                  </div>
                </div>
              </div>
              <div
                class="col-md-4 mb-3"
                :class="{ 'd-none': !isLoading }"
                v-for="index in 10"
                :key="index"
              >
                <div class="cards w-100">
                  <div class="limage card-img-top hpx-20"></div>
                  <p class="isload p-3 mt-2"></p>
                </div>
              </div>
              <div
                class="col-md-6 col-lg-4 mb-3"
                :class="{ 'd-none': isLoading }"
                v-for="item in filtersdata[currentpage]"
                :key="item.id"
              >
                <div class="card thumbnail">
                  <router-link :to="{ path: `/product/${item.id}` }">
                    <img
                      class="card-img-top hpx-15"
                      :src="item.imageUrl"
                      :alt="item.category"
                    />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="{ path: `/product/${item.id}` }">
                      <span class="badge badge-info">{{ item.category }}</span>
                      <h5>{{ item.title }}</h5>
                    </router-link>
                    <div class="d-flex justify-content-between">
                      <p v-if="item.price">
                        {{ item.price | currency }}
                        <span class="price-unit"> /{{ item.unit }} </span>
                      </p>
                      <p v-else>
                        {{ item.origin_price | currency }}
                        <span class="price-unit"> /{{ item.unit }} </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-secondary rounded-0 cartbtn"
                    @click="addcart(item)"
                  >
                    <i class="fas fa-tag"></i>
                    加入購物車
                  </button>
                </div>
                <!--商品-->
              </div>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="pagination pg-num pt-4 pl-4 mb-5">
                    <ul class="m-0 p-0">
                      <a href="#" @click.prevent="prev"
                        ><li><i class="fas fa-chevron-left"></i></li
                      ></a>
                      <a
                        v-for="(page, key) in filtersdata.length"
                        :key="key"
                        :class="{ is_active: currentpage === page - 1 }"
                        @click.prevent="currentpage = page - 1"
                        href="#"
                        ><li>{{ page }}</li></a
                      >
                      <a href="#" @click.prevent="next"
                        ><li><i class="fas fa-chevron-right"></i></li
                      ></a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chselection {
  background: linear-gradient(to left, transparent 50%, #42b983 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;
  outline: none;
}

.chselection:hover {
  background-position: left;
  color: #edf9ff;
}

.active {
  color: #42b983;
  outline: 0;
  border: none;
}
</style>

<script>
import $ from "jquery";
import breadcrumb from "@/components/kit/breadcrumb";

export default {
  data() {
    return {
      custproducts: [],
      filtersproducts: [],
      incart: JSON.parse(localStorage.getItem("mycart")) || [],
      cartnum: [],
      cartid: [],
      categorys: ["全部商品"],
      selected: 0,
      currentpage: 0,
      productsearch: "",
      cartlong: "",
      optiontext: "全部商品",
      searchtext: "",
      isLoading: false,
    };
  },
  created() {
    this.getproducts();
    this.getcart();
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  components: {
    breadcrumb,
  },
  methods: {
    getcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.cartnum = resp.data.data.carts;
        vm.cartnum.forEach((item) => {
          vm.cartid.push(item.product_id);
        });
      });
    },
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        setTimeout(() => {
          vm.isLoading = false;
        }, 5000);
        vm.custproducts = resp.data.products;
        vm.getoption(vm.custproducts);
      });
    },
    addcart(data) {
      const vm = this;
      const cacheCarID = []; //為達成利用id來判斷資料是否存在,先抓取舊有資料內的id
      vm.incart.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      if (cacheCarID.indexOf(data.id) === -1) {
        //利用indexOf來判斷id是否存在,若不存在(===-1)就直接把資料送出
        const cartContent = {
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
          qty: 1,
        };
        vm.incart.push(cartContent);
        localStorage.setItem("mycart", JSON.stringify(vm.incart));
      } else {
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
            vm.incart.splice(keys, 1);
          }
        });
        vm.incart.push(cache);
        localStorage.setItem("mycart", JSON.stringify(vm.incart));
      }
      vm.cartlong = vm.incart.length;
    },
    getoption(element) {
      const vm = this;
      element.forEach(function (el) {
        if (vm.categorys.indexOf(el.category) === -1) {
          vm.categorys.push(el.category);
        }
      });
    },
    changeoption(e) {
      const vm = this;
      vm.optiontext = e.target.text;
      console.log(e.target.text);
    },
    changeValue(e) {
      const vm = this;
      vm.optiontext = e.target.value;
      console.log(e.target.value);
    },
    onScroll(e) {
      const vm = this;
      vm.windowTop =
        window.top.scrollY; /* or: e.target.documentElement.scrollTop */
    },
    prev() {
      const vm = this;
      if (vm.currentpage === 0) {
        vm.currentpage = 0;
      } else {
        vm.currentpage--;
      }
    },
    next() {
      const vm = this;
      if (vm.currentpage === vm.filtersproducts.length - 1) {
        vm.currentpage = vm.filtersproducts.length - 1;
      } else {
        vm.currentpage++;
      }
    },
  },
  computed: {
    categoryData() {
      //外層設定 category 為空字串
      //curr.category 為目前處理的分類，第一次執行時候
      //prev 是 [] 而 curr 為祝賀節慶的資料
      //因此符合 curr.category !== category 判斷條件
      //就執行 prev.push(curr.category);
      //後面在設定 category 為目前處理的分類，也就是祝賀節慶
      //就這樣循環，若遇到不同分類名稱就推分類名稱到 prev
      const vm = this;
      let category = "";
      return vm.custproducts.reduce((prev, curr) => {
        if (curr.category !== category) {
          prev.push(curr.category);
        }
        category = curr.category;
        return prev;
      }, []);
    },
    filtersdata() {
      const vm = this;
      let tempData = [];
      vm.currentpage = 0;
      vm.filtersproducts = [];
      tempData = vm.custproducts.filter((item) => {
        if (vm.productsearch === "") {
          switch (vm.optiontext) {
            case "":
              if (item.is_enabled === 1) {
                return vm.custproducts;
              }
              break;
            case "全部商品":
              if (item.is_enabled === 1) {
                return vm.custproducts;
              }
              break;
            case item.category:
              if (item.is_enabled === 1) {
                return item;
              }
              break;

            default:
              console.log("拍謝~抓不到資料:P");
              break;
          }
        } else {
          if (item.is_enabled === 1) {
            return item.title.match(vm.productsearch);
          }
        }
      });
      // 使用 forEach 跑迴圈，i 餘 2 等於 0 時候，ex. 2 筆 / 2 = 0，就推一筆空頁面存放商品
      // const pagenum = parseInt(i/2) 是用來產生分頁數 (目前第幾頁)
      // filtersproducts[pagenum].push(item) 則是將指定的頁面加入 (第 x 頁的內容)
      // 最後回傳 filtersproducts 讓商品資料跑出來
      tempData.forEach((item, i) => {
        if (i % 10 == 0) {
          vm.filtersproducts.push([]);
        }
        const pagenum = parseInt(i / 10);
        vm.filtersproducts[pagenum].push(item);
      });

      return vm.filtersproducts;
    },
  },
};
</script>