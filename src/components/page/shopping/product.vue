<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header class="py-4 py-lg-5">
      <div class="container mt-7">
        <nav class="d-flex justify-content-between" aria-label="breadcrumb">
          <breadcrumb />
          <router-link to="/addcart" class="text-info">
            <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
            <span class="badge badge-pill badge-danger" v-if="cartlong > 0">{{
              cartlong
            }}</span>
          </router-link>
        </nav>
        <div class="row my-4">
          <div class="col-lg-5 col-md-6 mb-3 mb-md-0">
            <div class="w-100 position-relative">
              <img
                class="w-100 hvh-3 mySlides position-absolute"
                :src="product.imageUrl"
                @swiperight="slideright(0)"
              />
              <img
                class="w-100 hvh-3 mySlides position-absolute"
                :src="product.image2"
                @swiperight="slideright(1)"
              />
              <img
                class="w-100 hvh-3 mySlides position-absolute"
                :src="product.image3"
                @swiperight="slideright(2)"
              />
              <img class="w-100 hvh-3 mySlides" :src="product.image4" v-if="product.image4 !== ''"/>
            </div>
            <p class="small">圖片僅供參考，商品樣式依實際為準</p>
            <div class="row">
              <div class="col-3 pr-1">
                <img
                  class="img-fluid demo w-100 hpx-6"
                  :src="product.imageUrl"
                  @click="currentSlide(0)"
                />
              </div>
              <div class="col-3 pr-1">
                <img
                  class="img-fluid demo w-100 hpx-6"
                  :src="product.image2"
                  @click="currentSlide(1)"
                />
              </div>
              <div class="col-3 pr-1">
                <img
                  class="img-fluid demo w-100 hpx-6"
                  :src="product.image3"
                  @click="currentSlide(2)"
                />
              </div>
              <div class="col-3">
                <img
                  class="img-fluid demo w-100 hpx-6"
                  :src="product.image4"
                  @click="currentSlide(3)"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-7 col-md-6">
            <h3 class="font-weight-bold">{{ product.title }}</h3>
            <p class="h5 mb-3" v-if="product.price">
              原價
              <span class="text-danger font-weight-bold">
                {{ product.price }}
              </span>
              元
            </p>
            <p class="h5 mb-3" v-else>
              優惠價
              <span class="text-danger font-weight-bold">{{
                product.origin_price
              }}</span>
              元
            </p>

            <div class="wrem-20 d-md-block d-none">
              <div class="input-group my-3">
                <div class="input-group-prepend">
                  <button
                    @click="qty--"
                    class="minus border-right-0 border border-dark"
                    :disabled="qty < 2"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input
                  class="text-center form-control"
                  min="1"
                  name="quantity"
                  :max="product.num"
                  v-model.number="qty"
                  type="number"
                />
                <div class="input-group-prepend">
                  <button
                    @click="qty++"
                    class="plus border-left-0 border border-dark"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-secondary w-100"
                @click="addcart(product)"
              >
                加入購物車
              </button>
            </div>

            <div class="d-md-none d-block">
              <div class="input-group my-3">
                <div class="input-group-prepend">
                  <button
                    @click="qty--"
                    class="minus border-right-0 border border-dark"
                    :disabled="qty < 2"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input
                  class="text-center form-control"
                  min="1"
                  name="quantity"
                  :max="product.num"
                  v-model.number="qty"
                  type="number"
                />
                <div class="input-group-prepend">
                  <button
                    @click="qty++"
                    class="plus border-left-0 border border-dark"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-secondary w-100"
                @click="addcart(product)"
              >
                加入購物車
              </button>
            </div>

            <div class="border-1 border-bottom my-3">
              <p>優惠活動:</p>
              <p class="small">
                <span class="badge badge-warning mr-2">活動</span>
                開心過暑價<br class="d-md-none d-inlineblock" />
                輸入折扣碼<span
                  class="mx-md-2 mx-1 text-maincolor font-weight-bold h5"
                  >freeship123</span
                >享半價優惠
              </p>
            </div>
            <p class="mb-2 mt-3">付款方式:</p>
            <ul class="list-style-none small">
              <li class="mb-2">
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/CnJx8z.png"
                  alt="ATM"
                />
                ATM轉帳
              </li>
              <li class="mb-2">
                <i class="fas fa-truck fa-2x mr-2"></i>
                貨到付款
              </li>
              <li class="mb-2">
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/YCGznA.jpg"
                  alt="line pay"
                />
                LINE Pay
              </li>
              <li class="mb-2">
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/tKMkqN.png"
                  alt="711"
                />
                7-11取貨付款
              </li>
              <li class="mb-2">
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/u4oVq0.jpg"
                  alt="familymart"
                />
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/W7goSw.jpg"
                  alt="OKmart"
                />
                <img
                  class="mr-3"
                  width="25px"
                  src="https://upload.cc/i1/2021/07/12/o5bm0q.jpg"
                  alt="Hilife"
                />
                全家,OK,萊爾富取貨付款
              </li>
              <li class="mb-2">
                <img
                  class="mr-3"
                  width="25px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  class="mr-3"
                  width="25px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  class="mr-3"
                  width="25px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                信用卡
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <main style="box-shadow: 0px -4px 3px rgba(50, 50, 50, 5%)">
      <div class="container p-0">
        <ul
          class="nav justify-content-between justify-content-md-start"
          id="infoblock"
          role="tablist"
        >
          <li
            class="nav-item"
            :class="{ actives: infobar == 'description' }"
            @click="infobar = 'description'"
          >
            <a
              class="nav-link p-md-4 p-3 text-maincolor font-weight-bold active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              aria-controls="profile"
              aria-selected="false"
              >產品說明</a
            >
          </li>
          <li
            class="nav-item"
            :class="{ actives: infobar == 'content' }"
            @click="infobar = 'content'"
          >
            <a
              class="nav-link p-md-4 p-3 text-maincolor font-weight-bold"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              aria-controls="home"
              aria-selected="true"
              >產品內容</a
            >
          </li>
          <li
            class="nav-item"
            :class="{ actives: infobar == 'qa' }"
            @click="infobar = 'qa'"
          >
            <a
              class="nav-link p-md-4 py-3 px-4 text-maincolor font-weight-bold"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              aria-controls="contact"
              aria-selected="false"
              >問與答</a
            >
          </li>
        </ul>
        <div class="tab-content p-4">
          <div
            class="tab-pane show active"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <p v-html="product.description"></p>
          </div>
          <div
            class="tab-pane"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <p v-html="product.content"></p>
          </div>
          <div
            class="tab-pane"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div class="accordion" id="accordionExample">
              <div class="card shadow-sm shadow-sm mb-3 border-0">
                <div class="card-header" id="headingOne">
                  <h2>
                    <button
                      class="btn text-left d-flex align-items-center"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span
                        class="numfont text-white bg-maincolor p-3 rounded mr-4"
                        >Q1</span
                      >
                      請問保存期限有多久呢?
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p>
                      因為我們採真空包裝，一般來說可保存3個月沒問題，但還是建議在兩個禮拜內吃完，以品嚐到食材最鮮美的狀況
                    </p>
                  </div>
                </div>
              </div>
              <div class="card shadow-sm mb-3 border-0">
                <div class="card-header" id="headingTwo">
                  <h2>
                    <button
                      class="btn text-left d-flex align-items-center"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <span
                        class="numfont text-white bg-maincolor p-3 rounded mr-4"
                        >Q2</span
                      >
                      我買錯東西了，請問可以退款嗎?
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p>
                      為保食材可以維持最新鮮的狀態，
                      確認訂單後我們才會開始調理包的製作，
                      除非是在下訂單後24小時內通知修改， 否則是無法退款的噢。
                      <br />
                      <br />
                      至於已經到貨的部分，除非是食品有問題
                      ，否則也是無法退款的。
                    </p>
                  </div>
                </div>
              </div>
              <div class="card shadow-sm mb-3 border-0">
                <div class="card-header" id="headingThree">
                  <h2>
                    <button
                      class="btn text-left d-flex align-items-center"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      <span
                        class="numfont text-white bg-maincolor p-3 rounded mr-4"
                        >Q3</span
                      >
                      我的訂單什麼時候會到呢?
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p>
                      一般來說超商3天，宅配24小時內送達，若有突發狀況我們會於官網通知各位
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main class="mt-6">
      <div class="container">
        <h3>其他相似商品</h3>
        <div class="row border-1 border-top my-4 pl-3 pt-4 overflow-auto">
          <div
            class="col-2 mr-4"
            :class="{ 'd-none': !isLoading }"
            v-for="index in 5"
            :key="index"
          >
            <div class="cards w-100">
              <div class="limage card-img-top hpx-20"></div>
              <p class="isload p-3 mt-2"></p>
            </div>
          </div>
          <div class="d-flex">
            <div
              class="card thumbnail wpx-20 mr-4"
              v-for="item in getsameproduct"
              :key="item.id"
            >
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
                class="btn btn-outline-secondary rounded-0"
                @click="addcart(item)"
              >
                <i class="fas fa-tag"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.demo {
  opacity: 0.6;
}

