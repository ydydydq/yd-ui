<template>
  <transition name="ani_yd-confirm-fade">
    <div v-if="visible" :class="[{'yd-confirm__mask': modal}]" @click="hideEvent"
         class="yd-confirm yd-flex-h-hC-vC">
      <div @click.stop class="yd-confirm__wrapper">
        <div class="yd-confirm__head yd-flex-h-hL-vC">
          <span v-if="showTitle" class="yd-clamp-1" v-text="title"></span>
          <div @click="hideEvent()" class="yd-dialog__closebtn cursor">
            <div class="yd-dialog__closebtn-inn yd-flex-h-hC-vC">
              <span class="yd-dialog__closebtn--close yd-dialog__closebtn--fat"></span>
            </div>
          </div>
        </div>
        <div class="yd-confirm__text yd-flex-h-hC-vC">
          <p v-text="message" />
        </div>
        <div class="yd-flex-h-hC-vC">
          <button @click="hideEvent" v-text="cancelButtonText" class="yd-confirm__btn cursor" />
          <button @click="confirmEvent" v-text="confirmButtonText" class="yd-confirm__btn yd-confirm__btn--primary cursor" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "YdConfirm",
    data() {
      return{
        action: null, // 事件名称标识(confirm/cancel)
        visible: false,
        modal: false,
        title: '提示',
        message: '-----',
        showTitle: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
    },
    watch: {
      action() {
        this.callback(this.action);
      }
    },
    methods: {
      showEvent() {
        this.visible = true;
      },
      hideEvent() {
        this.visible = false;
        this.action = 'cancel';
      },
      confirmEvent() {
        this.visible = false;
        this.action = 'confirm';
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../src/theme/variables';
  .yd-confirm{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 8888;
  }
  .yd-confirm.yd-confirm__mask{
    background: rgba(0, 0, 0, .3);
  }
  .yd-confirm__wrapper{
    width: 340px;
    min-height: 200px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(241,244,249,1);
    box-shadow:3px 4px 15px rgba(0,0,0,0.08);
    border-radius: 0 0 3px 3px;
    box-sizing: border-box;
    padding-bottom: 8px;
    position: relative;
  }
  .yd-confirm__head{
    width: 100%;
    height: 38px;
    background: #F1F4F9;
    box-sizing: border-box;
    padding: 0 12px;
    color: #333333;
    font-size: 13px;
    font-weight: bold;
    border-radius: 3px 0 0 0;
    position: relative;
  }
  .yd-confirm__text{
    font-size: 15px;
    line-height: 1.2;
    color: #333;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
    padding: 8px 12px;
    overflow: hidden;
    min-height: 100px;
  }
  .yd-confirm__text p{
    line-height: 1.2;
  }
  .yd-confirm__btn{
    width: 124px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 400;
    color: #333333;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
  }
  .yd-confirm__btn:active{
    transform: translateY(-2px);
  }
  .yd-confirm__btn--primary{
    background: @color-primary;
    color: #fff;
    margin-left: 20px;
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
  /*动画*/
  .ani_yd-confirm-fade-enter-active {
    animation: msgbox-fade-in .2s
  }
  .ani_yd-confirm-fade-leave-active {
    animation: msgbox-fade-out .2s
  }
  @keyframes msgbox-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }
  @keyframes msgbox-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }
</style>
