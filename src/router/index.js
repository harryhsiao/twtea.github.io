import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/page/dashboard'
import products from '@/components/page/products'
import homepage from '@/components/page/homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'homepage',
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          component: homepage,
        },
      ],      
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
      meta: { requiresAuth: true },      
      children:[
        {
          path: 'products',
          name: 'products',
          component: products,          
        },
      ],
    }
  ]
})
