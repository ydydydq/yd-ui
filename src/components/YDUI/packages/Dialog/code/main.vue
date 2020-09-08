<template>
  <transition name="ani_yd-dialog-fade">
    <div v-show="visible" :style="{'z-index': zIndex}" class="yd-dialog yd-flex-h-hC-vC">
      <div :class="{'is-show': existDom, 'is-transparent': modal}" class="yd-dialog__mask"></div>
      <div class="yd-dialog__wrapper " @click.self="maskEvent">
        <div :style="{'margin-top': top, width: width}" :class="{'is-show': existDom}"
             class="yd-dialog__content" >
          <slot name="title">
            <div class="yd-dialog__head yd-flex-h-hS-vC">
              <h1 v-text="title"></h1>
              <div @click="closeEvent()" class="yd-dialog__closebtn cursor">
                <div class="yd-dialog__closebtn-inn yd-flex-h-hC-vC">
                  <span class="yd-dialog__closebtn--close yd-dialog__closebtn--fat"></span>
                </div>
              </div>
            </div>
          </slot>
          <div :style="{'padding': bodyPadding, 'height': height}" :class="{'is-height': height}" class="yd-dialog__body">
            <slot></slot>
          </div>
          <slot name="footer">
            <div v-if="isFooter" class="yd-dialog__footer yd-flex-h-hC-vC">
              <div @click="closeEvent('cancel')" class="yd-dialog__footer-btn yd-flex-h-hC-vC" v-text="cancelButtonText" />
              <div @click="confirmEvent" class="yd-dialog__footer-btn yd-dialog__footer-btn--primary yd-flex-h-hC-vC" v-text="confirmButtonText" />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {addClass, removeClass} from '../../../src/utils/dom.js';
  export default {
    name: 'ydDialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      modal: {
        type: Boolean,
        default: true
      },
      beforeClose: Function,
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      bodyScroll: {
        type: Boolean,
        default: false
      },
      top: {
        type: String,
        default: '15vh'
      },
      width: {
        type: String,
        default: '50%'
      },
      height: {
        type: String,
      },
      title: {
        type: String,
        default: '提示'
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      confirmButtonText: {
        type: String,
        default: '确定'
      },
      isFooter: {
        type: Boolean,
        default: false
      },
      bodyPadding: {
        type: String,
        default: '20px'
      },
      zIndex: {
        type: Number,
        default: 2003
      },
      noAutoCancel: { // 取消按钮不要自动关闭
        type: Boolean,
        default: false
      }
    },
    data() {
      return{
        existDom: false
      }
    },
    watch: {
      visible(val) {
        if (val) {
          if(!this.bodyScroll) {
            let parent = document.body;
            addClass(parent, 'yd-loading-parent--hidden');
          }
          setTimeout(() => {this.existDom = true;}, 200);
        }else {
          let parent = document.body;
          removeClass(parent, 'yd-loading-parent--hidden');
          if(!this.noAutoCancel) this.$emit('closeEmit');
        }
      }
    },
    methods: {
      // 确定
      confirmEvent() {
        this.$emit('confirmEmit');
      },
      // 蒙层
      maskEvent() {
        if (!this.closeOnClickModal) return;
        this.closeEvent();
      },
      // 关闭
      closeEvent(msg) {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hideEvent);
        } else {
          if(msg === 'cancel' && this.noAutoCancel) {
            this.cancelEvent();
          }else {
            this.hideEvent();
          }
        }
      },
      // 取消
      cancelEvent() {
        this.$emit('closeEmit');
      },
      // 隐藏
      hideEvent() {
        this.existDom = false;
        setTimeout(() => {
          if(!this.bodyScroll) {
            let parent = document.body;
            removeClass(parent, 'yd-loading-parent--hidden');
          }
          // sync语法糖: data.sync = 'val' => :data @update:data = 'newval=>val=newval'
          this.$emit('update:visible', false);
          if(!this.noAutoCancel) this.$emit('closeEmit');
        }, 300);
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../src/theme/variables';
  .yd-dialog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    z-index: 2003;
  }
  .yd-dialog__mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: transparent;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .yd-dialog__mask.is-show{
    opacity: 1;
  }
  .yd-dialog__mask.is-transparent{
    background: rgba(0, 0, 0, 0.72);
  }
  .yd-dialog__wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    margin: 0;
    padding-bottom: 15vh;
  }
  .yd-dialog__content{
    width: 50%;
    background: #fff;
    transition: all 0.3s ease-out;
    margin: 0 auto 0 auto;
    border-radius: 5px;
    box-shadow: 3px 4px 15px rgba(0, 0, 0, 0.08);
  }
  .yd-dialog__content:not(.is-show) {
    opacity: 0;
    transform:  rotateX(95deg);
  }
  .yd-dialog__content.is-show {
    opacity: 1;
  }
  .yd-dialog__head{
    width: 100%;
    height: 40px;
    background: #F1F4F9;
    border-radius: 5px 5px 0 0;
    position: relative;
    box-sizing: border-box;
    padding: 0 14px;
  }
  .yd-dialog__head h1{
    font-size: 13px;
    font-weight: bold;
    color: #303133;
    margin: 0;
  }
  .yd-dialog__body{
    box-sizing: border-box;
    padding: 20px;
  }
  .yd-dialog__body.is-height{
    overflow-x: hidden;
    overflow-y: auto;
  }
  .yd-dialog__footer{
    box-sizing: border-box;
    padding-bottom: 12px;
  }
  .yd-dialog__footer-btn{
    min-width: 124px;
    padding: 0 20px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 400;
    color: #333333;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
  }
  .yd-dialog__footer-btn.yd-dialog__footer-btn--primary{
    background: @color-primary;
    color: #fff;
    margin-left: 20px;
  }
  .yd-dialog__footer-btn:active{
    transform: translateY(-2px);
  }
  /*close button*/
  .yd-dialog__closebtn{
    position: absolute;
    top: -12px;
    right: -12px;
    width: 30px;
    height: 30px;
    background: #F1F4F9;
    border-radius: 50%;
    cursor: pointer;
    box-sizing: border-box;
    padding: 4px;
  }
  .yd-dialog__closebtn-inn{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #ffffff;
    box-sizing: border-box;
    padding: 3px;
  }
  .yd-dialog__closebtn--close{
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 100%;
    position: relative;
    transition: transform 0.5s;
  }
  .yd-dialog__closebtn--close:hover{
    transform: rotate(180deg);
  }
  .yd-dialog__closebtn--close::before,
  .yd-dialog__closebtn--close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 50%;
    background: #606266;
  }
  .yd-dialog__closebtn--close::before {
    transform: translate(-50%,-50%) rotate(45deg);
  }
  .yd-dialog__closebtn--close::after {
    transform: translate(-50%,-50%) rotate(-45deg);
  }
  .yd-dialog__closebtn--fat::before,
  .yd-dialog__closebtn--fat::after {
    border-radius: 100%;
  }
  /*hover*/
  .yd-dialog__closebtn--close:hover::before,
  .yd-dialog__closebtn--close:hover::after {
    background: @color-primary;
  }
  /*animate*/
  .ani_yd-dialog-fade-enter-active {
    -webkit-animation: msgbox-fade-in .3s;
    animation: msgbox-fade-in .3s
  }
  .ani_yd-dialog-fade-leave-active {
    -webkit-animation: msgbox-fade-out .3s;
    animation: msgbox-fade-out .3s
  }
  @keyframes msgbox-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }
  @keyframes msgbox-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }
</style>

