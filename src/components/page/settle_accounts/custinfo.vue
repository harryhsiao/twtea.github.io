<template>
  <div class="mb-5">
    <loading :active.sync="isLoading"></loading>
    <alert />
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

                <p class="ml-auto mb-0 mr-3" v-if="total_price + shipping">
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
                  <th width="100"></th>
                  <th width="100" colspan="5">商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody v-for="item in custcart" :key="item.id">
                <tr>
                  <td class="align-middle text-center">
                    <a
                      class="btn text-danger"
                      data-toggle="modal"
                      data-target="#deletecargo"
                      @click.prevent="deletedcart(item.id)"
                    >
                      <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img
                      :src="item.product.imageUrl"
                      alt="suit"
                      class="img-thumbnail"
                    />
                  </td>
                  <td class="align-middle" colspan="5">
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
                  <td colspan="5">運費</td>
                  <td>{{ shipping }}</td>
                </tr>
                <tr>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td width="100"></td>
                  <td colspan="5">合計</td>
                  <td class="pl-0">
                    {{ (total_price + shipping) | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="container mt-3">
            <div class="row">
              <div class="col-md-6">
                <p class="text-danger">輸入 freeship139 以獲取 5 折優惠</p>
              </div>
              <div class="col-md-6">                
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    aria-label="請輸入優惠碼"
                    aria-describedby="button-addon2"
                    v-model="couponcode"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="addcoupon"
                    >
                      送出優惠碼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h5 class="mt-5 text-center py-3 mb-2 bg-light">訂購人資訊</h5>
          <validation-observer v-slot="{ invalid }">
            <form class="needs-validation" @submit.prevent="subOrder">
              <div class="form-row">
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|zhtw_name"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <!-- 輸入框 -->
                    <label for="username">姓名</label>
                    <input
                      type="text"
                      name="姓名"
                      :class="classes"
                      class="form-control"
                      id="username"
                      placeholder="姓名"
                      v-model="form.user.name"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|numeric"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="usertel">電話</label>
                    <input
                      type="text"
                      name="電話"
                      class="form-control"
                      :class="classes"
                      id="usertel"
                      placeholder="電話"
                      v-model="form.user.tel"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|email"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="usermail">Email</label>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      :class="classes"
                      id="usermail"
                      placeholder="example@email.com"
                      v-model="form.user.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <div class="form-group col-md-4">
                  <label for="inputState">居住城市</label>
                  <select id="inputState" name="country" class="form-control">
                    <option v-for="(item, index) in countorys" :key="index">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <validation-provider
                  class="col-md-8 mb-3"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="useraddress">收貨地址</label>
                    <input
                      type="text"
                      name="地址"
                      class="form-control"
                      :class="classes"
                      id="useraddress"
                      placeholder="輸入您的住址"
                      v-model="form.user.address"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <div class="col-md-12 mb-3">
                  <label for="validationTextarea">給賣家的話</label>
                  <textarea
                    class="form-control"
                    id="validationTextarea"
                    placeholder="(非必填)"
                    v-model="form.message"
                    style="resize: none"
                  ></textarea>
                </div>
              </div>
              <button
                class="btn btn-primary float-right"
                type="submit"
                :disabled="invalid"
              >
                下一步
              </button>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import alert from "@/components/kit/alertnote";

export default {
  data() {
    return {
      countorys: [
        "台北市",
        "基隆市",
        "新北市",
        "連江縣",
        "宜蘭縣",
        "新竹市",
        "新竹縣",
        "桃園市",
        "苗栗縣",
        "台中市",
        "彰化縣",
        "南投縣",
        "嘉義市",
        "嘉義縣",
        "雲林縣",
        "台南市",
        "高雄市",
        "澎湖縣",
        "金門縣",
        "屏東縣",
        "台東縣",
        "花蓮縣",
      ],
      custcart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      custdata: JSON.parse(localStorage.getItem("custinfo")) || [],
      coupons: [],
      couponcode: "",
      isLoading: false,
      total_price: 0,
      shipping: 0,
    };
  },
  created() {
    this.getcart();
    this.getcoupons();
  },
  computed: {},
  components: {
    alert,
  },
  methods: {
    getcoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
      });
    },
    addcoupon() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.couponcode,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$bus.$emit("messsage:push", "已套用優惠券", "success");
          console.log("已套用優惠券");
        } else {
          vm.$bus.$emit("messsage:push", "無效的優惠券", "danger");
          console.log("無效的優惠券");
        }
        vm.getcart();
        vm.couponcode = "";
      });
    },
    getcart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.custcart = resp.data.data.carts;
        if (resp.data.data.final_total !== resp.data.data.total) {
          vm.total_price = resp.data.data.final_total;
        } else {
          vm.total_price = resp.data.data.total;
        }
        vm.ShippingFee();
        vm.isLoading = false;
      });
    },
    getcountory() {
      const api = `https://api.opencube.tw/twzipcode/get-citys`;
      const vm = this;
      this.axios.get(api).then((response) => {
        console.log(response.data);
        vm.countorys.push(response.data);
      });
    },
    deletedcart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.delete(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.getcart();
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
    subOrder() {
      const vm = this;
      vm.isLoading = true;
      vm.custdata.splice(0, 1);
      vm.custdata.push(vm.form);
      localStorage.setItem("custinfo", JSON.stringify(vm.custdata));
      vm.$router.push("/checkpage/custcheckout");
      vm.isLoading = false;
    },
  },
};
</script>