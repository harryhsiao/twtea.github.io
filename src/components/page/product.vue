<template>
  <div class="">
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
          <img class="img-fluid" :src="product.imageUrl" style="border-radius:10px" />
        </div>
        <div class="col-lg-7 col-md-6 col-12 product">
          <div class="d-flex flex-column h-100">
            <h1 class="h4 font-weight-bold my-3">{{ product.title }}</h1>
            <h6 class="text-secondary proInfo mb-3">產品介紹</h6>
            <p class="pl-4 mb-3">{{ product.description }}</p>
            <p class="text-secondary text-right mb-3">－ {{ product.content }}</p>
            <p v-if="product.origin_price == product.price">原價 {{product.origin_price}} 元</p>
            <p class="h5 text-right mb-3" v-if="product.price !== product.origin_price">
              優惠價
              <span class="text-danger font-weight-bold">{{ product.price }}</span> 元
            </p>
            <div class="d-flex justify-content-end mt-auto">
              <label for="productNum" class="proInputText mb-0 text-secondary">數量：</label>
              <select name id="productNum" v-model="product.num" class="px-3 py-1 mb-0 productInput">
                <option class="" :value="num" v-for="num in 10" :key="num">{{ num }}</option>
              </select>
              {{ product.unit }}
              <button type="button" class="btn btn-outline-secondary" @click="addCart(product.id, num)">
                <i class="fas fa-spinner fa-spin fa-lg" v-if="addCartLoading == product.id"></i>
                <i class="fas fa-cart-plus fa-lg" v-if="addCartLoading !== product.id"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      product: {},
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
    
  },  
};
</script>