<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!--<router-link
      tag="button"
      to="/addcart"
      class="btn btn-outline-success btn-circle"
    >
      <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
      <span class="badge badge-pill badge-danger" v-if="cartlong > 0">{{
        cartlong
      }}</span>
      <br />購物車
    </router-link>-->
    <div class="container minHeight py-4 pt-md-5 mb-5">
      <div class="row">
        <div class="col-lg-5 col-md-6 mb-3">
          <img class="w-100" :src="product.imageUrl" style="height: 35vh" />
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
          <div class="w-50">
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
                style="appearance: none; appearance: textfield"
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
        </div>
      </div>
      <div class="d-flex justify-content-between border border-gray p-4 mt-3">
        <div class="description w-50 border-right">
          <h5 class="text-maincolor font-weight-bold"><span>產品描述</span></h5>
          <p>{{ product.content }}</p>
        </div>
        <div class="content w-50 pl-3">
          <h5 class="text-maincolor font-weight-bold"><span>產品說明</span></h5>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
header,
main {
  height: 100vh;
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
  },
};
</script>