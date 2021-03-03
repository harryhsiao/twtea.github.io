<template>
    <div class="">
        <tr v-for="item in productObject" :key="item.id">
          <td>{{ item.num }}</td>
          <td>
            <span v-if="item.is_enabled === 1 " class="text-success">啟用</span
            ><span v-else class="text-black-50">尚未啟用</span>
          </td>
          <td>
            <img v-bind:src="item.imageUrl" alt="產品圖" class="img-fluid w-50" />
          </td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency}}</td>
          <td>{{ item.price | currency}}</td>
          <td>{{ item.unit }}</td>
          <td>
            <span
              ><button
                class="btn btn-outline-coffemilk btn-sm mb-2"
                @click="openObjectmodel(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openObjectRemovemodel(item)"
              >
                刪除
              </button>
            </span>
          </td>
        </tr>
    </div>
</template>

<script>
export default {
  name: 'pages',
  props: ['pgnum'],  
  methods: {
    getpgnums (page, curpage) {
      if (page === 'pre') {
        this.$emit('getpgnum', this.pgnum.current_page - 1)
      } else if (page === 'next') {
        this.$emit('getpgnum', this.pgnum.current_page + 1)
      } else {
        this.$emit('getpgnum', curpage)
      }
    }
  },
};
</script>