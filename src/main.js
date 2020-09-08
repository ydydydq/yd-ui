import Vue from 'vue'
import App from './App.vue'
import router from './router'

import YDUI from '@/components/YDUI';
Vue.use(YDUI)

// import elementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(elementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
