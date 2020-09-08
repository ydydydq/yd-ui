<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-rate v-model="value1"></yd-rate>
        </div>
        <div>
            <h2>禁止使用（只读）</h2>
            <yd-rate v-model="value2" disabled></yd-rate>
        </div>
        <div>
            <h2>其他icon</h2>
            <yd-rate v-model="value1" classIcon="bug"></yd-rate><br/>
            <yd-rate v-model="value1" classIcon="smile"></yd-rate>
        </div>
        <div>
            <h2>自定义数量</h2>
            <yd-rate v-model="value1" :max="10"></yd-rate><br/>
        </div>
    </div>
</template>

<script>
  export default {
    name: "rate",
    data() {
      return {
        value1: 0,
        value2: 2,
      }
    }
  }
</script>

<style scoped>

</style>
