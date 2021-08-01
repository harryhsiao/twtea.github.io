<template>
  <div class="mb-5">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div
        class="row justify-content-center mt-5 accordion"
        id="accordionExample"
      >
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne" role="tab">
              <div class="row">
                <a
                  href="#collapseOne"
                  class="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  查看訂單明細 <i class="fas fa-caret-down"></i>
                </a>

                <p class="ml-auto mb-0 mr-3">
                  <span class="text-primary h2">{{
                    (total_price + shipping) | currency
                  }}</span>
                </p>
              </div>
            </div>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <table class="table bg-transparent">
              <thead>
                <tr>
                  <th width="100"></th>
                  <th width="100" colspan="7">商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody v-for="item in custcart" :key="item.id">
                <tr>
                  <td class="align-middle">
                    <img
                      :src="item.product.imageUrl"
                      alt="suit"
                      class="img-thumbnail"
                    />
                  </td>
                  <td class="align-middle" colspan="7">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle">{{ item.qty }}</td>
                  <td
                    class="align-middle text-right"
                    v-if="!item.product.price"
                  >
                    {{ item.product.origin_price * item.qty }}
                  </td>
                  <td class="align-middle text-right" v-else>
                    {{ item.product.price * item.qty }}
                  </td>
                </tr>
              </tbody>

              <tfoot class="text-right">
                <tr>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td colspan="6">運費</td>
                  <td>{{ shipping }}</td>
                </tr>
                <tr>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td colspan="6">合計</td>
                  <td class="pl-0">
                    {{ (total_price + shipping) | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h5 class="mt-5 text-center py-3 mb-2 bg-light">訂購人資訊</h5>
          <table
            class="table bg-transparents"
            v-for="(item, index) in custdata"
            :key="index"
          >
            <tbody>
              <tr>
                <th scope="row">收貨人</th>
                <td>{{ item.user.name }}</td>
              </tr>
              <tr>
                <th scope="row">電子郵件</th>
                <td>{{ item.user.email }}</td>
              </tr>
              <tr>
                <th scope="row">連絡電話</th>
                <td>{{ item.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row">收貨地址</th>
                <td>{{ item.user.address }}</td>
              </tr>
              <tr>
                <th scope="row">給賣家的話</th>
                <td>{{ item.message }}</td>
              </tr>
            </tbody>
          </table>

          <div class="text-right">
            <button class="btn btn-secondary" @click="$router.go(-1)">
              上一步
            </button>
            <button class="btn btn-primary" @click="postinfo()">
              確認結帳
            </button>
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
      custdata: JSON.parse(localStorage.getItem("custinfo"))||[],
      custcart: {},
      total_price: 0,
      shipping: 0,
      isLoading: false,
    };
  },
  created() {
    this.getcart();
  },
  methods: {
    postinfo() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      this.$http.post(api, { data: vm.custdata[0] }).then((response) => {
        if (response.data.success) {
          vm.custdata.splice(0, 1);
          this.$router.push(`/checkpage/checkcomp/${response.data.orderId}`);
        }
      });
    },
    getcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((resp) => {
        vm.isLoading = false;
        vm.custcart = resp.data.data.carts;

        if (resp.data.data.final_total !== resp.data.data.total) {
          vm.total_price = resp.data.data.final_total;
        } else {
          vm.total_price = resp.data.data.total;
        }
        vm.ShippingFee();
      });
    },
    ShippingFee() {
      const vm = this;
      if (vm.total_price < 3000) {
        vm.shipping = 60;
      } else {
        vm.shipping = 0;
      }
    },
  },
};
</script>