import YdPopover from './code/main.vue';
// import directive from './code/direcive.js';

// import Vue from 'vue';

// Vue.directive('popover', directive);

// 支持单个组件进行vue.use注册
YdPopover.install = function(Vue) {
  // Vue.directive('popover', directive);
  Vue.component(YdPopover.name, YdPopover);
};

// YdPopover.directive = directive;

export default YdPopover;
