import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import homepage from '@/components/page/homepage'
import menu from '@/components/page/menu'
import shop from '@/components/page/shop'

import login from '@/components/page/login'

import dashboard from '@/components/page/back_end/dashboard'
import products from '@/components/page/back_end/products'
import orders from '@/components/page/back_end/orders'
import coupon from '@/components/page/back_end/coupon'

import cart from '@/components/page/shopping/cart'
import product from '@/components/page/shopping/product'

import checkpage from '@/components/page/settle_accounts/checkpage'
import addcart from '@/components/page/settle_accounts/addcart'
import custinfo from '@/components/page/settle_accounts/custinfo'
import custcheckout from '@/components/page/settle_accounts/custcheckout'
import checkcomp from '@/components/page/settle_accounts/checkcomp'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
          meta: {
            breadcrumb: [{
              name: '商品首頁'
            }]
          },
          component: cart
        },
        {
          path: 'addcart',
          name: 'addcart',
          component: addcart
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu
        },
        {
          path: 'shop',
          name: 'shop',
          component: shop
        },
        {
          path: 'product/:productId',
          name: 'product',
          meta: {
            breadcrumb: [
              {
                name: '商品首頁',
                link: '/cart'
              },
              {
                name: '商品細節'
              },
            ]
          },
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
      children: [
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
    },
    {
      path: '/checkpage',
      name: 'checkpage',
      component: checkpage,
      children: [
        {
          path: 'custinfo',
          name: 'custinfo',
          component: custinfo
        },
        {
          path: 'custcheckout',
          name: 'custcheckout',
          component: custcheckout
        },
        {
          path: 'checkcomp/:order_id',
          name: 'checkcomp',
          component: checkcomp
        },
      ]
    },
  ]
})
