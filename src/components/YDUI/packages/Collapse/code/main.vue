<template>
    <div class="yd-collapse">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "YdCollapse",
    componentName: "YdCollapse",
    provide() {
      return {
        collapse: this
      }
    },
    props: {
      accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        activeNames: [].concat(this.value)
      }
    },
    watch: {
      value(value) {
        this.activeNames = [].concat(value);
      }
    },
    created() {
      this.$on('itemClickEmit', this.handleItemEmit);
    },
    methods: {
      setActiveNamesEvent(activeNames) {
        activeNames = [].concat(activeNames);
        let value = this.accordion ? activeNames[0] : activeNames;
        this.activeNames = activeNames;
        this.$emit('input', value);
        this.$emit('changeEmit', value);
      },
      handleItemEmit(item) {
        if(this.accordion) {
          this.setActiveNamesEvent(
            (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
              ? '' : item.name
          );
        }else {
          let activeNames = this.activeNames.slice(0);
          let index = activeNames.indexOf(item.name);
          if (index > -1) {
            activeNames.splice(index, 1);
          } else {
            activeNames.push(item.name);
          }
          this.setActiveNamesEvent(activeNames);
        }
      }
    }
  }
</script>

<style scoped>
    .yd-collapse{
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        user-select: none;
    }
</style>
