import Vue from 'vue'
import Router from 'vue-router'
import $store from '@/store/index'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/* UserLayout */
import UserLayout from '@/views/am-layout-user/Layout'
/* MediaLayout */
import MediaLayout from '@/views/am-layout-media/Layout'
/*     
*   图片、我的图片、视频、我的视频
*/
import AllImg from '@/views/am-media/AllImg'
import MyImg from '@/views/am-media/MyImg'
import AllVideo from '@/views/am-media/AllVideo'
import MyVideo from '@/views/am-media/MyVideo'
/* 手艺网用户系统 */
import UserCenter from '@/views/am-structure/UserCenter'
/* 手艺网前台用户系统 */
import FountUser from '@/views/am-user/FountUser'
/* 手艺网后台用户系统 */
import AdminUser from '@/views/am-user/AdminUser'
/* 手艺网目录结构 */
import Structure from '@/views/am-structure/TreeStructure'
/* 手艺网浮窗配置 */
import FloatingWindow from '@/views/am-structure/FloatingWindow'
/* 手艺网banner */
import Branner from '@/views/am-structure/Banner'
/* 手艺网二维码 */ 
import QRcode from '@/views/am-structure/QRcode'
/* 手艺网二维码 */ 
import NewMedia from '@/views/am-structure/NewMedia'
/* 手艺网头条 */ 
import Headline from '@/views/am-content/Headline'
/* 手艺特别策划 */ 
import Thematic from '@/views/am-content/Thematic'
/* 手艺专题策划 */ 
import ThematicTwo from '@/views/am-content/ThematicTwo'
/* 手艺专题策划 */ 
import ThematicTwoName from '@/views/am-content/ThematicTwoName'
/* 手艺网广告 */ 
import Advertisement from '@/views/am-content/Advertisement'
/* 手艺网官方信息 */ 
import Information from '@/views/am-content/Information'
/* 手艺网文件管理系统 */ 
import ImageCenter from '@/views/am-images/ImageCenter'
/* 手艺网用户管理系统 */ 
import UserInfo from '@/views/am-user/UserInfo'
/* 手艺网用户密码系统 */ 
import UserPassWordInfo from '@/views/am-user/UserPassWordInfo'
/* 访问统计 */
import AllGuide from '@/views/am-recode/allGuide'
import ArticleGuide from '@/views/am-recode/articleGuide'
import NavGuide from '@/views/am-recode/navGuide'
/* 手艺网富文本编辑器 */
import Ueditor from '@/views/am-content/addver'



