<template>
  <div>
    <section>
      <div class="container-fluid pl-0 d-md-flex">
        <div class="col-md-5">
          <iframe
          class="mymap"
            src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=台南市東區前鋒路210號&z=16&output=embed&t="
          ></iframe>
        </div>
        <div class="container">
          <div class="row text-md-dark">
            <div class="col-md-8 ml-md-7 mt-md-7">
              <h2 class="border-left border-maincolor pl-3">
                實體據點<br />LOCATION
              </h2>
              <p class="text-left pl-md-4 pt-5">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item border-0 border-0 border-0 border-0 border-0"><i class="fas fa-phone-square-alt"></i>&nbsp;&nbsp;電話:&nbsp;(06)000000</li>
                      <li class="list-group-item border-0 border-0 border-0 border-0"><i class="fab fa-twitter-square"></i>&nbsp;&nbsp;推特:&nbsp;@ abcdefg</li>
                      <li class="list-group-item border-0 border-0 border-0"><i class="fab fa-facebook"></i>&nbsp;&nbsp;粉絲團:&nbsp;abcdefg</li>
                      <li class="list-group-item border-0 border-0"><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;店面地址:&nbsp;台南市東區前鋒路XXX號</li>
                      <li class="list-group-item border-0 text-center">超過30人以上團體請來電預約</li>
                    </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>   
  </div>
</template>

<style scoped>
.mymap {
  width: 100%;
  height: 71.6vh;
}
</style>