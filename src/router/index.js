import Vue from 'vue'
import Router from 'vue-router'
// 先引入 路径
const Index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index');
const News = r => require.ensure([], () => r(require('@/pages/news/news')), 'news');
const NewsDetail = r => require.ensure([], () => r(require('@/pages/news/news-detail')), 'newsDetail');
const IndustryDynamics = r => require.ensure([], () => r(require('@/pages/news/industry-dynamics')), 'industryDynamics');
const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login');
const Register = r => require.ensure([], () => r(require('@/pages/login/register')), 'register');
const BusinessIndex = r => require.ensure([], () => r(require('@/pages/business-index/business-index')), 'businessIndex');
const MapIndex = r => require.ensure([], () => r(require('@/pages/map/map-index')), 'mapIndex');
const MyBusiness = r => require.ensure([], () => r(require('@/pages/mine/my-business')), 'myBusiness');
const MyFollow = r => require.ensure([], () => r(require('@/pages/mine/my-follow')), 'myFollow');
const UserManage = r => require.ensure([], () => r(require('@/pages/mine/user-manage')), 'userManage');
const VipCenter = r => require.ensure([], () => r(require('@/pages/mine/vip-center')), 'vipCenter');
const phoneRegister = r => require.ensure([], () => r(require('@/pages/phone-register/phone-register')), 'phoneRegister');
Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/', //首页
      name: 'index',
      component: Index
    },
    {
      path: '/news', //新闻
      name: 'news',
      component: News
    },
    {
      path: '/newsDetail', //新闻详情页
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/industryDynamics', //行业动态
      name: 'industryDynamics',
      component: IndustryDynamics
    },
    {
      path: '/login', //登录页
      name: 'login',
      component: Login
    },
    {
      path: '/register', //注册页
      name: 'register',
      component: Register
    },
    {
      path: '/businessIndex', //商圈首页
      name: 'businessIndex',
      component: BusinessIndex
    },
    {
      path: '/mapIndex', //地图首页
      name: 'mapIndex',
      component: MapIndex
    },
    {
      path: '/myBusiness', //我的商圈
      name: 'myBusiness',
      component: MyBusiness
    },
    {
      path: '/myFollow', //我的关注
      name: 'myFollow',
      component: MyFollow
    },
    {
      path: '/userManage', //用户管理
      name: 'userManage',
      component: UserManage
    }, {
      path: '/vipCenter', //会员中心
      name: 'vipCenter',
      component: VipCenter
    },
    {
      path: '/phoneRegister', //会员中心
      name: 'phoneRegister',
      component: phoneRegister
    },
  ]
})
