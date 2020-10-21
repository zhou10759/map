# pc-vue 项目模板（pc端vue模板）_v1.0

## 一、依赖环境 node

## 二、项目运行和打包

```bash
# 下载依赖安装包
npm install

# 运行项目 浏览器输入 localhost:8080
npm run dev

# 打包项目
npm run build
```

## 三、项目结构

```bash
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // webpack loader配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置,构建开发本地服务器
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- router                       // vue的路由管理
|   |-- pages                        // 页面编写管理（此文件夹下代码按模块创建对应文件夹）
|   |   |-- index                    // 首页模块
|   |   |   |-- index.vue            // 首页模块下的首页
|   |-- api                          // 接口
|   |   |-- config.js                // axios配置文件
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等（图片按模块放在这）
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcsssrc                       // postcss配置文件
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息,包依赖信息等（项目所用到的框架都在这可以看到）
```

## 四、项目中所用技术

    vue.js
    vue-router
    css: less
    UI框架：element-ui
    数据请求：axios

> element-ui 链接：[element-ui](http://element-cn.eleme.io/#/zh-CN/component/installation)

## 五、前后端交互

```bash
    # 引入axios配置代码
    import axios from "../config.js"
    export function index(info) {
    # 调用的后台的接口名
    const url = "word/sort"
    const data = {
    # 发送后台的参数
        data: info
    }
    # 发送请求
    return axios.post(url, data)
    }

    # 遇到跨域问题（代理）
    proxyTable: {
    	'/': {
        #需要代理的地址：必须加http：//
        target: 'http://207.148.100.214:8080',
    		pathRewrite: {'^/api' : ''},
                #开启跨域
    		changeOrigin: true,
                #是否是https协议的
    		secure: true,
    	}
    },
```

## 六、路由配置

```bash

import Vue from 'vue'
import Router from 'vue-router'
# 按需加载组件
const Index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index');
# 全局注册路由
Vue.use(Router)

export default new Router({
  routes: [
    {
    # 路由路径、名称、所对应的组件
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
```

## 七、代码相应规范在 gitLib 的 公司公开文件资料仓库里

> [公司公开文件资料仓库地址](http://47.93.45.97:8082/root/catchertech/tree/master/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83)
