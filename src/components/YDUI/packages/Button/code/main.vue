<template>
    <button class="yd-button cursor"
            @click="handleClickEvent"
            :class="[
            'yd-button--' + type,
            size ? 'yd-button--' + size : '',
            {
                'is-disabled': disabled,
                'is-plain': plain,
                'is-round': round,
            }
    ]">
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
  export default {
    name: "YdButton",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      plain: Boolean,
      round: Boolean,
      disabled: Boolean,
      size: String,
    },
    methods: {
      handleClickEvent(e) {
        this.$emit('click', e);
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-button{
        white-space: nowrap;
        cursor: pointer;
        background: @bg-white;
        border: 1px solid @border-base;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        outline: none;
        padding: 10px 20px;
        box-sizing: border-box;
        text-align: center;
        -webkit-appearance: none;
        transition: .1s;
        color: @text-regular;
    }
    .yd-button--small {
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .yd-button--mini{
        padding: 5px 10px;
        font-size: 12px;
    }
    .yd-button--primary{
        color: @color-white;
        border-color: @color-primary;
        background: @color-primary;
    }
    .yd-button--success{
        color: @color-white;
        border-color: @color-success;
        background: @color-success;
    }
    .yd-button--error{
        color: @color-white;
        border-color: @color-error;
        background: @color-error;
    }
    .yd-button--warning{
        color: @color-white;
        border-color: @color-warning;
        background: @color-warning;
    }
    .yd-button--info{
        color: @color-white;
        border-color: @color-info;
        background: @color-info;
    }
    .yd-button--primary.is-plain{
        border-color: @color-primary;
        background: @color-primary-tint;
        color: @color-primary;
    }
    .yd-button--success.is-plain{
        border-color: @color-success;
        background: @color-success-tint;
        color: @color-success;
    }
    .yd-button--error.is-plain{
        border-color: @color-error;
        background: @color-error-tint;
        color: @color-error;
    }
    .yd-button--warning.is-plain{
        border-color: @color-warning;
        background:@color-warning-tint;
        color: @color-warning;
    }
    .yd-button--info.is-plain{
        border-color: @color-info;
        background:@color-info-tint;
        color: @color-info;
    }
    .yd-button.is-round{
        border-radius: 20px;
    }
    .yd-button.is-disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
    /*hover*/
    .yd-button:hover {
        color: @color-primary;
        border-color: @color-primary-deep;
        background-color: @color-primary-tint;
    }
    .yd-button--primary:hover{
        color: @color-white;
        border-color: @color-primary-deep;
        background-color: @color-primary-deep;
    }
    .yd-button--success:hover{
        color: @color-white;
        border-color: @color-success-deep;
        background-color: @color-success-deep;
    }
    .yd-button--error:hover{
        color: @color-white;
        border-color: @color-error-deep;
        background-color: @color-error-deep;
    }
    .yd-button--warning:hover{
        color: @color-white;
        border-color: @color-warning-deep;
        background-color: @color-warning-deep;
    }
    .yd-button--info:hover{
        color: @color-white;
        border-color: @color-info-deep;
        background-color: @color-info-deep;
    }
    .yd-button.is-plain:hover{
        border-color: @color-primary-deep;
        background: @bg-transparent;
    }
    .yd-button--primary.is-plain:hover{
        color: @color-white;
        border-color:  @color-primary;
        background: @color-primary;
    }
    .yd-button--success.is-plain:hover{
        color: @color-white;
        border-color:  @color-success;
        background: @color-success;
    }
    .yd-button--error.is-plain:hover{
        color: @color-white;
        border-color:  @color-error;
        background: @color-error;
    }
    .yd-button--warning.is-plain:hover{
        color: @color-white;
        border-color:  @color-warning;
        background: @color-warning;
    }
    .yd-button--info.is-plain:hover{
        color: @color-white;
        border-color:  @color-info;
        background: @color-info;
    }
    /*active*/
    .yd-button:active {
        transform: translateY(-2px);
    }
</style>
