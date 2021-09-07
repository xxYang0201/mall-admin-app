import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoute from '../utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const ayncRouterMap = [{

  path: '/product',
  name: 'Product',
  icon: 'shop',
  meta: {
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    icon: 'unordered-list',
    meta: {
      title: '商品列表',
    },
    component: () => import('@/views/pages/productList.vue'),
  },
  {
    path: 'add',
    name: 'ProductAdd',
    icon: 'folder-add',
    meta: {
      title: '商品添加',
    },
    component: () => import('@/views/pages/productAdd.vue'),
  },
  {
    path: 'category',
    name: 'Category',
    icon: 'setting',
    meta: {
      title: '类目管理',
    },
    component: () => import('@/views/pages/category.vue'),
  },
  ],

}];

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  icon: 'home',
  redirect: '/index',
  meta: {
    title: '首页',
  },
  children: [{
    path: 'index',
    name: 'Index',
    icon: 'home',
    meta: {
      title: '统计',
    },
    component: () => import('../views/pages/index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
  },
},

];

const router = new VueRouter({
  routes,

});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          next();
          console.log(menuRoutes);
          router.addRoutes(menuRoutes);
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
