<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert />
    <div class="container mb-5">
      <div class="row">
        <div class="col-12 px-0 mb-5">
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    訂單明細
                  </button>
                  <span class="text-danger" v-if="!order.is_paid">未付款</span>
                  <span class="text-success" v-else>已付款</span>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row">訂購人</th>
                        <td v-if="order.user">{{ order.user.name }}</td>
                      </tr>
                      <tr>
                        <th scope="row">付款價格</th>
                        <td>{{ order.total }}</td>
                      </tr>
                      <tr>
                        <th scope="row">收貨地址</th>
                        <td v-if="order.user">{{ order.user.address }}</td>
                      </tr>
                      <tr>
                        <th scope="row">付款方式</th>
                        <td>貨到付款</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 border mb-5 p-4">
          <h3 class="text-center my-4">付款須知</h3>
          <p>
            本網站為練習之用,不具商業功能,故要完成付款功能,請點擊下方 "模擬付款"
            按鈕來模擬
          </p>
          <div class="text-right">
            <button class="btn btn-secondary" @click="$router.push('/cart')">
              回到購物頁
            </button>
            <button class="btn btn-primary" v-if="order.is_paid === false" @click="letPay">模擬付款</button>
          </div>
        </div>
        <div class="col-12 border p-4">
          <h3 class="text-center my-4">退貨款相關須知</h3>
          <p>
            如果您所購買的是影音商品、電腦軟體或個人衛生用品等一經拆封即無法回復原狀的商品，在您還不確定是否要辦理退貨以前，請勿拆封，一經拆封則依消費者保護法之規定，無法享有七天猶豫期之權益且不得辦理退貨。
            如果您所購買的是非以有形媒介提供之數位內容或一經提供即為完成之線上服務，一經您事先同意後始提供者，依消費者保護法之規定，您將無法享有七天猶豫期之權益且不得辦理退貨。
            若您需辦理退貨，請利用顧客中心「查訂單」或「退訂/退款查詢」的「退訂/退貨」功能填寫申請，我們將於接獲申請之次日起1個工作天內檢視您的退貨要求，檢視完畢後將以E-mail回覆通知您，並將委託本公司指定之宅配公司，在5個工作天內透過電話與您連絡前往取回退貨商品。請您保持電話暢通，並備妥原商品及所有包裝及附件，以便於交付予本公司指定之宅配公司取回（宅配公司僅負責收件，退貨商品仍由特約廠商進行驗收），宅配公司取件後會提供簽收單據給您，請注意留存。
            退回商品時，請以本公司或特約廠商寄送商品給您時所使用的外包裝（紙箱或包裝袋），原封包裝後交付給前來取件的宅配公司；如果本公司或特約廠商寄送商品給您時所使用的外包裝（紙箱或包裝袋）已經遺失，請您在商品原廠外盒之外，再以其他適當的包裝盒進行包裝，切勿任由宅配單直接粘貼在商品原廠外盒上或書寫文字。
            提醒您，原廠外盒及原廠包裝都屬於商品的一部分，若有遺失、毀損或缺件，可能影響您退貨的權益，也可能依照損毀程度扣除為回復原狀所必要的費用。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alert from "@/components/kit/alertnote";

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: "",
      isLoading: false,
    };
  },
  components: {
    alert,
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(api).then((resp) => {
        vm.order = resp.data.order;
        vm.isLoading = false;
      });
    },
    letPay() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(api).then((resp) => {
        if (resp.data.success) {
          vm.$bus.$emit("messsage:push", "付款成功", "success");
          vm.getorder();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.order_id;
    this.getorder();
  },
};
</script>