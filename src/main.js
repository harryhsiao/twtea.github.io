// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { firestorePlugin } from 'vuefire'
import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'

Vue.component('Loading', Loading)
//Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(firestorePlugin)
//library.add(faUserSecret)


axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    let api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {

        next();

      } else {
        next({ path: '/login' });
      }
    });
  } else {

    next();

  }

})