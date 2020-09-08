import Vue from 'vue';
import Main from './main.vue';

var ydLoadingConstructor = Vue.extend(Main);

const ydLoading = (options = {}) => {
  if (typeof options !== 'object') {
    console.error('options require is object');
    return;
  }

  let parent = document.body; // 待扩展

  let instance = new ydLoadingConstructor({
    el: document.createElement('div'),
    data: options
  });

  parent.appendChild(instance.$el);

  instance.showEvent();

  return instance;
};

export default ydLoading;
