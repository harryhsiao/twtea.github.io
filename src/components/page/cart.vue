<template>
  <div class="wraper">
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid text-white s2">
      <div class="container">
        <h1 class="display-4">Fluid jumbotron</h1>
        <p class="lead">
          This is a modified jumbotron that occupies the entire horizontal space
          of its parent.
        </p>
      </div>
    </div>
    <div class="container">
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
      <div class="row">
        <div class="col-sm-4">
          <div
            class="list-group d-none d-sm-block"
            v-for="(item, index) in categorys"
            :key="index"
          >
            <a
              href="#"
              class="list-group-item list-group-item-action my-3 chselection"
              @click.prevent="changeoption"
              >{{ item }}</a
            >
          </div>
        </div>
        <div class="col-sm-8">
          <div class="container">
            <div class="row">
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
                    />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="{ path: `/product/${item.id}` }">
                      <span class="badge badge-info">{{ item.category }}</span>
                      <h5>{{ item.title }}</h5>
                    </router-link>
                    <div class="d-flex justify-content-between">
                      <p>
                        {{ item.price | currency
                        }}<span style="letter-space: 5px; font-size: 6px"
                          >/{{ item.unit }}</span
                        >
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="addcart(item.id)"
                      >
                        <i class="fas fa-cart-plus fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
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
  background-color: transparent;
}

.chselection:hover {
  background-color: #3ca4e0;
  color: #f2f2f2;
  transition: color ease-in-out 0.4s;
  transition: background-color ease-in-out 0.4s;
}

.active {
  background-color: #3ca4e0;
  color: #f2f2f2;
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
      categorys: ["全部商品"],
      selected: 0,
      currentpage: 0,
      cartlong: 0,
      windowTop: 0,
      optiontext: "",
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
      let newdata = [];
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.custproducts = resp.data.products;
        /*vm.custproducts =Object.keys(resp.data.products || {}).map(
          (key) => resp.data.products[key]
        );*/
        vm.getoption(vm.custproducts);
      });
    },
    addcart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.post(api, { data: cart }).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.getcart();
      });
    },
    getcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      let cartnum = [];
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        cartnum = resp.data.data.carts;
        vm.cartlong = cartnum.length;
      });
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