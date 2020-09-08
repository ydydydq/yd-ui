import YdCollapse from './code/main';

/* istanbul ignore next */
YdCollapse.install = function(Vue) {
  Vue.component(YdCollapse.name, YdCollapse);
};

export default YdCollapse;
