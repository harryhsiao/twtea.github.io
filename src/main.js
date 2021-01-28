// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import App from './App'
import router from './router'


Vue.use(firestorePlugin)

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

firebase.initializeApp({
  projectId: 'YOUR_PROJECT_ID',
  databaseURL: 'YOUR_DB_URL'
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    let api = `${process.env.APIPATH}/api/user/check`;
    axios.get(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {

        next();

      } else {
        next({ path: '/login', });
      }
    });
  }else{

    next();
    
  }

})

export const db = firebase.firestore()