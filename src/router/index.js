import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

/* Layout */

import { makeModuleRoute } from "@/utils/router";

import {makeRoute} from '@/utils/router';
import Dashboard from '@/views/dashboard'
import Form from '@/views/form'

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/components/error/404"),
    hidden: true
  }
];

export const asyncRoutes = [
  makeModuleRoute("/","root", Layout, "", [
    makeRoute('dashboard', 'Dashboard', Dashboard, { title: 'Dashboard', icon: 'dashboard'}),
    makeRoute('form', 'Form', Form, { title: 'Form', icon: 'form'}, "form.view")
  ]),
  { path: "*", redirect: "/404", hidden: true }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
