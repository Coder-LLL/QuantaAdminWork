// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import axios from 'axios'

// 引入阿里云矢量图库的图标
import "../src/assets/css/icon/iconfont.css"

// 挂在基本样式
import "../src/assets/css/base.css"

// 导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
