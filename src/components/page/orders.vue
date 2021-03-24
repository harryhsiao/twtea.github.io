<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">流水號</th>
          <th scope="col">買家名稱</th>
          <th scope="col">買家資訊</th>
          <th scope="col">訂單資訊</th>
          <th scope="col">收件地址</th>
          <th scope="col">買家備註</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.num }}</td>
          <td>{{ item.user.name }}</td>
          <td>
            <p>電子郵件: {{ item.user.email }}</p>
            <p>連絡電話: {{ item.user.tel }}</p>
          </td>
          <td>
            {{ item.products }}
            <p>
              <button
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#multiCollapseExample2"
                aria-expanded="false"
                aria-controls="multiCollapseExample2"
              >
                查看更多
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                {{ item.products }}
              </div>
            </div>
          </td>
          <td>{{ item.message }}</td>
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
    <pages :pgnum="pagination" @getpgnum="getorders" />
  </div>
</template>

<script>
import $ from "jquery";
import pages from "../pagination";

export default {
  data() {
    return {
      orders: [],
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
  },
};
</script>