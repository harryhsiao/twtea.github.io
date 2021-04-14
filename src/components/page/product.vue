<template>
  <div class="">
    <loading :active.sync="isLoading"></loading>
    <router-link
        tag="button"
        to="/addcart"
        class="btn btn-outline-success btn-circle"
      >
        <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
        <!--span class="badge badge-pill badge-danger" v-if="cartlong > 0">{{
          cartlong
        }}</span-->
        <br />購物車
      </router-link>
    <div class="container minHeight py-4 pt-md-5 mb-5">
      <div class="row">
        <div class="col-lg-5 col-md-6 col-12 mb-3">
          <div class="d-flex">
            <ul>
              <li>
                <router-link to="/cart">商場首頁</router-link>
              </li>
            </ul>
          </div>
          <img
            class="img-fluid"
            :src="product.imageUrl"
            style="border-radius: 10px"
          />
        </div>
        <div class="col-lg-7 col-md-6 col-12 product">
          <div class="d-flex flex-column h-100">
            <h1 class="h4 font-weight-bold my-3">{{ product.title }}</h1>
            <h6 class="text-secondary proInfo mb-3">產品介紹</h6>
            <p class="pl-4 mb-3">{{ product.description }}</p>
            <p class="text-secondary text-right mb-3">
              － {{ product.content }}
            </p>
            <p v-if="product.origin_price == product.price">
              原價 {{ product.origin_price }} 元
            </p>
            <p
              class="h5 text-right mb-3"
              v-if="product.price !== product.origin_price"
            >
              優惠價
              <span class="text-danger font-weight-bold">{{
                product.price
              }}</span>
              元
            </p>
            <div class="d-flex justify-content-end mt-auto">
              <label for="productNum" class="proInputText mb-0 text-secondary"
                >數量：</label
              >
              <input type="number" value="1" min="1" :max="product.num" v-model="qty">              
              {{ product.unit }}
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="addcart(product)"
              >                
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
header, main{
  height: calc(101vh - 136px - 180px);
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
export default {
  data() {
    return {
      product: {},
      incart: JSON.parse(localStorage.getItem("mycart")) || [],
      qty: 1,
      isLoading: false,
    };
  },
  created() {
    this.getproduct(this.$route.params.productId);
  },
  methods: {
    getproduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.product = response.data.product;
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
          origin_price: parseInt(data.origin_price,10),
          price: parseInt(data.price,10),
          title: data.title,
          unit: data.unit,
          product_id: data.id,
          qty: parseInt(vm.qty,10),
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
              origin_price: parseInt(data.origin_price,10),
              price: parseInt(data.price,10),
              title: data.title,
              unit: data.unit,
              product_id: data.id,
              qty: parseInt(qty += vm.qty,10),
            };
            vm.incart.splice(keys, 1, cache);
          }
        });
        localStorage.setItem("mycart", JSON.stringify(vm.incart));
        vm.isLoading = false;
      }
      vm.cartlong = vm.incart.length;
    },    
  },
};
</script>