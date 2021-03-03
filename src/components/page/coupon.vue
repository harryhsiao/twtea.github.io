<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary my-4" @click="openmodel(true)">
        新增產品
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
          <td>{{ item.percent }}</td>
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
                @click="openmodel(false, item)"
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
    <pages :pgnum="pagination" @getpgnum="getcoupons"/>
  </div>
</template>

<script>
import $ from "jquery";
import pages from "../pagination";

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      isLoading: false,
    };
  },
  created() {
    this.getcoupons();
  },
  components: {
    pages,
  },
  methods: {
    getcoupons( page = 1 ) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
  },
};
</script>