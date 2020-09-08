<template>
    <div :class="[
           size ? 'yd-input--' + size : '',
           {
             'is-disabled': disabled,
             'yd-input--suffix': $slots.suffix || clearable
           }
         ]"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false"
         class="yd-input cursor">
        <input
            class="yd-input__inner"
            v-bind="$attrs"
            :disabled="disabled"
            ref="input"
            @input="inputEvent"
            @focus="focusEvent"
            @blur="blurEvent"
            @change="changeEvent"
        >
        <span class="yd-input__suffix yd-flex-h-hC-vC"
              v-if="showClear">
            <yd-icon @click="clearEvent" title="清空" icon-class="close"/>
        </span>
    </div>
</template>

<script>
  export default {
    name: "YdInput",
    props: {
      value: [String, Number],
      disabled: Boolean,
      size: String,
      clearable: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        hovering: false,
        focused: false,
      }
    },
    computed: {
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
      showClear() {
        return this.clearable &&
          !this.disabled &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
      },
    },
    watch: {
      nativeInputValue() {
        this.setNativeInputValue();
      }
    },
    methods: {
      clearEvent() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clearEmit');
      },
      inputEvent(event) {
        this.$emit('input', event.target.value);
      },
      focusEvent(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      blurEvent(event) {
        this.focused = false;
        this.$emit('blur', event);
      },
      changeEvent(event) {
        this.$emit('change', event.target.value);
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-input{
        width: 100%;
        font-size: 14px;
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    .yd-input__inner{
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }
    .yd-input__inner:focus{
        border-color: @color-primary;
        outline: 0;
    }
    /*disabled*/
    .yd-input.is-disabled .yd-input__inner {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
    }
    /*size*/
    .yd-input--medium .yd-input__inner {
        height: 36px;
        line-height: 36px;
    }
    .yd-input--small .yd-input__inner {
        height: 32px;
        line-height: 32px;
    }
    .yd-input--mini .yd-input__inner {
        height: 28px;
        line-height: 28px;
    }
    /*suffix*/
    .yd-input--suffix .yd-input__inner {
        padding-right: 30px;
    }
    .yd-input__suffix{
        position: absolute;
        font-size: 14px;
        top: 0;
        right: 10px;
        height: 100%;
        color: #C0C4CC;
        text-align: center;
    }
    .yd-input__suffix:hover{
        color: @color-primary;
    }
</style>
