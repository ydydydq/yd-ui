<template>
    <div class="yd-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';
  export default {
    name: "YdCheckboxGroup",
    componentName: 'YdCheckboxGroup',
    mixins: [Emitter],
    props: {
      value: {},
      disabled: Boolean,
      label: {
        type: String,
        default: 'label'
      },
      isLabel: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(value) {
        // this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
  }
</script>


