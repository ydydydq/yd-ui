<template>
    <label :style="{'marginRight': spacing}" class="yd-radio cursor">
        <span :class="{'is-checked': model == label, 'is-disabled': disabled}" class="yd-radio-container yd-flex-h-hL-vC">
            <span class="yd-radio__input yd-flex-h-hC-vC">
                <span class="yd-radio__inn"></span>
                <input @change="changeEvent" ref="ydRadio" v-model="model" :disabled="disabled" :name="name" :value="label" class="yd-radio__original" type="radio" >
            </span>
            <span class="yd-radio__label"><slot></slot></span>
        </span>
    </label>
</template>

<script>
  export default {
    name: "YdRadio",
    props: {
      value: {},
      label: {},
      name: {},
      disabled: Boolean,
      spacing: {
        type: String,
        default: '30px'
      }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
          this.$refs.ydRadio && (this.$refs.ydRadio.checked = this.model == this.label);
        }
      },
    },
    methods: {
      changeEvent() {
        this.$nextTick(() => {
          this.$emit('changeEmit', this.model);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-radio{
        display: inline-block;
        margin-right: 30px;
    }
    .yd-radio-container{
        transition: all .15s ease-in;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        width: fit-content;
    }
    .yd-radio__input{
        width: 16px;
        height: 16px;
        border: 1px solid #DCDFE6;
        background: #FFF;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 2px;
        position: relative;
    }
    .yd-radio__input .yd-radio__inn{
        width: 100%;
        height: 100%;
        background: #D1D1D1;
        border-radius: 100%;
        position: relative;
        overflow: hidden;
    }
    .yd-radio__input .yd-radio__inn:after{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #D1D1D1;
        transform: scale(0);
        border-radius: 100%;
        transition: all .15s ease-in;
    }
    .yd-radio__input .yd-radio__original{
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
    .yd-radio__label{
        padding-left: 10px;
        line-height: 1;
        user-select: none;
    }
    /*checked*/
    .yd-radio-container.is-checked{
        color: @color-primary;
    }
    .yd-radio-container.is-checked .yd-radio__inn:after{
        background: @color-primary;
        transform: scale(1);
    }
    /*disabled*/
    .yd-radio-container.is-disabled{
        cursor: no-drop;
        color: #D1D1D1;
    }
    .yd-radio-container.is-disabled .yd-radio__input{
        background: #F5F7FA;
    }
    .yd-radio-container.is-disabled .yd-radio__inn,
    .yd-radio-container.is-disabled .yd-radio__inn:after{
        background: transparent;
    }
    .yd-radio-container.is-disabled.is-checked .yd-radio__inn{
        background: #e0e0e0;
    }
</style>
