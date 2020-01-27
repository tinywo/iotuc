import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
//  ViewUI
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI);
//  Echarts
import Echarts from 'echarts'
Vue.prototype.echarts = Echarts;
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
