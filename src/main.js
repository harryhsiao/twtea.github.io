// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { firestorePlugin } from 'vuefire';
import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import VueI18n from 'vue-i18n';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

Vue.use(VueI18n)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

extend('zhtw_name', value => {
  //驗證條件: 符合的話為true，不作為
  if (!value.match(/[0-9]/ig)) {
    return true;
  };
  //若是使用者輸入零或是負數導致驗證條件為false, 跳出下列訊息
  //錯誤訊息: 
  return '無效的姓名';
});


Vue.component('Loading', Loading);
//Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(firestorePlugin);
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