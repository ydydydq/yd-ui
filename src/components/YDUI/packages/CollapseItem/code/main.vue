<template>
    <div :class="{'is-disabled': disabled }" class="yd-collapse-item">
        <div @click="toggleEvent"
             :class="{'is-actived': isActived}"
             class="yd-collapse-item__head yd-flex-h-hS-vC cursor">
            <slot name="title">{{title}}</slot>
            <i :class="{'is-actived': isActived}" class="yd-collapse-item__arrow"></i>
        </div>
        <yd-collapse-transition>
            <div v-show="isActived" class="yd-collapse-item__wrap">
                <div class="yd-collapse-item__content">
                    <slot></slot>
                </div>
            </div>
        </yd-collapse-transition>
    </div>
</template>

<script>
  import YdCollapseTransition from '../../../src/transitions/collapse-transition';
  import Emitter from '../../../src/mixins/emitter';
  export default {
    name: "YdCollapseItem",
    componentName: "YdCollapseItem",
    mixins: [Emitter],
    inject: ['collapse'],
    components: { YdCollapseTransition },
    props: {
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      title: String,
      disabled: Boolean
    },
    data() {
      return {
        toggle: false,
      }
    },
    computed: {
      isActived() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },
    methods: {
      toggleEvent() {
        if (this.disabled) return;
        this.dispatch('YdCollapse', 'itemClickEmit', this);
        this.toggle = true;
      }
    }
  }
</script>

<style scoped>
    .yd-collapse-item:last-child {
        margin-bottom: -1px;
    }
    .yd-collapse-item__head{
        height: 48px;
        line-height: 48px;
        background-color: #FFFFFF;
        color: #606266;
        cursor: pointer;
        border-bottom: 1px solid #ebeef5;
        font-size: 13px;
        font-weight: 500;
        transition: border-bottom-color .3s;
    }
    .yd-collapse-item__arrow{
        width: 12px;
        height: 12px;
        position: relative;
        margin-right: 14px;
    }
    .yd-collapse-item__arrow:before{
        content: '';
        display: inline-block;
        width: 7px;
        height: 7px;
        border-top: 1px solid #909399;
        border-right: 1px solid #909399;
        transform: rotate(45deg);
        box-sizing: border-box;
        position: absolute;
        top: 3px;
        left: 0;
    }
    .yd-collapse-item__wrap{
        will-change: height;
        background-color: #fff;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #ebeef5;
    }
    .yd-collapse-item__content{
        padding-bottom: 25px;
        font-size: 13px;
        color: #303133;
    }
    /*actived*/
    .yd-collapse-item__head.is-actived {
        border-bottom-color: transparent;
    }
    .yd-collapse-item__arrow.is-actived {
         transform: rotate(90deg);
    }
    /*disabled*/
    .yd-collapse-item.is-disabled .yd-collapse-item__head {
        color: #bbb;
        cursor: not-allowed;
    }
</style>
