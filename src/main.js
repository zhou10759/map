import Vue from 'vue'
import App from './App'
import router from './router'
import './style/base.css'
// 使用echarts
import echarts from 'echarts';
// 引入轮播图
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';
// 使用element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用jq
import $ from 'jquery'
// 使用cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
//es6转es5
import 'babel-polyfill'
// 引入axios
import axios from 'axios'
//把axios挂载到vue上
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// 使用头部标签插件vue-meta-info
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
Vue.use(ElementUI);
/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  template: '<App/>'
})
export default vue
