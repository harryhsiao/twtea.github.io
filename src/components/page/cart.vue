<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header></header>
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="list-group" v-for="item in categorys" :key="item.id">
            <a href="#" class="list-group-item list-group-item-action">{{item.category}}</a>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="container">
            <div class="row">
              <div
                class="col-sm-6 col-lg-4 mb-3"
                v-for="item in custproducts"
                :key="item.id"
              >
                <router-link :to="{ path: `/product/${item.id}` }">
                  <div class="card text">
                    <img :src="item.imageUrl" :alt="item.category" />
                    <div class="card-body d-flex justify-content-between">
                      <p>{{ item.title }}</p>
                      <p>
                        {{ item.price | currency
                        }}<span style="letter-space: 5px; font-size: 6px"
                          >/{{ item.unit }}</span
                        >
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <pages :pgnum="pagination" @getpgnum="getproducts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pages from "../pagination";

export default {
  data() {
    return {
      custproducts: [],
      categorys: [],
      pagination: {},
      isLoading: false,
    };
  },
  created() {
    this.getproducts();
  },
  components: {
    pages,
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.custproducts = response.data.products;
        vm.pagination = response.data.pagination;
        vm.getoption(response.data.products.category);
      });
    },
    getoption(element) {
      const vm = this;
      if (vm.categorys.indexOf(element)==-1){
        vm.categorys = element;
      }
    },
  },
};
</script>