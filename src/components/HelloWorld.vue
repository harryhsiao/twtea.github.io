<template>
  <div>      
    <navbar />        
    <header>     
      <div class="title text-center d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>台味</h1>        
        <div class="line my-5"></div>
        <p class="h4 title--jr">專門茶葉製所</p>
      </div>
    </header>
    <main　class="container">
      <article class="container-fluid">       
        <section class="row">
          <h2>你知道嗎</h2>
          <div class="col-md-5">
            <svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" id="圖層_1" x="0px" y="0px" width="100.671px" height="112.751px" viewBox="0 0 100.671 112.751" enable-background="new 0 0 100.671 112.751" xml:space="preserve">
            <polygon fill="#FFFFFF" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" points="10.067,97.315 16.779,102.014   41.611,86.577 67.786,80.537 92.618,46.309 92.618,15.436 81.879,6.711 75,13.247 68.457,19.463 54.362,29.53 33.557,46.309   27.517,62.416 25.503,69.799 29.53,75.168 32.214,79.195 26.174,84.564 18.121,91.275 "/>
            <line class="svg svg-t1" fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="43.625" y1="73.154" x2="77.181" y2="29.53"/>
            <line class="svg svg-t2" fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="60.403" y1="62.416" x2="67.786" y2="63.758"/>
            <line class="svg svg-t3" fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="71.141" y1="46.98" x2="81.208" y2="44.966"/>
            <line class="svg svg-t4" fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="51.342" y1="36.913" x2="57.047" y2="44.966"/>
            <line class="svg svg-t5" fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="36.913" y1="54.362" x2="47.651" y2="54.362"/>
            </svg>
          </div>
          <div class="col-md-7">            
            <h3>台灣一年可以喝掉4.5公噸的茶</h3>
            <p>相當於一頭成年非洲象的體重</p>
          </div>
        </section>
         <section class="row">
          <div class="col-md-5"></div>
          <div class="col-md-7">            
            <h3>23度是茶葉</h3>
            <p>相當於一頭成年非洲象的體重</p>
          </div>
        </section>
      </article>
    </main>
    <footer class="text-center py-5 bg-tiffany">
     <h6>練習用網頁 | 不具商業用途</h6>
    </footer>
  </div>
</template>

<script>
import navbar from "./navbar";
export default {
  components: {
    navbar,
  },
};
</script>

<style scoped>
.title--jr {
  letter-spacing: 105px;
}
.line {
  width: 75%;
  height: 1px;
  background-color: #000;
}
.title{
  height: 100vh;
}
.title h1 {
  font-size: 350px;
  font-family: PMingLiU;
  letter-spacing: 135px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}
.con-h1 {
  font-size: 120px;
}

.container {
  margin-top: 12rem;
}

footer{
  max-width: 100%;

}
</style>