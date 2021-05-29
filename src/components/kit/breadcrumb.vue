<template>
  <div class="breadcrumb bg-transparent">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{ linked: !!breadcrumb.link }"
      >
        {{ breadcrumb.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  methods: {
    routeTo(pRouteTo) {
      const vm = this;
      if (vm.breadcrumbList[pRouteTo].link)
        vm.$router.push(vm.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      const vm = this;
      vm.breadcrumbList = vm.$route.meta.breadcrumb;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  margin-bottom: line(3);
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
  font-size: font(1);
}
li {
  cursor: pointer;
  color: #42b983;
}
li:last-child {
  cursor: default;
}
li:not(:last-child):after {
  content: ">";
  margin: 5px;
}
</style>