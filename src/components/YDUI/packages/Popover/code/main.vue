<template>
    <span>
        <transition name="yd-popover-fade"
                    @after-enter="handleAfterEnter"
                    @after-leave="handleAfterLeave">
            <div v-show="showPopper"
                 :id="tooltipId"
                 :style="{width, 'z-index': zIndex, padding}"
                 ref="popper"
                 class="yd-popover">
                <h2 v-show="title" class="yd-popover__title" v-text="title"></h2>
                <slot>
                    <p class="yd-popover__content" v-text="content"></p>
                </slot>
                <slot name="footer">
                    <div v-if="isFooter" class="yd-popover__footer yd-flex-h-hR-vC">
                        <div @click="doClose" class="yd-popover__btn yd-flex-h-hC-vC" v-text="cancelButtonText" />
                        <div @click="confirm" class="yd-popover__btn yd-popover__btn--primary yd-flex-h-hC-vC" v-text="confirmButtonText" />
                    </div>
                </slot>
            </div>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>

<script>
  import { addClass, removeClass, on, off } from '../../../src/utils/dom.js';
  import { generateId } from '../../../src/utils/utils.js';
  import Popper from '../../../src/utils/vue-popper.js';
  export default {
    name: "YdPopover",
    mixins: [Popper],
    props: {
      trigger: {
        type: String,
        default: 'click',
        validator: value => ['click', 'focus', 'hover'].indexOf(value) > -1
      },
      reference: {},
      openDelay: {
        type: Number,
        default: 0
      },
      closeDelay: {
        type: Number,
        default: 200
      },
      visibleArrow: {
        default: true
      },
      arrowOffset: {
        type: Number,
        default: 0
      },
      zIndex: {
        default: 2001
      },
      width: {
        default: '200px'
      },
      padding: {
        default: '12px 14px'
      },
      isFooter: {
        type: Boolean,
        default: true
      },
      cancelButtonText: {
        type: String,
        default: 'No'
      },
      confirmButtonText: {
        type: String,
        default: 'Yes'
      },
      title: {
        type: String
      },
      content: {
        type: String,
      }
    },
    data() {
      return {
        referenceElm: null, // 参照元素,默认是fixed,也可以传入参照元素,没有则为插入的元素
        _timer: null, // 控制
      }
    },
    watch: {
      showPopper(val) {
        val ? this.$emit('show') : this.$emit('hide');
      }
    },
    computed: {
      tooltipId() {
        return `yd-popover-${ generateId() }`;
      }
    },
    mounted() {
      let reference = this.referenceElm = this.reference || this.$refs.reference;
      const popper = this.popper || this.$refs.popper;

      // 获取插槽元素
      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      // 可访问性
      if (reference) {
        addClass(reference, 'yd-popover__reference');
        reference.setAttribute('aria-describedby', this.tooltipId); // 给辅助设备读取的,可以不用管

        if (this.trigger !== 'click') {
          on(reference, 'focusin', () => {
            this.handleFocus();
            const instance = reference.__vue__;
            console.log(instance)
            if (instance && typeof instance.focus === 'function') {
              instance.focus();
            }
          });
          on(popper, 'focusin', this.handleFocus);
          on(reference, 'focusout', this.handleBlur);
          on(popper, 'focusout', this.handleBlur);
        }

        on(reference, 'keydown', this.handleKeydown);
        on(reference, 'click', this.handleClick);
      }

      if (this.trigger === 'click') {
        on(reference, 'click', this.doToggle);
        on(document, 'click', this.handleDocumentClick);
      } else if (this.trigger === 'hover') {
        on(reference, 'mouseenter', this.handleMouseEnter);
        on(popper, 'mouseenter', this.handleMouseEnter);
        on(reference, 'mouseleave', this.handleMouseLeave);
        on(popper, 'mouseleave', this.handleMouseLeave);
      } else if (this.trigger === 'focus') {
        if (this.tabindex < 0) {
          console.warn('[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key');
        }
        if (reference.querySelector('input, textarea')) {
          on(reference, 'focusin', this.doShow);
          on(reference, 'focusout', this.doClose);
        } else {
          on(reference, 'mousedown', this.doShow);
          on(reference, 'mouseup', this.doClose);
        }
      }
    },
    methods: {
      // 操作
      doToggle() {
        this.showPopper = !this.showPopper;
      },
      doShow() {
        this.showPopper = true;
      },
      doClose() {
        this.showPopper = false;
      },
      confirm() {
        this.$emit('confirmEmit', this.doClose);
      },
      // 事件处理函数
      handleClick() {
        removeClass(this.referenceElm, 'focusing');
      },
      handleFocus() {
        addClass(this.referenceElm, 'focusing');
        if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = true;
      },
      handleBlur() {
        removeClass(this.referenceElm, 'focusing');
        if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = false;
      },
      handleKeydown(ev) {
        if (ev.keyCode === 27) { // esc
          this.doClose();
        }
      },
      // hover
      handleMouseEnter() {
        clearTimeout(this._timer);
        if (this.openDelay) {
          this._timer = setTimeout(() => {
            this.showPopper = true;
          }, this.openDelay);
        } else {
          this.showPopper = true;
        }
      },
      handleMouseLeave() {
        clearTimeout(this._timer);
        if (this.closeDelay) {
          this._timer = setTimeout(() => {
            this.showPopper = false;
          }, this.closeDelay);
        } else {
          this.showPopper = false;
        }
      },
      // 文档点击
      handleDocumentClick(e) {
        let reference = this.reference || this.$refs.reference;
        const popper = this.popper || this.$refs.popper;

        if (!reference && this.$slots.reference && this.$slots.reference[0]) {
          reference = this.referenceElm = this.$slots.reference[0].elm;
        }
        if (!this.$el ||
          !reference ||
          this.$el.contains(e.target) ||
          reference.contains(e.target) ||
          !popper ||
          popper.contains(e.target)) return;
        this.showPopper = false;
      },
      // 清除
      cleanup() {
        if (this.openDelay || this.closeDelay) {
          clearTimeout(this._timer);
        }
      },
      // 动画
      handleAfterEnter() {
        this.$emit('after-enter');
      },
      handleAfterLeave() {
        this.$emit('after-leave');
        this.doDestroy();
      },
    },
    beforeDestroy() {
      this.cleanup();
    },
    deactivated() {
      this.cleanup();
    },
    destroyed() {
      const reference = this.reference;

      off(reference, 'click', this.doToggle);
      off(reference, 'mouseup', this.doClose);
      off(reference, 'mousedown', this.doShow);
      off(reference, 'focusin', this.doShow);
      off(reference, 'focusout', this.doClose);
      off(reference, 'mousedown', this.doShow);
      off(reference, 'mouseup', this.doClose);
      off(reference, 'mouseleave', this.handleMouseLeave);
      off(reference, 'mouseenter', this.handleMouseEnter);
      off(document, 'click', this.handleDocumentClick);
    }
  }
