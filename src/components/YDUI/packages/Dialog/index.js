import YdDialog from './code/main.vue';

/* istanbul ignore next */
YdDialog.install = function(Vue) {
  Vue.component(YdDialog.name, YdDialog);
};

export default YdDialog;
