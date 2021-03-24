<template>
  <div class="wraper">
    <section class="s2 btitle">
      <img
        class="img-fluid mb-2"
        src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
        alt=""
      />
      <h3 class="text-white border-top pt-4">台灣特色料理餐廳</h3>
    </section>
    <section>
      <div class="container-fluid pl-0 d-md-flex">
        <div class="col-md-4 fricephoto"></div>
        <div class="container">
          <div class="row text-md-dark">
            <div class="col-md-8 ml-md-7 mt-md-7">
              <h2 class="border-left border-maincolor pl-3">關於台味<br />STORY</h2>
              <p class="text-left pl-md-4 pt-5">
                世界需要改革，需要對台味餐廳有新的認知。我們都有個共識，若問題很困難，那就勢必不好解決。
                總而言之，蕭伯納說過一句著名的話，女人無法容忍強加在自己頭上的不貞。這讓我的思緒清晰了。
                西塞羅講過一段深奧的話，智力享受的方法很多，而且各種各樣，我是指明智而有教養的人，
                <br class="d-block d-sm-none d-md-block"/>對這樣的人來說生活就是思考。
                這句話看似簡單，但其中的陰鬱不禁讓人深思。塞涅卡曾經認為，生命如同寓言，其價值不在與長短，而在與內容。
                這句話決定了一切。台味餐廳絕對是史無前例的。李維在不經意間這樣說過，
                勞動和享樂這兩個本質上截然不同的東西被一種自然的聯繫結合在一起。希望各位能用心體會這段話。
                如果仔細思考台味餐廳，會發現其中蘊含的深遠意義。左傳深信，善不可失，惡不可長。
                這段話看似複雜，其中的邏輯思路卻清晰可見。探討台味餐廳時，如果發現非常複雜，那麼想必不簡單。
                既然如此，馬克思告訴我們，科學絕不是一種自私自利的享受。有幸能夠致力於科學研究的人，首先應該拿自己的學識為人類服務。
                這段話令我陷入了沈思。深入的探討台味餐廳，是釐清一切的關鍵。我們要從本質思考，從根本解決問題。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  directive: {
    scroll: {
      inserted(el, binding) {
        let f = function (evt) {
          if (binding.value(evt, el)) {
            window.removeEventListener("scroll", f);
          }
        };
        window.addEventListener("scroll", f);
      },
    },
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          "style",
          "opacity: 1; transform: translate3d(0, -10px, 0)"
        );
      }
      return window.scrollY > 100;
    },
  },
};
</script>

<style scoped>
body {
  font-family: Montserrat;
}

.btitle {
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.s2 {
  background-color: #f2f2f2;
  background-size: cover;
  background-position: center center;
  background-image: url("https://images.pexels.com/photos/3123792/pexels-photo-3123792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
}

.fricephoto {
  background-image: url("https://images.unsplash.com/photo-1464500542410-1396074bf230?ixlib=rb-1.2.1");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
}
</style>