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

                  <div
                    class="row mb-4"
                    v-for="item in custcart.carts"
                    :key="item.product.id"
                  >
                    <div class="col-md-5 col-lg-3 col-xl-3">
                      <div
                        class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0"
                      >
                        <a href="#!">
                          <img
                            class="img-fluid w-100"
                            :src="item.product.imageUrl"
                            :alt="item.product.category"
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h5>{{ item.product.title }}</h5>
                            <p class="mb-3 text-muted text-uppercase small">
                              {{ item.product.category }}
                            </p>
                          </div>
                          <div>
                            <div
                              class="def-number-input number-input safari_only mb-0 w-100"
                            >
                              <button
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                class="minus"
                              >
                                <i class="fas fa-minus"></i>
                              </button>
                              <input
                                class="quantity"
                                min="0"
                                name="quantity"
                                value="1"
                                type="number"
                              />
                              <button
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                class="plus"
                              >
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <small
                              id="passwordHelpBlock"
                              class="form-text text-muted text-center"
                            >
                              {{ item.product.unit }}
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
                              class="card-link-secondary small text-uppercase mr-3"
                              @click.prevent="deletedcart(item.product.id)"
                              ><i class="fas fa-trash-alt mr-1"></i> 刪除商品
                            </a>
                            <a
                              href="#!"
                              type="button"
                              class="card-link-secondary small text-uppercase"
                              ><i class="fas fa-heart mr-1"></i> 下次再買
                            </a>
                          </div>
                          <p class="mb-0">
                            <span
                              ><strong>{{
                                item.product.origin_price
                              }}</strong></span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mb-4" />

                  <p class="text-primary mb-0">
                    <i class="fas fa-info-circle mr-1"></i> Do not delay the
                    purchase, adding items to your cart does not mean booking
                    them.
                  </p>
                </div>
              </div>
              <!-- Card -->

              <!-- Card -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="mb-4">付款方式</h5>

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
                      <span>{{ custcart.total | currency }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center px-0"
                    >
                      運費
                      <span>{{ 60 | currency }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                    >
                      <div>
                        <strong>總價</strong>
                        <strong>
                          <p class="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span
                        ><strong>{{
                          custcart.final_total | currency
                        }}</strong></span
                      >
                    </li>
                  </ul>

                  <button
                    type="button"
                    class="btn btn-primary btn-block waves-effect waves-light"
                  >
                    結帳去
                  </button>
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <a
                    class="dark-grey-text d-flex justify-content-between"
                    data-toggle="collapse"
                    href="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    優惠碼
                    <span><i class="fas fa-chevron-down pt-1"></i></span>
                  </a>

                  <div class="collapse" id="collapseExample">
                    <div class="mt-3">
                      <div class="md-form md-outline mb-0">
                        <input
                          type="text"
                          id="discount-code"
                          class="form-control font-weight-light"
                          placeholder="Enter discount code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<<script>
import $ from "jquery";

export default {
    data() {
        return {
            custcart: {},
            isLoading: false,
            cartlong: 0,
        }
    },
    created() {
        this.getcart();
    },
    methods: {
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
      vm.isLoading = true;
      let cartnum = [];
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.custcart = resp.data.data;
        cartnum = resp.data.data.carts;
        vm.cartlong = cartnum.length;
      });
    },
    deletedcart(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false; 
      });
    }    
    },
}
</script>