/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  /* 手艺网添加的路由 */
  {
    path: '',
    component: Layout,
    redirect: 'userCenter',
    children: [{
      path: 'userCenter',
      component: UserCenter,
      name: 'userCenter',
      meta: {
        title: '用户管理',
        icon: 'excel'
      }
    }]
  }, 
  // 用户管理模块
  {
    path: '/userModule',
    component: UserLayout,
    redirect: '/userModule/fountuser/index',
    children: [
      {
        path: '/userModule/fountuser/index',
        component: FountUser,
        name: 'fountuser',
        meta: {
          title: '前台用户管理',
          icon: 'excel'
        }
      },
      {
        path: '/userModule/adminuser/index',
        component: AdminUser,
        name: 'adminuser',
        meta: {
          title: '后台用户管理',
          icon: 'excel'
        }
      }
    ]
  }, 
  // 图片管理模块 MediaLayout
  {
    path: '/mediaModule',
    component: MediaLayout,
    redirect: '/mediaModule/allImg',
    children: [
      {
        path: '/mediaModule/allImg',
        component: AllImg,
        name: 'allImg',
        meta: {
          title: '图片',
          icon: 'excel'
        }
      },
      {
        path: '/mediaModule/myImg',
        component: MyImg,
        name: 'myImg',
        meta: {
          title: '我的图片',
          icon: 'excel'
        }
      },
      {
        path: '/mediaModule/allVideo',
        component: AllVideo,
        name: 'allVideo',
        meta: {
          title: '视频',
          icon: 'excel'
        }
      },
      {
        path: '/mediaModule/myVideo',
        component: MyVideo,
        name: 'myVideo',
        meta: {
          title: '我的视频',
          icon: 'excel'
        }
      }
    ]
  }, 
  /* 手艺网添加的路由 */
  // {
  //   path: '/userInfo',
  //   component: Layout,
  //   redirect: '/userInfo/index',
  //   children: [{
  //     path: 'index',
  //     component: UserInfo,
  //     name: 'userInfo',
  //     meta: {
  //       title: '用户管理系统',
  //       icon: 'excel'
  //     }
  //   }]
  // }, 
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: _import('dashboard/index'),
  //     name: 'dashboard',
  //     meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //   }]
  // },
  // 手艺网添加的路由
  // 访问统计模块
  {
    path: '/allGuide',
    component: Layout,
    redirect: '/allGuide/index',
    children: [{
      path: 'index',
      component: AllGuide,
      name: 'allGuide',
      meta: {
        title: '总访问量',
        icon: 'excel'
      }
    }]
  },
  {
    path: '/articleGuide',
    component: Layout,
    redirect: '/articleGuide/index',
    children: [{
      path: 'index',
      component: ArticleGuide,
      name: 'articleGuide',
      meta: {
        title: '文章访问量',
        icon: 'excel'
      }
    }]
  },
  {
    path: '/navGuide',
    component: Layout,
    redirect: '/navGuide/index',
    children: [{
      path: 'index',
      component: NavGuide,
      name: 'navGuide',
      meta: {
        title: '菜单访问量',
        icon: 'excel'
      }
    }]
  },
  // 目录结构
  {
    path: '/structure',
    component: Layout,
    redirect: '/structure/index',
    children: [{
      path: 'index',
      component: Structure,
      name: 'structure',
      meta: {
        title: '目录结构',
        icon: 'excel'
      }
    }]
  },
  //  浮窗配置 FloatingWindow
  {
      path: '/floatingWindow',
      component: Layout,
      redirect: '/floatingWindow/index',
      children: [{
        path: 'index',
        component: FloatingWindow,
        name: 'floatingWindow',
        meta: {
          title: '浮窗配置',
          icon: 'excel'
        }
      }]
  },
  // banner
  {
      path: '/banner',
      component: Layout,
      redirect: '/banner/index',
      children: [{
        path: 'index',
        component: Branner,
        name: 'banner',
        meta: {
          title: 'banner',
          icon: 'excel'
        }
      }]
  },
  // 二维码 QRcode
  {
    path: '/QRcode',
    component: Layout,
    redirect: '/QRcode/index',
    children: [{
      path: 'index',
      component: QRcode,
      name: 'QRcode',
      meta: {
        title: '二维码',
        icon: 'excel'
      }
    }]
  },
  // 新媒体
  {
    path: '/newMedia',
    component: Layout,
    redirect: '/newMedia/index',
    children: [{
      path: 'index',
      component: NewMedia,
      name: 'newMedia',
      meta: {
        title: '新媒体',
        icon: 'excel'
      }
    }]
  }, 
  // 自定义专题策划标题配置页面  ThematicTwoName
  {
    path: '/thematicTwoName',
    component: Layout,
    redirect: '/thematicTwoName/index',
    children: [{
      path: 'index',
      component: ThematicTwoName,
      name: 'thematicTwoName',
      meta: {
        title: '自定义专题策划标题配置',
        icon: 'excel'
      }
    }]
  }, 
  // 头条  Headline
  {
    path: '/headline',
    component: Layout,
    redirect: '/headline/index',
    children: [{
      path: 'index',
      component: Headline,
      name: 'headline',
      meta: {
        title: '头条',
        icon: 'excel'
      }
    }]
  }, 
  // 专题策划
  {
    path: '/thematic',
    component: Layout,
    redirect: '/thematic/index',
    children: [{
      path: 'index',
      component: Thematic,
      name: 'thematic',
      meta: {
        title: '特别策划',
        icon: 'excel'
      }
    }]
  },
  // 专题策划  ThematicTwo
  {
    path: '/thematicTwo',
    component: Layout,
    redirect: '/thematicTwo/index',
    children: [{
      path: 'index',
      component: ThematicTwo,
      name: 'thematicTwo',
      meta: {
        title: '专题策划',
        icon: 'excel'
      }
    }]
  },
  // 广告 Advertisement
  {
    path: '/advertisement',
    component: Layout,
    redirect: '/advertisement/index',
    children: [{
      path: 'index',
      component: Advertisement,
      name: 'advertisement',
      meta: {
        title: '广告',
        icon: 'excel'
      }
    }]
  },
  // 官方信息 information
  {
    path: '/information',
    component: Layout,
    redirect: '/information/index',
    children: [{
      path: 'index',
      component: Information,
      name: 'information',
      meta: {
        title: '广告',
        icon: 'excel'
      }
    }]
  },
  // 文件管理系统 ImageCenter
  {
    path: '/imageCenter',
    component: Layout,
    redirect: '/imageCenter/index',
    children: [{
      path: 'index',
      component: ImageCenter,
      name: 'imageCenter',
      meta: {
        title: '图片/视频',
        icon: 'excel'
      }
    }]
  },
  // 个人信息页面
  {
    path: '/userInfo',
    component: Layout,
    redirect: '/userInfo/index',
    children: [{
      path: 'index',
      component: UserInfo,
      name: 'userInfo',
      meta: {
        title: '基本资料',
        icon: 'excel'
      }
    }]
  },
  // 个人密码修改   UserPassWordInfo
  {
    path: '/userPassWordInfo',
    component: Layout,
    redirect: '/userPassWordInfo/index',
    children: [{
      path: 'index',
      component: UserPassWordInfo,
      name: 'userPassWordInfo',
      meta: {
        title: '密码安全',
        icon: 'excel'
      }
    }]
  },
  // 富文本编辑器 Ueditor
  {
      path: '/addver',
      component: Layout,
      redirect: '/addver/index',
      children: [{
        path: 'index',
        component: Ueditor,
        name: 'ueditor',
        meta: {
          title: '文章管理',
          icon: 'excel'
        }
      }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router =  new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
// ]

// 判断登陆的导航钩子
router.beforeEach((to, from, next) => {
  if($store.state.user.token != '' || to.path == '/login') {
    next()
  }else {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath
      }
    });
  }
});


export default router;