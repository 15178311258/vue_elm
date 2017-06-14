// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

//import "common/stylus/index.styl"

Vue.use(VueRouter)

//定义路由
const routes = [{
        path: "/goods",
        component: Goods
    },
    {
        path: "/ratings",
        component: Ratings
    },
    {
        path: "/seller",
        component: Seller
    }
]

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes: routes, // （缩写）相当于 routes: routes
    linkActiveClass: "tab-active"
})

// eslint-disable no-new 
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router
});
//默认显示商品页
router.push("/goods")