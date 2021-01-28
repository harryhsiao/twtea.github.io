import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/page/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'HelloWorld'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      
    }
  ]
})
