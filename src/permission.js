import router from "./router";
import { getCache } from "@/utils/session";
import getPageTitle from "@/utils/getPageTitle";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { message } from "ant-design-vue";
import store from "./store";

NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = ["/login"]; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  if (getCache('TOKEN')) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.username.length === 0) {
        store.dispatch("user/getInfo").then(res => {
            // 拉取用户信息
            let userRouters = res.routers;
            let is_supper = res.is_supper;
            // let username = res.username
            store.dispatch('permission/getRoute', {userRouters, is_supper}).then(() => {
              // 生成可访问的路由表
              router.addRoutes(store.getters.routers); // 动态添加可访问路由表
              next({ ...to, replace: true });
            });
            })
            .catch(err => {
              store.dispatch("user/fedLogOut").then(() => {
                message.error(err || "Verification failed, please login again");
                next({ path: "/login" });
              });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
