<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header></header>
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div
            class="list-group"
            v-for="(item, index) in categorys"
            :key="index"
          >
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="changeoption"
              >{{ item }}</a
            >
          </div>
        </div>
        <div class="col-sm-8">
          <div class="container">
            <div class="row">
              <div
                class="col-sm-6 col-lg-4 mb-3"
                v-for="item in filtersdata"
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
            <pages :pgnum="pagination" @getpgnum="filtersdata" />
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
      categorys: ["全部商品"],
      pagination: {},
      optiontext: "",
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
    getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${pages}`;
      const vm = this;
      vm.isLoading = true;
      //console.log(process.env.APIPATH)
      this.$http.get(api).then((resp) => {
        console.log(resp.data);
        vm.isLoading = false;
        vm.custproducts = resp.data.products;
        vm.pagination = resp.data.pagination;
        vm.getoption(vm.custproducts);
      });
    },
    getoption(element) {
      const vm = this;
      element.forEach(function (el) {
        if (vm.categorys.indexOf(el.category) === -1) {
          vm.categorys.push(el.category);
        }
      });
    },
    changeoption(e) {
      const vm = this;
      vm.optiontext = e.target.text;
      console.log(e.target.text);
    },
  },  
  computed: {
    filtersdata() {
      const vm = this;
      switch (vm.optiontext) {
        case "全部商品":
          return vm.custproducts;
          break;
        case "":
          return vm.custproducts;
          break;
        default:
          let filtersproducts = [];
          vm.custproducts.forEach((item)=>{
            if(item.category === vm.optiontext){
              filtersproducts.push(item);
            }

          })
          
          return filtersproducts;
          break;
      }
    },
    filterpage(){
      return vm.pagination;
    },
  },
};
</script>