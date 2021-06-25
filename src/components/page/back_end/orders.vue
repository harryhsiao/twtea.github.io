<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>顧客訂單管理</h2>
    <table class="table rwd-table">
      <thead>
        <tr>
          <th class="text-md-center" scope="col">流水號</th>
          <th class="text-md-center" scope="col">買家名稱</th>
          <th class="text-md-center" scope="col">買家資訊</th>
          <th class="text-md-center" scope="col">收件地址</th>
          <th class="text-md-center" scope="col">買家備註</th>
          <th class="text-md-center" scope="col">付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td class="text-md-center" data-th="流水號">{{ item.num }}</td>
          <td class="text-md-center" data-th="買家名稱" v-if="item.user">{{ item.user.name }}</td>
          <td class="px-auto" data-th="買家資訊" v-if="item.user">
            <p>電子郵件: {{ item.user.email }}</p>
            <p>連絡電話: {{ item.user.tel }}</p>
          </td>
          <td class="text-md-center" data-th="收件地址" v-if="item.user">{{ item.user.address }}</td>
          <td class="text-md-center" data-th="買家備註">{{ item.message }}</td>
          <td class="text-md-center text-success" data-th="付款狀態" v-if="item.is_paid">
            <i class="far fa-check-circle"></i>
            <br class="d-md-block d-none" />
            已付款
          </td>
          <td class="text-md-center text-danger" data-th="付款狀態" v-else>
            <i class="far fa-times-circle"></i>
            <br class="d-md-block d-none" />
            尚未付款
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ orders.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="removedata">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <pages :pgnum="pagination" @getpgnum="getorders" />
  </div>
</template>

<script>
import $ from "jquery";
import pages from "@/components/kit/pagination";

export default {
  data() {
    return {
      orders: {
        user: {},
      },
      pagination: {},
      isLoading: false,
    };
  },
  created() {
    this.getorders();
  },
  components: {
    pages,
  },
  methods: {
    getorders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openremovemodel(item) {
      this.orders = Object.assign({}, item);
      $("#delProductModal").modal("show");
      console.log(item);
    },
    removedata() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orders.id}`;
      console.log(api);
      this.$http.delete(api, { data: vm.orders.id }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getorders();
        } else {
          $("#delProductModal").modal("hide");
          vm.getorders();
          console.log("刪除失敗");
        }
      });
    },
  },
};
</script>