import Vue from 'vue';
import Main from './main.vue';
import {getStyle, addClass, removeClass} from '../../../src/utils/dom.js';
import afterLeave from '../../../src/utils/after-leave.js';

const Mask = Vue.extend(Main);

const loadingDirective = {};
loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        el.originalPosition = getStyle(el, 'position');

        /** 搞定maskStyle中需要的width/height(用在全局插入body中的,但现在不支持这个能力)
         * 这里可以不需要,loading本身就是100%,一加可能在一些有弹窗有时间间隔(效果)出现width/height占不满的情况
         */
        /*['height', 'width'].forEach(property => {
          el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
        });*/
        insertDom(el, el, binding);
      });
    }
    else {
      afterLeave(el.instance, _ => { // 做个transition
        el.domVisible = false;
        removeClass(el, 'yd-loading-parent--relative');
      }, 300, true);
      el.instance.existDom = false;
    }
  };
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible && getStyle(el, 'display') !== 'none') {
      // 给mask更新样式
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property];
      });
      // 给父级添加relative
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'yd-loading-parent--relative');
      }

      el.domVisible = true;

      parent.appendChild(el.mask);
      Vue.nextTick(() => {
        el.instance.existDom = true;
      });

      // 标明存在这个指令,为了指令销毁的时候判断
      el.domInserted = true;
    }
  };


  Vue.directive('yd-loading', {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute('yd-loading-text');
      const typeExr = el.getAttribute('yd-loading-type') || 1;
      const backgroundExr = el.getAttribute('yd-loading-background');
      const customClassExr = el.getAttribute('yd-loading-custom-class');
      const vm = vnode.context;
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          type: vm && vm[typeExr] || typeExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
        }
      });

      el.instance = mask;
      el.mask = mask.$el; // 重点: dom为v-show
      el.maskStyle = {
        position: 'absolute' // 这里我默认指令就是absolute, elementui貌似通过变量去控制, 其主要是让指令的范围扩展到"大", 但个人觉得用处不大, 所以剥夺了这个能力.
      };
      binding.value && toggleLoading(el, binding);
    },

    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance && el.instance.$destroy();
    }
  });
};

export default loadingDirective;
