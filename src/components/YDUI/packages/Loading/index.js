import directive from './code/directive.js';
import service from './code/main.js';

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$YD_loading = service;
  },
  service,
  directive
};
