<template>
    <div class="yd-rate">
        <span v-for="(num, key) in max" :key="key"
              @mousemove="moveEvent(num, $event)"
              @mouseleave="leaveEvent"
              @click="selectEvent(num)"
              class="yd-rate__item cursor">
            <yd-icon :style="getIconStyleEvent(num)"
                     :class="[{ 'is-hover': hoverIndex === num }]"
                     class="yd-rate__icon" :icon-class="classIcon"></yd-icon>
        </span>
    </div>
</template>

<script>
  export default {
    name: "YdRate",
    data() {
      return {
        pointerAtLeftHalf: true,
        currentValue: this.value,
        hoverIndex: -1
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 5
      },
      disabled: Boolean,
      allowHalf: {
        type: Boolean,
        default: false
      },
      colors: {
        type: String,
        default: '#F7BA2A'
      },
      voidColor: {
        type: String,
        default: '#C6D1DE'
      },
      disabledVoidColor: {
        type: String,
        default: '#EFF2F7'
      },
      classIcon: {
        type: String,
        default: 'star'
      }
    },
    methods: {
      getIconStyleEvent(num) {
        const voidColor = this.disabled ? this.disabledVoidColor : this.voidColor;
        return {
          color: num <= this.currentValue ? this.colors : voidColor
        };
      },
      selectEvent(num) {
        if (this.disabled) return;
        if (this.allowHalf && this.pointerAtLeftHalf) {

        } else {
          this.$emit('input', num);
          this.$emit('changeEmit', num);
        }
      },
      moveEvent(num, event) {
        if (this.disabled) return;
        if(this.allowHalf) {

        }else {
          this.currentValue = num;
        }
        this.hoverIndex = num;
      },
      leaveEvent() {
        if (this.disabled) return;
        if (this.allowHalf) {

        }
        this.currentValue = this.value;
        this.hoverIndex = -1;
      }
    }
  }
</script>

<style scoped>
    .yd-rate__item{
        display: inline-block;
        cursor: pointer;
    }
    .yd-rate__icon{
        color: #c0c4cc;
        font-size: 20px;
        margin-right: 6px;
        transition: .3s;
    }
    /*hover*/
    .yd-rate__icon.is-hover{
        transform: scale(1.15);
    }
</style>
