<template>
    <transition name="ani_yd-loading-fade" @after-leave="handleAfterLeaveEvent">
        <!-- v-show: 这里一定要是v-show,不能是v-if,要不在指令的bind中是拿不到$el的 -->
        <div v-show="existDom"
             :style="{ backgroundColor: background || '',
             left,top,zIndex}"
             :class="[customClass]"
             class="yd-loading yd-flex-h-hC-vC">
            <div class="yd-loading__content yd-flex-v-hC-vC">
                <svg v-if="type == 1" class="yd-loading__circular" viewBox="25 25 50 50">
                    <circle class="yd-loading__circular-path" cx="50" cy="50" r="20" fill="none"/>
                </svg>
                <span v-if="type == 2" class="yd-loading__dot">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <span v-if="type == 3" class="yd-loading__dot-mult">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <span :class="{'yd-loading__text-mult': type == 3}" class="yd-loading__text" v-html="text"></span>
            </div>
        </div>
    </transition>
</template>

<script>
  import {addClass, removeClass} from '../../../src/utils/dom.js';
  import afterLeave from '../../../src/utils/after-leave.js';
  export default {
    name: 'YdLoading',
    data() {
      return {
        existDom: false,
        modal: true,
        type: 1, // 1, 2, 3
        background: null, // rgba(255, 255, 255, 0.8)
        text: '',
        customClass: '',
        bodyScroll: false,
        left: 0,
        top: 0,
        zIndex: 2000
      }
    },
    methods: {
      showEvent() {
        if(!this.bodyScroll) {
          let parent = document.body;
          addClass(parent, 'yd-loading-parent--hidden');
        }
        this.existDom = true;
      },
      hideEvent() {
        // elementui中的方法,排除v-show带来的多个dom
        afterLeave(this, _ => {
          if(!this.bodyScroll) {
            let parent = document.body;
            removeClass(parent, 'yd-loading-parent--hidden');
          }

          if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
          }
          this.$destroy();
        }, 300);

        this.existDom = false;
      },
      handleAfterLeaveEvent() {
        // 指令模式的时候可以通知到父级
        this.$emit('afterLeaveEmit');
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-loading{
        position: fixed;
        z-index: 2000;
        background-color: rgba(255, 255, 255, 0.8);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0;
        transition: opacity .3s;
    }
    .yd-loading__text{
        font-size: 17px;
        color: @color-primary;
        margin-top: 20px;
        font-family: cursive;
    }
    .yd-loading__text-mult{
        background-image: -webkit-linear-gradient(left, #43afff 30%,
        #7A57D1 60%,
        #4395ff 80%,
        #ED5485);
        color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }
    .yd-loading__circular {
        height: 50px;
        width: 50px;
        animation: loading-rotate 2s linear infinite;
    }
    .yd-loading__circular-path {
        -webkit-animation: loading-dash 1.5s ease-in-out infinite;
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2px;
        stroke: @color-primary;
        stroke-linecap: round
    }

    .yd-loading__dot,
    .yd-loading__dot-mult{
        animation:antRotate 1.2s infinite linear;
        transform:rotate(45deg);
        position:relative;
        display:inline-block;
        font-size:64px;
        width:56px;
        height:56px;
        box-sizing:border-box;
    }
    .yd-loading__dot i,
    .yd-loading__dot-mult i{
        width:20px;
        height:20px;
        position:absolute;
        display:block;
        background-color: #50C1E9;
        border-radius:100%;
        transform:scale(.75);
        transform-origin:50% 50%;
        opacity:.3;
        animation:antSpinMove 1s infinite linear alternate;
    }
    .yd-loading__dot i:nth-child(1),
    .yd-loading__dot-mult i:nth-child(1){
        top:0;
        left:0;
    }
    .yd-loading__dot-mult i:nth-child(1){
        background: #43afff;
    }
    .yd-loading__dot i:nth-child(2),
    .yd-loading__dot-mult i:nth-child(2){
        top:0;
        right:0;
        animation-delay:.4s;
    }
    .yd-loading__dot-mult i:nth-child(2){
        background: #7A57D1;
    }
    .yd-loading__dot i:nth-child(3),
    .yd-loading__dot-mult i:nth-child(3){
        right:0;
        bottom:0;
        animation-delay:.8s;
    }
    .yd-loading__dot-mult i:nth-child(3){
        background: #4395ff;
    }
    .yd-loading__dot i:nth-child(4),
    .yd-loading__dot-mult i:nth-child(4){
        bottom:0;
        left:0;
        animation-delay:1.2s;
    }
    .yd-loading__dot-mult i:nth-child(4){
        background: #ED5485;
    }

    @keyframes antRotate{
        to{
            -webkit-transform:rotate(405deg);
            transform:rotate(405deg)
        }
    }
    @keyframes antSpinMove{
        to{
            opacity:1
        }
    }
    .ani_yd-loading-fade-enter,
    .ani_yd-loading-fade-leave-active {
        opacity: 0
    }
    @keyframes loading-rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    @keyframes loading-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40px
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120px
        }
    }
</style>
