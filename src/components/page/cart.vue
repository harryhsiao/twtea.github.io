<template>
  <div class="wraper">
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid text-white s2">
      <div class="btitle">
        <img
          class="img-fluid mb-2"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt=""
          style="height: 100px"
        />
        <h3 class="text-white border-top pt-4">台灣特色料理餐廳</h3>
      </div>
    </div>
    <div class="container">
      <!--前往購物車頁面按鈕-->
      <router-link
        tag="button"
        to="/addcart"
        class="btn btn-outline-success btn-circle"
      >
        <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger" v-if="cartlong > 0">{{
          cartlong
        }}</span>
        <br />購物車
      </router-link>
      <!--前往購物車頁面按鈕-->
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
      <div class="row">
        <!--商品過濾選項-->
        <div class="col-sm-4">
          <div class="list-group d-none d-sm-block">
            <h3
              class="list-group-item bg-maincolor text-white disabled"
              aria-disabled="true"
            >
              商品分類
            </h3>
            <a
              href="#"
              class="list-group-item list-group-item-action chselection"
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
              </div>
              <div
                class="col-sm-6 col-lg-4 mb-3"
                v-for="item in filtersdata[currentpage]"
                :key="item.id"
              >
                <div class="card text hover-shadow thumbnail">
                  <router-link :to="{ path: `/product/${item.id}` }">
                    <img
                      class="card-img-top"
                      :src="item.imageUrl"
                      :alt="item.category"
                      style="height: 150px"
                    />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="{ path: `/product/${item.id}` }">
                      <span class="badge badge-info">{{ item.category }}</span>
                      <h5>{{ item.title }}</h5>
                    </router-link>
                    <div class="d-flex justify-content-between">
                      <p v-if="item.price">
                        {{ item.price | currency
                        }}<span style="letter-space: 5px; font-size: 6px"
                          >/{{ item.unit }}</span
                        >
                      </p>
                      <p v-else>
                        {{ item.origin_price | currency
                        }}<span style="letter-space: 5px; font-size: 6px"
                          >/{{ item.unit }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-secondary cartbtn"
                    @click="addcart(item)"
                  >
                    <i class="fas fa-cart-plus fa-lg"></i>
                    加入購物車
                  </button>
                </div>
                <!--商品-->
              </div>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="pagination p1 pt-4 pl-4 mb-5">
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
.wraper {
  position: relative;
}

.btitle {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.thumbnail:hover {
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
}

.pagination ul {
  list-style-type: none;
}

.pagination a {
  display: inline-block;
  padding: 10px 18px;
  color: #222;
}

.p1 a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
}

.p1 a.is_active {
  background-color: #2ecc71;
  border-radius: 100%;
  color: #fff;
}
.s2 {
  background-color: #f2f2f2;
  background-size: cover;
  background-position: center center;
  background-image: url("https://images.pexels.com/photos/3123792/pexels-photo-3123792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
}

.chselection {
  background: linear-gradient(to left, transparent 50%, #add8e6 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;
  outline: none;
}

.chselection:hover {
  background-position: left;
  color: #4c5052;
}

.active {
  background-color: #add8e6;
  color: #4c5052;
  outline: 0;
  border: none;
}

.cartbtn {
  border-radius: 0;
  background: linear-gradient(to bottom, transparent 50%, #add8e6 50%);
  background-size: 100% 200%;
  transition: 0.1s ease-out;
  outline: none;
}

.cartbtn:hover {
  background-position: 0 100%;
  color: #4c5052;
}

.btn-circle {
  border-radius: 50px;
  width: 10vh;
  height: 10vh;
  position: fixed;
  right: 2%;
  bottom: 30%;
  z-index: 9999999;
}
</style>

<script>
import $ from "jquery";

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
  methods: {
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.custproducts = resp.data.products;
        vm.getoption(vm.custproducts);
      });
    },
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
      let titlearray = [];
      vm.currentpage = 0;
      vm.filtersproducts = [];
      tempData = vm.custproducts.filter((item) => {
        if (vm.productsearch === "") {
          switch (vm.optiontext) {
            case "":
              return vm.custproducts;
              break;
            case "全部商品":
              return vm.custproducts;
              break;
            case item.category:
              return item;
              break;

            default:
              console.log("拍謝~抓不到資料:P");
              break;
          }
        } else {
          return item.title.match(vm.productsearch);
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