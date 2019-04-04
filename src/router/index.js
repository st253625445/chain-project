import Vue from "vue";
import Router from "vue-router";
import { getToken } from "@/utils/auth"; // 验权

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },

  {
    path: "/",
    component: () => import("@/views/index"),
    hidden: true
  },
  {
    path: "/index",
    component: Layout,
    children: [
      {
        path: "",
        name: "index",
        meta: { title: "产业谱系" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/members",
    component: Layout,
    children: [
      {
        path: "",
        name: "members",
        meta: { title: "产业链成员" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/portrait",
    component: Layout,
    children: [
      {
        path: "",
        name: "portrait",
        meta: { title: "行业画像" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/cloud",
    component: Layout,
    children: [
      {
        path: "",
        name: "cloud",
        meta: { title: "产业云图" },
        component: () => import("@/views/pages/cloud")
      }
    ]
  },
  {
    path: "/scale",
    component: Layout,
    children: [
      {
        path: "",
        name: "scale",
        meta: { title: "产业规模" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/fund",
    component: Layout,
    children: [
      {
        path: "",
        name: "fund",
        meta: { title: "产业基金" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/financing",
    component: Layout,
    children: [
      {
        path: "",
        name: "financing",
        meta: { title: "并购融资事件" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/information",
    component: Layout,
    children: [
      {
        path: "",
        name: "information",
        meta: { title: "资讯与行研" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/park",
    component: Layout,
    children: [
      {
        path: "",
        name: "park",
        meta: { title: "产业园区" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  {
    path: "/associations",
    component: Layout,
    children: [
      {
        path: "",
        name: "associations",
        meta: { title: "协会联盟" },
        component: () => import("@/views/pages/index")
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

const router = new Router({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
// 用户登录过滤器
const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
