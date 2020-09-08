import Vue from 'vue';
import Main from './main.vue';

var myConfirmConstructor = Vue.extend(Main);

const myConfirm = (message = '', title = '', options = {}) => {
  if (typeof message === 'object') {
    options = message;
    if(!options.message) {
      console.warn('请输入相关提示信息');
      options.message = '---';
    }
  }else{
    options.message = message;
  }
  if (typeof title === 'object') {
    options = title;
  }else if(title){
    options.title = title;
  }

  let instance = new myConfirmConstructor({
    data: options
  });

  instance.$mount();

  document.body.appendChild(instance.$el);

  instance.showEvent();

  let resolveTemp = null;
  let rejectTemp = null;

  // 打通两个文件的通道
  instance.callback = action => {
    if (action === 'confirm') {
      resolveTemp('confirm')
    } else if (action === 'cancel') {
      resolveTemp('cancel')
    }
  };

  return new Promise((resolve) => {
    resolveTemp = resolve;
  });
};

export default myConfirm
