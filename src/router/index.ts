import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../views/layout/index.vue";
import echarts from "../views/echarts/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: echarts,
  }
  
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
