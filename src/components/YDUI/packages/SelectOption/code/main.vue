<template>
    <div @click="selectOptionClickEvent"
         :title="currentLabel"
         :class="{'actived': itemSelected}"
         :d="itemSelected"
         class="yd-select-option yd-flex-h-hS-vC">
        <span class="yd-clamp-1">{{currentLabel}}</span>
        <b v-show="select.multiple && itemSelected" class="yd-select-option__icon"></b>
    </div>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';
  export default {
    name: "YdSelectOption",
    mixins: [Emitter],
    inject: ['select'],
    props: {
      value: {
        required: true
      },
      label: [String, Number],
    },
    computed: {
      isObject() {
        return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
      },
      currentLabel() {
        return this.label || (this.isObject ? '' : this.value);
      },
      currentValue() {
        return this.value === 0 ? this.value.toString() : this.value || this.label || '';
      },
      itemSelected() {
        if (this.select.multiple) {
          let arr = this.select.value;
          if(typeof arr === 'object') {
            return arr && arr.indexOf(this.currentValue) > -1;
          }
        } else {
          return this.select.value === this.currentValue;
        }
      },
    },
    watch: {
      value(val, oldVal) {
        if (typeof val === 'object' && typeof oldVal === 'object' && val === oldVal) {
          return;
        }
      }
    },
    created() {
      this.select.options.push(this);
    },
    methods: {
      selectOptionClickEvent() {
        if(this.currentValue === this.itemSelected) return;
        this.dispatch('YdSelect', 'optionClickEmit', [this, true]);
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-select-option{
        width: 100%;
        height: 36px;
        color: #606266;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease-in;
        box-sizing: border-box;
        padding: 0 12px;
    }
    .yd-select-option:hover{
        background: #f5f7fa;
    }
    .yd-select-option.actived{
        color: @color-primary;
    }
    .yd-select-option__icon{
        display: block;
        position: relative;
        min-width: 20px;
        height: 20px;
        margin-right: 2px;
    }
    .yd-select-option__icon::after{
        display: inline-block;
        content: ' ';
        width: 5px;
        height: 10px;
        border-color: @color-primary;
        border-style: solid;
        border-width: 0 1px 1px 0;
        transform: rotate(50deg);
        position: absolute;
        top: 50%;
        right: 6px;
        margin-top: -6px;
    }
</style>
