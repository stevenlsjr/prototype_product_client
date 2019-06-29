import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import Login from "./pages/Login.vue";
import Products from "./pages/Products.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: "/products",
      name: "products",
      component: Products
    }
  ]
});
