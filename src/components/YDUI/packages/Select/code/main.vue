<template>
    <div class="yd-select" v-clickoutside="handleClose">
        <div ref="comYdBox" @click.stop="toggleMenuEvent"
             @focus="handleFocus"
             :class="{'actived': visible && isOutline}"
             :style="styles"
             class="yd-select__box yd-flex-h-hS-vC">
            <div :title="selectedLabel" :class="{'yd-select__text--gray': !selectedLabel }"
                 class="yd-select__text yd-flex-1 yd-clamp-1">
                {{selectedLabel ? selectedLabel : placeholder}}
            </div>
            <b :class="{'actived': visible}" class="yd-select__arrow"></b>
        </div>
        <transition name="ani_yd-select-zoom">
            <div v-show="visible" class="yd-select__menu">
                <slot></slot>
                <div v-show="options.length === 0" class="yd-select__empty yd-flex-v-hC-vC">
                    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#D9D9D9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path></g></g></svg>
                    <span>暂无数据</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import {isEmpty} from '../../../src/utils/utils';
  import Clickoutside from '../../../src/utils/clickoutside';
  export default {
    name: "YdSelect",
    componentName: 'YdSelect',
    directives: {Clickoutside},
    props: {
      value: {
        required: true
      },
      isOutline: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      multiple: {
        type: Boolean,
        defalut: false
      },
      styles: {
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        options: [],
        visible: false,
        selectedLabel: '',
        isSilentBlur: false,
      }
    },
    provide() {
      return {
        'select': this
      };
    },
    created() {
      this.$on('optionClickEmit', this.optionClickEmit);
      this.$on('setSelected', this.setSelected);
    },
    mounted() {
      this.setSelected();
    },
    watch: {
      value(val, oldVal) {
        this.setSelected();
      },
      options() {
        this.setSelected();
      },
      visible() {
        if(this.visible) {
          this.$emit('focusEmit');
        }else {
          this.$emit('blurEmit');
        }
      }
    },
    methods: {
      handleClose() {
        this.visible = false;
      },
      handleFocus(event) {
        this.visible = true;
      },
      toggleMenuEvent() {
        this.visible = !this.visible;
      },
      blurEvent(e) {
        if(e.sourceCapabilities) { // 用这个排除非html下的元素触发的blur, 待优化, 这里可以直接用focusin/focusout这个方法, 就不用tabindex="-1", 当元素(或在其内的任意元素)获得焦点时发生 focusin 事件。
          setTimeout(() => {
            if (this.isSilentBlur) {
              this.isSilentBlur = false;
            } else {
              this.visible = false;
            }
          }, 100); // 防止child components 触发不了事件
        }
      },
      // 子组件选择后回调
      optionClickEmit(option, byClick) {
        if(this.multiple) { // 多选
          // label
          const newLabel = this.selectedLabel ? this.selectedLabel.split(',') : [];
          const optionLabelIndex = this.getValueIndex(newLabel, option.currentLabel);
          if (optionLabelIndex > -1) {
            newLabel.splice(optionLabelIndex, 1);
          }
          else {
            newLabel.push(option.currentLabel);
          }
          this.selectedLabel = newLabel.join(',');
          // value
          const newVal = (this.value || []).slice();
          const optionIndex = this.getValueIndex(newVal, option.currentValue);
          if (optionIndex > -1) {
            newVal.splice(optionIndex, 1);
          }
          else {
            newVal.push(option.currentValue);
          }
          this.$refs.comYdBox.focus();
          this.isSilentBlur = byClick;
          this.$emit('input', newVal);
          this.$emit('changeEmit', newVal, newLabel);
          this.$forceUpdate();
        }
        else { // 单选
          this.selectedLabel = option.currentLabel;
          let newVal = option.currentValue;
          this.$emit('input', newVal);
          this.$emit('changeEmit', newVal, this.selectedLabel);
          this.visible = false;
          this.$forceUpdate();
        }
        this.setSoftFocus();
      },
      setSoftFocus() {
        this.$refs.comYdBox.focus();
      },
      getValueIndex(arr = [], value) {
        return arr.indexOf(value);
      },
      // 主要处理初次绑定回显及提供给watch中解决异步初次绑定
      setSelected() {
        if(isEmpty(this.value)) {
          this.selectedLabel = '';
          return
        };
        let result = this.getOption(this.value);
        if(this.multiple) {
          let labels = [];
          result.forEach(item => {
            labels.push(item.label);
          });
          this.selectedLabel = labels.join(',');
        }else {
          this.selectedLabel = result.label;
        }
        this.$forceUpdate();
      },
      getOption(value) {
        if(!value) return;
        if(this.multiple) {
          if(typeof value !== 'object') return;
          let result = [];
          this.options.forEach(node => {
            if(value.includes(node.currentValue)) {
              result.push({value: node.currentValue, label: node.currentLabel})
            }
          });
          return result
        }
        else {
          let result = {
            value: value,
            label: ''
          };
          this.options.forEach(node => {
            if(value == node.currentValue) {
              result.label = node.currentLabel
            }
          });
          return result
        }
      },
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-select{
        position: relative;
        user-select: none;
    }
    .yd-select__box{
        width: 100%;
        min-width: 150px;
        height: 32px;
        background: #fff;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s ease-in;
        box-sizing: border-box;
        padding: 0 0 0 12px;
        border: 1px solid #DCDFE6;
        font-size: 13px;
        color: #303133;
    }
    .yd-select__box.actived{
        border: 1px solid @color-primary;
    }
    .yd-select__arrow{
        display: block;
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        transform: rotateZ(0);
        transition: transform .3s,-webkit-transform .3s;
    }
    .yd-select__arrow::after {
        display: inline-block;
        content: ' ';
        height: 7px;
        width: 7px;
        border-width: 0 2px 2px 0;
        border-color: #DCDFE6;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform-origin: center;
        position: absolute;
        top: 50%;
        right: 6px;
        margin-top: -6px;
    }
    .yd-select__arrow.actived{
        transform: rotateZ(-180deg);
    }
    .yd-select__text{
        overflow: hidden;
        width: 100px;
    }
    .yd-select__text--gray{
        color: #D1D1D1;
    }
    .yd-select__menu{
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 2001;
        background: #ffffff;
        width: 100%;
        max-height: 190px;
        border-radius: 5px;
        transform-origin: center top;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 6px 0;
    }
    .yd-select .yd-select__empty{
        position: relative;
        left: -7px;
        box-sizing: border-box;
        padding: 10px 0;
        font-size: 12px;
        color: #D1D1D1;
    }
    .yd-select .yd-select__empty svg{
        margin-bottom: 4px;
        width: 59px;
        height: 36px;
    }
    /*animate*/
    .ani_yd-select-zoom-enter-active, .ani_yd-select-zoom-leave-active {
        opacity: 1;
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
        transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
        transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
        transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
        -webkit-transform-origin: center top;
        transform-origin: center top
    }
    .ani_yd-select-zoom-enter, .ani_yd-select-zoom-leave-active {
        opacity: 0;
        -webkit-transform: scaleY(0);
        transform: scaleY(0)
    }
</style>
