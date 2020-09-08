<template>
    <div class="yd-switch yd-flex-h-hL-vC"
         :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
         @click.prevent="switchEvent">
        <input
                class="yd-switch__input"
                type="checkbox"
                :disabled="switchDisabled"
                @change="changeEvent"
                ref="checkbox"
        >
        <span class="yd-switch__label yd-switch__label--left cursor"
              :class="{'is-checked': !checked}"
              v-if="inactiveText">
          {{ inactiveText }}
        </span>
        <span class="yd-switch__circle cursor" ref="circle" :style="{ width: width}"></span>
        <span class="yd-switch__label yd-switch__label--right cursor"
              :class="{'is-checked': checked}"
              v-if="activeText">
          {{ activeText }}
        </span>
    </div>
</template>

<script>
  export default {
    name: "YdSwitch",
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      width: {
        type: String,
        default: '44px'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
    },
    data() {
      return {

      }
    },
    watch: {
      checked() {
        this.$refs.checkbox.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBgColor();
        }
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled;
      }
    },
    mounted() {
      if (this.activeColor || this.inactiveColor) {
        this.setBgColor();
      }
      this.$refs.checkbox.checked = this.checked;
    },
    methods: {
      switchEvent() {
        !this.switchDisabled && this.changeEvent();
      },
      changeEvent() {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('changeEmit', val);
        this.$nextTick(() => {
          this.$refs.checkbox.checked = this.checked;
        });
      },
      setBgColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.circle.style.borderColor = newColor;
        this.$refs.circle.style.backgroundColor = newColor;
      },
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-switch{
        height: 20px;
        position: relative;
        width: fit-content;
    }
    .yd-switch__input{
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
        cursor: pointer;
    }
    .yd-switch__circle{
        margin: 0;
        display: inline-block;
        position: relative;
        width: 40px;
        height: 20px;
        border: 1px solid #dcdfe6;
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: #dcdfe6;
        cursor: pointer;
        transition: border-color .3s,background-color .3s;
        vertical-align: middle;
    }
    .yd-switch__circle:after {
        content: '';
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 100%;
        transition: all .3s;
        width: 16px;
        height: 16px;
        background-color: #fff;
    }
    .yd-switch__label{
        color: #606266;
        user-select: none;
        font-size: 14px;
        cursor: pointer;
        line-height: 1;
    }
    .yd-switch__label--left{
        margin-right: 10px;
    }
    .yd-switch__label--right{
        margin-left: 10px;
    }
    /*checked*/
    .yd-switch.is-checked .yd-switch__circle:after {
        left: 100%;
        margin-left: -17px;
    }
    .yd-switch.is-checked .yd-switch__circle{
        border-color: @color-primary;
        background-color: @color-primary;
    }
    .yd-switch__label.is-checked{
        color: @color-primary;
    }
    /*disabled*/
    .yd-switch.is-disabled .yd-switch__circle{
        cursor: not-allowed;
    }
    .yd-switch.is-disabled {
        opacity: .6;
    }
</style>
