import YdRadio from './code/main';

/* istanbul ignore next */
YdRadio.install = function(Vue) {
  Vue.component(YdRadio.name, YdRadio);
};

export default YdRadio;
