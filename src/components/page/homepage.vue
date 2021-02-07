<template>
  <div>
      <header>     
      <div class="title text-center d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>台味</h1>        
        <div class="line my-5"></div>
        <p class="h4 title--jr">專門茶葉製所</p>
      </div>
    </header>
    <main>
      <article class="container">
        <section class="row">
          <div class="col-md-5 border-right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.671 112.751">
            <polygon fill="#FFFFFF" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" points="10.067,97.315 16.779,102.014   41.611,86.577 67.786,80.537 92.618,46.309 92.618,15.436 81.879,6.711 75,13.247 68.457,19.463 54.362,29.53 33.557,46.309   27.517,62.416 25.503,69.799 29.53,75.168 32.214,79.195 26.174,84.564 18.121,91.275 "/>
            <line fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="43.625" y1="73.154" x2="77.181" y2="29.53"/>
            <line fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="60.403" y1="62.416" x2="67.786" y2="63.758"/>
            <line fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="71.141" y1="46.98" x2="81.208" y2="44.966"/>
            <line fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="51.342" y1="36.913" x2="57.047" y2="44.966"/>
            <line fill="none" stroke="#72BE70" stroke-width="3" stroke-miterlimit="10" x1="36.913" y1="54.362" x2="47.651" y2="54.362"/>
            </svg>
          </div>
          <div class="col-md-7 border-left"></div>
        </section>
        <section class="row">
          <div class="col-md-5 border-right"></div>
          <div class="col-md-7 border-left"></div>
        </section>
      </article>
    </main>
  </div>
</template>

<style scoped>
header, main{
  height: calc(101vh - 136px - 180px);
}
.title--jr {
  letter-spacing: 105px;
}
.line {
  width: 75%;
  height: 1px;
  background-color: #000;
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

.footer {
  max-width: 100%;
}

</style>