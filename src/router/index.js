import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/page/dashboard'
import products from '@/components/page/products'
import product from '@/components/page/product'
import orders from '@/components/page/orders'
import coupon from '@/components/page/coupon'
import shop from '@/components/page/shop'
import cart from '@/components/page/cart'
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
          path: '',
          name: 'homepage',
          component: homepage,
        },
        {
          path: 'cart',
          name: 'cart',
          component: cart
        },
        {
          path: 'shop',
          name: 'shop',
          component: shop
        },
        {
          path: 'product/:productId',
          name: 'product',
          component: product,
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
        {
          path: 'orders',
          name: 'orders',
          component: orders,
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
        },
      ],
    }
  ]
})
