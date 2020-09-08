<template>
    <div class="yd-badge">
        <slot></slot>
        <span v-show="!hidden && (content || content === 0 || isDot)"
              v-text="content"
              :class="['yd-badge__content--' + type, {'is-dot': isDot}]"
        class="yd-badge__content yd-flex-h-hC-vC"></span>
    </div>
</template>

<script>
  export default {
    name: "YdBadge",
    props: {
      value: [String, Number],
      type: {
        type: String,
        validator(val) {
          return ['primary', 'success', 'warning', 'info',].indexOf(val) > -1;
        }
      },
      max: Number,
      isDot: Boolean,
      hidden: Boolean,
    },
    computed: {
      content() {
        if (this.isDot) return;
        const value = this.value;
        const max = this.max;
        if (typeof value === 'number' && typeof max === 'number') {
          return max < value ? `${max}+` : value;
        }
        return value;
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../../src/theme/variables';
    .yd-badge{
        position: relative;
        vertical-align: middle;
        display: inline-block;
    }
    .yd-badge__content{
        position: absolute;
        top: 0;
        right: 10px;
        background-color: @color-error;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #FFFFFF;
        border-radius: 10px;
        font-size: 12px;
        color: #FFFFFF;
        z-index: 100;
        transform: translateX(100%) translateY(-50%);
    }
    .yd-badge__content.is-dot{
        right: 5px;
        height: 8px;
        width: 8px;
        padding: 0;
        border-radius: 50%;
    }
    .yd-badge__content--primary{
        background-color: @color-primary;
    }
    .yd-badge__content--success{
        background-color: @color-success;
    }
    .yd-badge__content--warning{
        background-color: @color-warning;
    }
    .yd-badge__content--info{
        background-color: @color-info;
    }

</style>
