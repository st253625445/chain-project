import Vue from "vue";
import Router from "vue-router";
import { getToken, setToken } from "@/utils/auth"; // 验权

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    activePath: ''
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
    path: "",
    component: Layout,
    children: [
      {
        path: "index",
        name: "index",
        meta: { title: "产业谱系", activePath: "index" },
        component: () => import("@/views/pages/index")
      },
      {
        path: "members",
        name: "members",
        meta: { title: "产业链成员", activePath: "members" },
        component: () => import("@/views/pages/members")
      },
      {
        path: "company",
        name: "company",
        hidden: true,
        meta: { title: "企业画像", activePath: "members" },
        component: () => import("@/views/pages/company")
      },
      // {
      //   path: "portrait",
      //   name: "portrait",
      //   meta: { title: "行业画像", activePath: "portrait" },
      //   component: () => import("@/views/pages/portrait")
      // },
      {
        path: "cloud",
        name: "cloud",
        meta: { title: "产业云图", activePath: "cloud" },
        component: () => import("@/views/pages/cloud")
      },
      // {
      //   path: "scale",
      //   name: "scale",
      //   meta: { title: "产业规模", activePath: "scale" },
      //   component: () => import("@/views/pages/scale")
      // },
      {
        path: "fund",
        name: "fund",
        meta: { title: "产业基金（匹配）", activePath: "fund" },
        component: () => import("@/views/pages/fund")
      },
      {
        path: "fundAll",
        name: "fundAll",
        meta: { title: "产业基金（全量）", activePath: "fundAll" },
        component: () => import("@/views/pages/fund-all")
      },
      {
        path: "fundChain",
        name: "fundChain",
        hidden: true,
        meta: { title: "投资谱系", activePath: "fund" },
        component: () => import("@/views/pages/fund-chain")
      },
      {
        path: "fundAllChain",
        name: "fundAllChain",
        hidden: true,
        meta: { title: "投资谱系", activePath: "fundAll" },
        component: () => import("@/views/pages/fund-chain")
      },
      // {
      //   path: "financing",
      //   name: "financing",
      //   meta: { title: "并购融资事件", activePath: "financing" },
      //   component: () => import("@/views/pages/financing")
      // },
      {
        path: "information",
        name: "information",
        meta: { title: "资讯与行研", activePath: "information" },
        component: () => import("@/views/pages/information")
      },
      {
        path: "park",
        name: "park",
        meta: { title: "产业园区", activePath: "park" },
        component: () => import("@/views/pages/park")
      },
      {
        path: "parkInfo",
        name: "parkInfo",
        hidden: true,
        meta: { title: "产业园区信息", activePath: "park" },
        component: () => import("@/views/pages/park-info")
      },
      {
        path: "parkChain",
        name: "parkChain",
        hidden: true,
        meta: { title: "产业集群", activePath: "park" },
        component: () => import("@/views/pages/park-chain")
      },
      {
        path: "parkNews",
        name: "parkNews",
        hidden: true,
        meta: { title: "园区资讯", activePath: "park" },
        component: () => import("@/views/pages/park-news")
      },
      {
        path: "associations",
        name: "associations",
        meta: { title: "协会联盟", activePath: "associations" },
        component: () => import("@/views/pages/associations")
      },
      {
        path: "associationsChain",
        name: "associationsChain",
        hidden: true,
        meta: { title: "协会成员", activePath: "associations" },
        component: () => import("@/views/pages/associations-chain")
      }
    ]
  },
  {
    path: "/pdf",
    component: () => import("@/views/pages/pdf"),
    hidden: true
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
  let _token = to.query.token;
  if (_token) {
    setToken(_token);
    next({ path: "/" });
  } else if (getToken()) {
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
