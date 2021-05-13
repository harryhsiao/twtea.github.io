<template>
  <div>
    <div class="container my-5 p-2 p-md-5 border border-maincolor">
      <div class="card p-3 border border-maincolor">
        <div class="card-body">
          <h2 class="border-left border-maincolor ml-3 pl-3">
            本店菜單<br />Menu
          </h2>
          <ul
            class="price-style menu-content mx-auto d-lg-block d-none text-primary"
          >
            <li class="mx-4">牛肉炒芥藍&nbsp; <span>350</span>元</li>
            <li class="mx-4">三層炒蒜苗&nbsp; <span>100</span>元</li>
            <li class="mx-4">金莎嫩豆腐&nbsp; <span>250</span>元</li>
            <li class="mx-4">黃金烏魚子&nbsp; <span>750</span>元</li>
            <li class="mx-4">螃蟹豆腐煲&nbsp; <span>450</span>元</li>
            <li class="mx-4">古早味封肉&nbsp; <span>350</span>元</li>
            <li class="mx-4">純味蘿蔔糕&nbsp; <span>250</span>元</li>
            <li class="mx-4">薑絲鮮魚湯&nbsp; <span>350</span>元</li>
            <li class="mx-4">蒜蓉海戰車&nbsp; <span>時&nbsp;價</span></li>
            <li class="mx-4">以及其他菜色&nbsp;．．．</li>
          </ul>
          <ul class="price-style d-lg-none d-block text-primary">
            <li class="my-4">牛肉炒芥藍&nbsp; <span>350</span>元</li>
            <li class="my-4">三層炒蒜苗&nbsp; <span>100</span>元</li>
            <li class="my-4">金莎嫩豆腐&nbsp; <span>250</span>元</li>
            <li class="my-4">黃金烏魚子&nbsp; <span>750</span>元</li>
            <li class="my-4">螃蟹豆腐煲&nbsp; <span>450</span>元</li>
            <li class="my-4">古早味封肉&nbsp; <span>350</span>元</li>
            <li class="my-4">純味蘿蔔糕&nbsp; <span>250</span>元</li>
            <li class="my-4">薑絲鮮魚湯&nbsp; <span>350</span>元</li>
            <li class="my-4">蒜蓉海戰車&nbsp; <span>時&nbsp;價</span></li>
            <li class="my-4">以及其他菜色&nbsp;．．．</li>
          </ul>
          <p
            class="text-center"
            style="line-height: 2rem; letter-spacing: 0.1rem"
          >
            30人以上團體請先預約<br />本店亦有販售自製料理包,請來電預約<br />或參考網路商店
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-content {
  writing-mode: vertical-rl;
  font-size: 2rem;
}

.price-style {
  list-style: none;
}

.price-style li span {
  writing-mode: horizontal-tb;
  color: tomato;
}
</style>