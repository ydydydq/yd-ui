<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-radio v-model="sex" label="1" spacing="40px">男生</yd-radio>
            <yd-radio v-model="sex" label="2" spacing="40px">女生</yd-radio>
        </div>
        <div>
            <h2>禁止</h2>
            <yd-radio disabled v-model="sex" label="1" spacing="40px">男生</yd-radio>
            <yd-radio disabled v-model="sex" label="2" spacing="40px">女生</yd-radio>
        </div>
    </div>
</template>

<script>
  export default {
    name: "radio",
    data() {
      return {
        sex: 1
      }
    }
  }
</script>

<style scoped>

</style>