</script>

<style lang="less" scoped>
    .yd-popover{
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,.15);
        box-sizing: border-box;
        padding: 12px 14px;
    }
    .yd-popover__title{
        color: #303133;
        font-size: 16px;
        line-height: 1;
        margin-bottom: 12px;
    }
    .yd-popover__content{
        line-height: 16px;
        font-size: 14px;
        color: #9a9a9a;
        margin: 0;
    }
    .yd-popover__footer{
        box-sizing: border-box;
        margin-top: 12px;
    }
    .yd-popover__btn{
        height: 25px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        padding: 0 8px;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
    }
    .yd-popover__btn:active{
        transform: translateY(-2px);
    }
    .yd-popover__btn--primary{
        background: #43afff;
        color: #fff;
        margin-left: 8px;
    }
    /*aminate*/
    .yd-popover-fade-enter, .yd-popover-fade-leave, .yd-popover-fade-leave-active {
        opacity: 0
    }
    .yd-popover-fade-enter-active, .yd-popover-fade-leave-active {
        transition: opacity .2s linear
    }
</style>

<style>
    /*arrow*/
    .yd-popover .popper__arrow, .yd-popover .popper__arrow::after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid
    }
    .yd-popover .popper__arrow {
        border-width: 6px;
        -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03))
    }
    .yd-popover .popper__arrow::after {
        content: " ";
        border-width: 6px
    }
    .yd-popover[x-placement^=top] {
        margin-bottom: 12px
    }
    .yd-popover[x-placement^=top] .popper__arrow {
        bottom: -6px;
        left: 50%;
        margin-right: 3px;
        border-top-color: #EBEEF5;
        border-bottom-width: 0
    }
    .yd-popover[x-placement^=top] .popper__arrow::after {
        bottom: 1px;
        margin-left: -6px;
        border-top-color: #FFF;
        border-bottom-width: 0
    }
    .yd-popover[x-placement^=bottom] {
        margin-top: 12px
    }
    .yd-popover[x-placement^=bottom] .popper__arrow {
        top: -6px;
        left: 50%;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #EBEEF5
    }
    .yd-popover[x-placement^=bottom] .popper__arrow::after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #FFF
    }
    .yd-popover[x-placement^=right] {
        margin-left: 12px
    }
    .yd-popover[x-placement^=right] .popper__arrow {
        top: 50%;
        left: -6px;
        margin-bottom: 3px;
        border-right-color: #EBEEF5;
        border-left-width: 0
    }
    .yd-popover[x-placement^=right] .popper__arrow::after {
        bottom: -6px;
        left: 1px;
        border-right-color: #FFF;
        border-left-width: 0
    }
    .yd-popover[x-placement^=left] {
        margin-right: 12px
    }
    .yd-popover[x-placement^=left] .popper__arrow {
        top: 50%;
        right: -6px;
        margin-bottom: 3px;
        border-right-width: 0;
        border-left-color: #EBEEF5
    }
    .yd-popover[x-placement^=left] .popper__arrow::after {
        right: 1px;
        bottom: -6px;
        margin-left: -6px;
        border-right-width: 0;
        border-left-color: #FFF
    }
</style>