.activee,
.demo:hover {
  opacity: 1;
}

.minheight {
  min-height: 100vh;
}

.actives {
  border-bottom: 3px solid;
  border-color: #55d8bb;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.collapsed {
  color: rgba(61, 61, 61, 0.945);
}

div {
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 300;
}

.numfont {
  font-family: "Rubik", sans-serif;
}
</style>

<script>
import $ from "jquery";
import breadcrumb from "@/components/kit/breadcrumb";

$("#infoblock a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

$(".collapse").collapse();
$(".card-header").on("show.bs.collapse", function () {
  $(".card-header").addClass("text-maincolor");
});

export default {
  data() {
    return {
      product: {
        content: "",
        description: "",
      },
      custproducts: [],
      imagepack: [],
      incart: JSON.parse(localStorage.getItem("mycart")) || [],
      infobar: "description",
      qablock: "q1",
      cartlong: 0,
      qty: 1,
      slideindex: 1,
      isLoading: false,
    };
  },
  created() {
    this.getproduct(this.$route.params.productId);
    this.getproducts();
  },
  computed: {
    getsameproduct() {
      const vm = this;
      return vm.custproducts.filter(
        (item) =>
          item.id !== vm.product.id && item.category === vm.product.category
      );
    },
  },
  components: {
    breadcrumb,
  },
  methods: {
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      this.$http.get(api).then((resp) => {
        vm.custproducts = resp.data.products;
      });
    },
    getproduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      vm.cartlong = vm.incart.length;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.product = response.data.product;
        vm.product.description = response.data.product.description.replace(/\n/g,'<br/>');
        vm.product.content = response.data.product.content.replace(/\n/g,'<br/>');
      });
    },
    addcart(data) {
      const vm = this;
      const cacheCarID = []; //為達成利用id來判斷資料是否存在,先抓取舊有資料內的id
      vm.isLoading = true;
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
          origin_price: data.origin_price,
          price: data.price,
          title: data.title,
          unit: data.unit,
          product_id: data.id,
          qty: vm.qty,
        };
        vm.incart.push(cartContent);
        localStorage.setItem("mycart", JSON.stringify(vm.incart));
        vm.isLoading = false;
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
              origin_price: data.origin_price,
              price: data.price,
              title: data.title,
              unit: data.unit,
              product_id: data.id,
              qty: (qty += vm.qty),
            };
            vm.incart.splice(keys, 1, cache);
          }
        });
        localStorage.setItem("mycart", JSON.stringify(vm.incart));
        vm.isLoading = false;
      }
      vm.cartlong = vm.incart.length;
    },
    /*showSlides(n) {
      const vm = this;
      let i;
      let slides = document.querySelectorAll(".mySlides");
      let dots = document.querySelectorAll(".demo");
      if (n > slides.length) {
        vm.slideindex = 1;
      }
      if (n < 1) {
        vm.slideindex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activee", "");
      }
      slides[vm.slideindex - 1].style.display = "block";
      dots[vm.slideindex - 1].className += " active";
    },*/
    currentSlide(n) {
      let slides = document.querySelectorAll(".mySlides");
      let dots = document.querySelectorAll(".demo");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("activee", "");
      }
      slides[n].style.opacity = "1";
      dots[n].className += " activee";
      //vm.showSlides((vm.slideIndex = n));
    },
  },
};
</script>