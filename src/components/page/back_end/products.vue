<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>產品管理</h2>
      <button class="btn btn-primary" @click="openmodel(true)">新增產品</button>
    </div>

    <table class="table mb-4 rwd-table">
      <thead>
        <tr>
          <th
            class="text-md-center"
            width="80"
            @click="(isReverse = !isReverse), (rankwith = 'num')"
          >
            編號
            <span>
              <i
                class="fas fa-angle-up text-success"
                :class="{ rankarrow_down: rankwith == 'num' && isReverse }"
              ></i>
            </span>
          </th>
          <th
            class="text-md-center"
            width="80"
            @click="(isReverse = !isReverse), (rankwith = 'is_enabled')"
          >
            上架狀態
            <span>
              <i
                class="fas fa-angle-up text-success"
                :class="{
                  rankarrow_down: rankwith == 'is_enabled' && isReverse,
                }"
              ></i>
            </span>
          </th>
          <th class="text-md-center d-md-table-cell d-none" width="120">
            預覽圖
          </th>
          <th class="text-md-center" width="120">產品名稱</th>
          <th
            class="text-md-center"
            width="80"
            @click="(isReverse = !isReverse), (rankwith = 'origin_price')"
          >
            原價
            <span>
              <i
                class="fas fa-angle-up text-success"
                :class="{
                  rankarrow_down: rankwith == 'origin_price' && isReverse,
                }"
              ></i>
            </span>
          </th>
          <th
            class="text-md-center"
            width="80"
            @click="(isReverse = !isReverse), (rankwith = 'price')"
          >
            售價
            <span class="icon">
              <i
                class="fas fa-angle-up text-success"
                :class="{ rankarrow_down: rankwith == 'price' && isReverse }"
              ></i>
            </span>
          </th>
          <th class="text-md-center" width="80">單位</th>
          <th width="80"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in rankmethod" :key="item.id">
          <td class="text-md-center" data-th="編號">{{ item.num }}</td>
          <td class="text-md-center" data-th="上架狀態">
            <span v-if="item.is_enabled === 1" class="text-success">
              <i class="far fa-check-circle"></i>
              <br class="d-md-block d-none" />
              已上架
            </span>
            <span v-else class="text-danger">
              <i class="far fa-times-circle"></i>
              <br class="d-md-block d-none" />
              未上架
            </span>
          </td>
          <td class="text-md-center" data-th="產品圖">
            <img
              v-bind:src="item.imageUrl"
              alt="產品圖"
              class="img-fluid w-50"
            />
          </td>
          <td class="text-md-center" data-th="產品名稱">{{ item.title }}</td>
          <td class="text-md-center" data-th="原價">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-md-center" data-th="售價">
            {{ item.price | currency }}
          </td>
          <td class="text-md-center" data-th="單位">{{ item.unit }}</td>
          <td class="text-md-center">
            <button
              class="btn btn-maincolor btn-sm mb-2"
              @click="openmodel(false, item)"
            >
              編輯
            </button>
            <br />
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openremovemodel(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!------------ 分頁碼標籤 ------------>
    <!------------ 分頁碼標籤 ------------>
    <!------------ 分頁碼標籤 ------------>

    <!-- <pagination :pages="pagination" @emit-page="getproducts"></pagination> -->

    <!------------ Modal ------------>
    <!------------ Modal ------------>
    <!------------ Modal ------------>

    <div
      class="modal fade"
      id="productsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
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
            <div class="row">
              <div class="col-sm-4">
                <div class="border-bottom pb-3">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempProduct.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.uploading"
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadfile"
                    />
                  </div>
                  <img
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    alt="產品預覽"
                    :src="tempProduct.imageUrl"
                  />
                </div>

                <div class="border-bottom py-3">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempProduct.image2"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.uploading"
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadfile"
                    />
                  </div>
                  <img
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    alt="產品預覽"
                    :src="tempProduct.image2"
                  />
                </div>

                <div class="border-bottom py-3">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempProduct.image3"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.uploading"
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadfile"
                    />
                  </div>
                  <img
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    alt="產品預覽"
                    :src="tempProduct.image3"
                  />
                </div>

                <div class="border-bottom py-3">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempProduct.image4"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.uploading"
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadfile"
                    />
                  </div>
                  <img
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    alt="產品預覽"
                    :src="tempProduct.image4"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <label for="description">產品說明</label>
                  <textarea
                    type="text"
                    row="30"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品說明"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="content">產品內容</label>
                  <textarea
                    type="text"
                    row="30"
                    class="form-control text-box"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-maincolor"
              @click="updateproduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!----------------------------------------刪除功能------------------------------------------------>
    <!----------------------------------------刪除功能------------------------------------------------>
    <!----------------------------------------刪除功能------------------------------------------------>

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
            <strong class="text-danger">{{ tempProduct.title }}</strong>
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
    <pages
      class="d-flex justify-content-center"
      :pgnum="pagination"
      @getpgnum="getproducts"
    />
  </div>
</template>

<style scoped>
textarea {
  white-space: pre;
}
</style>

<script>
import $ from "jquery";
import pages from "@/components/kit/pagination";

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        image2: "",
        image3: "",
        image4: "",
        is_enabled: 0
      },
      pagination: {},
      newdatas: false,
      isLoading: false,
      isReverse: false,
      status: { uploading: false },
      rankwith: "",
    };
  },
  components: {
    pages,
  },
  created() {
    this.getproducts();
  },
  computed: {
    rankmethod() {
      const vm = this;
      return vm.products.sort((a, b) => {
        if (vm.isReverse == true) {
          return a[vm.rankwith] - b[vm.rankwith];
        } else {
          return b[vm.rankwith] - a[vm.rankwith];
        }
      });
    },
    rankarrow_direction() {
      const vm = this;
      switch (vm.isReverse) {
        case 0:
          return "rankarrow_down";
          break;
        case 1:
          return "rankarrow_up";
          break;
      }
    },
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    uploadfile() {
      const uploadedfile = this.$refs.files.files[0];
      const vm = this;
      const formdata = new FormData();
      formdata.append("file-to-upload", uploadedfile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.uploading = true;

      this.$http
        .post(url, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {

          vm.status.uploading = false;

          if (resp.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", resp.data.imageUrl);
          } else {
            this.$bus.$emit("messsage:push", resp.data.message, "danger");
          }
        });
    },
    uploadfile2() {
      const uploadedfile2 = this.$refs.files2.files[0];
      const vm = this;
      const formdata = new FormData();
      formdata.append("file-to-upload", uploadedfile2);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.uploading = true;

      this.$http
        .post(url, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {

          vm.status.uploading = false;

          if (resp.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", resp.data.imageUrl);
          } else {
            this.$bus.$emit("messsage:push", resp.data.message, "danger");
          }
        });
    },
    uploadfile3() {
      const uploadedfile3 = this.$refs.files3.files[0];
      const vm = this;
      const formdata = new FormData();
      formdata.append("file-to-upload", uploadedfile3);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.uploading = true;

      this.$http
        .post(url, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {

          vm.status.uploading = false;

          if (resp.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", resp.data.imageUrl);
          } else {
            this.$bus.$emit("messsage:push", resp.data.message, "danger");
          }
        });
    },
    uploadfile4() {
      const uploadedfile4 = this.$refs.files4.files[0];
      const vm = this;
      const formdata = new FormData();
      formdata.append("file-to-upload", uploadedfile4);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.uploading = true;

      this.$http
        .post(url, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {

          vm.status.uploading = false;

          if (resp.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", resp.data.imageUrl);
          } else {
            this.$bus.$emit("messsage:push", resp.data.message, "danger");
          }
        });
    },
    openmodel(newdatas, item) {
      if (newdatas) {
        this.tempProduct = {
          image2: "",
          image3: "",
          image4: "",
          is_enabled: 0
        };
        this.newdatas = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.newdatas = false;
      }
      $("#productsModal").modal("show");
    },
    updateproduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpmethod = "post";
      const vm = this;
      if (!vm.newdatas) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpmethod = "put";
      }
      this.$http[httpmethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $("#productsModal").modal("hide");
          vm.getproducts();
        } else {
          alert("新增失敗");
          vm.getproducts();
        }
      });
    },
    openremovemodel(item) {
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    removedata() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api, { data: vm.tempProduct.id }).then((response) => {
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getproducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.getproducts();
        }
      });
    },
  },
};
</script>