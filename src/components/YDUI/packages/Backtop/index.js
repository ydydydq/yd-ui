import YdBacktop from './code/main';

/* istanbul ignore next */
YdBacktop.install = function(Vue) {
  Vue.component(YdBacktop.name, YdBacktop);
};

export default YdBacktop;
