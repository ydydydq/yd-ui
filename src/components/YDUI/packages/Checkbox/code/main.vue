<template>
    <label :style="{'marginRight': spacing}" class="yd-checkbox cursor">
        <span :class="{'is-checked': isChecked, 'is-disabled': isDisabled}" class="yd-checkbox-container yd-flex-h-hL-vC">
            <span class="yd-checkbox__input yd-flex-h-hC-vC">
                <span class="yd-checkbox__inn"></span>
                <input ref="ydCheckbox" @change="handleChangeEvent" v-model="model" :disabled="isDisabled" :name="name" :value="label" class="yd-checkbox__original" type="checkbox" >
            </span>
            <span class="yd-checkbox__label" v-if="$slots.default || label">
                <slot></slot>
                <template v-if="!$slots.default">{{showLabel}}</template>
            </span>
        </span>
    </label>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';
  export default {
    name: "YdCheckbox",
    componentName: 'YdCheckbox',
    mixins: [Emitter],
    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      spacing: {
        type: String,
        default: '30px'
      }
    },
    data() {
      return {
        selfModel: false,
        _checkboxGroup: {}
      }
    },
    computed: {
      showLabel() {
        if(this._checkboxGroup.isLabel) {
          return this.label[this._checkboxGroup.label];
        }else {
          return this.label;
        }
      },
      model: {
        get() {
          return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('YdCheckboxGroup', 'input', [val]);
          }else {
            this.$emit('input', val);
            this.selfModel = val;
          }
        }
      },
      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        }else if (Array.isArray(this.model)) {
          if(this._checkboxGroup.isLabel) {
            return this.model.some(item => item[this._checkboxGroup.label] === this.label[this._checkboxGroup.label])
          }
          return this.model.indexOf(this.label) > -1;
        }
      },
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'YdCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent; // 存放父组合
            return true;
          }
        }
        return false;
      },
      store() { // 主要来获取父值
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      },
      isDisabled() {
        return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
      },
    },
    methods: {
      handleChangeEvent(e) {
        this.$emit('changeEmit', this.value, e);
        this.$nextTick(() => {
          if (this.isGroup) {
            this.dispatch('YdCheckboxGroup', 'changeEmit', [this._checkboxGroup.value]);
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-checkbox{
        display: inline-block;
        margin-right: 30px;
    }
    .yd-checkbox-container{
        transition: all .15s ease-in;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        width: fit-content;
    }
    .yd-checkbox__input{
        width: 16px;
        height: 16px;
        border: 1px solid #DCDFE6;
        background: #FFF;
        border-radius: 2px;
        box-sizing: border-box;
        padding: 2px;
        position: relative;
    }
    .yd-checkbox__input .yd-checkbox__inn{
        width: 100%;
        height: 100%;
        background: #D1D1D1;
        position: relative;
        overflow: hidden;
    }
    .yd-checkbox__input .yd-checkbox__inn:after{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #D1D1D1;
        transform: scale(0);
        transition: all .15s ease-in;
    }
    .yd-checkbox__input .yd-checkbox__original{
        padding: 0;
        margin: 0;
        opacity: 0;
        outline: 0;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .yd-checkbox__label{
        padding-left: 10px;
        line-height: 1;
        user-select: none;
    }
    /*checked*/
    .yd-checkbox-container.is-checked{
        color: @color-primary;
    }
    .yd-checkbox-container.is-checked .yd-checkbox__inn:after{
        background: @color-primary;
        transform: scale(1);
    }
    /*disabled*/
    .yd-checkbox-container.is-disabled{
        cursor: no-drop;
        color: #D1D1D1;
    }
    .yd-checkbox-container.is-disabled .yd-checkbox__input{
        background: #F5F7FA;
    }
    .yd-checkbox-container.is-disabled .yd-checkbox__inn,
    .yd-checkbox-container.is-disabled .yd-checkbox__inn:after{
        background: transparent;
    }
    .yd-checkbox-container.is-disabled.is-checked .yd-checkbox__inn{
        background: #e0e0e0;
    }
</style>
