<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-switch v-model="value"></yd-switch><br/>
            <yd-switch v-model="value1"></yd-switch>
        </div>
        <div>
            <h2>禁止使用</h2>
            <yd-switch disabled v-model="value"></yd-switch><br/>
            <yd-switch disabled v-model="value1"></yd-switch>
        </div>
        <div>
            <h2>自定义颜色</h2>
            <yd-switch activeColor="#66BB6A" v-model="value"></yd-switch><br/>
            <yd-switch inactiveColor="#ef5350" v-model="value1"></yd-switch>
        </div>
        <div>
            <h2>文本描述</h2>
            <yd-switch activeText="哈哈哈哈" inactiveText="呵呵呵呵" v-model="value"></yd-switch><br/>
        </div>
        <div>
            <h2>自定义宽度</h2>
            <yd-switch width="54px" v-model="value"></yd-switch><br/>
            <yd-switch width="54px" v-model="value1"></yd-switch>
        </div>
    </div>
</template>

<script>
  export default {
    name: "yswitch",
    data() {
      return {
        value: true,
        value1: false
      }
    },
    watch: {
      value() {
        console.log(this.value)
      },
      value1() {
        console.log(this.value1)
      }
    }
  }
</script>

<style scoped>

</style>
