<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary my-4" @click="openCouponmodal(true)">
        新增優惠券
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">流水號</th>
          <th scope="col">名稱</th>
          <th scope="col">折扣量</th>
          <th scope="col">代碼</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.num }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }} %</td>
          <td>{{ item.code }}</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">
              啟用
            </span>
            <span v-else class="text-black-50">尚未啟用</span>
          </td>
          <td>
            <span
              ><button
                class="btn btn-outline-coffemilk btn-sm mb-2"
                @click="openCouponmodal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openremovemodel(item)"
              >
                刪除
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempcoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempcoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempcoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempcoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              更新優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
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
              <span>刪除優惠券</span>
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
            你確定要刪除
            <strong class="text-danger">{{ tempcoupon.title }}</strong>
            (刪除後將無法恢復)。
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
    <pages :pgnum="pagination" @getpgnum="getcoupons" />
  </div>
</template>

<script>
import $ from "jquery";
import pages from "@/components/kit/pagination";

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempcoupon: {},
      due_date: new Date(),
      isNew: false,
      isadd: false,
      isLoading: false,
    };
  },
  created() {
    this.getcoupons();
  },
  components: {
    pages,
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempcoupon.due_date = timestamp;
    },
  },
  methods: {
    getcoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      let today = new Date();
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        if(vm.due_date <= today){
          item.is_enabled === 0;
        }
      });
    },
    openCouponmodal(isNew, item) {
      const vm = this;
      $("#couponModal").modal("show");
      vm.isNew = isNew;
      if (vm.isNew) {
        vm.tempcoupon = {};
      } else {
        vm.tempcoupon = Object.assign({}, item);
        const dateAndTime = new Date(vm.tempcoupon.due_date * 1000)
          .toISOString()
          .split("T");
        vm.due_date = dateAndTime[0];
      }
    },
    updateCoupon() {
      const vm = this;
      if (vm.isNew) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        this.$http.post(url, { data: vm.tempcoupon }).then((response) => {
          console.log(response, vm.tempcoupon);
          $("#couponModal").modal("hide");
          this.getcoupons();
        });
      } else {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
        vm.due_date = new Date(vm.tempcoupon.due_date * 1000);
        this.$http.put(url, { data: vm.tempcoupon }).then((response) => {
          console.log(response);
          $("#couponModal").modal("hide");
          this.getcoupons();
        });
      }
    },
     openremovemodel(item) {
      this.tempcoupon = Object.assign({}, item);
      $("#delProductModal").modal("show");
      console.log(item);
    },
    removedata() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
      console.log(api);
      this.$http.delete(api, { data: vm.tempcoupon.id }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getcoupons();
        } else {
          $("#delProductModal").modal("hide");
          vm.getcoupons();
          console.log("刪除失敗");
        }
      });
    },
  },
};
</script>