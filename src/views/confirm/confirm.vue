<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-button @click="test">基本使用</yd-button>
        </div>
        <div>
            <h2>其他配置</h2>
            <yd-button @click="test1">其他配置</yd-button>
        </div>
        <div>
            <h2>打开蒙层</h2>
            <yd-button @click="test2">基本使用</yd-button>
        </div>
        <div>
            <h2>相关事件</h2>
            <yd-button @click="test3">相关事件</yd-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "confirm",
    methods: {
      test() {
        this.$YD_Confirm('提示语')
      },
      test1() {
        this.$YD_Confirm({
          title: '自定义标题',
          message: '哈哈',
          confirmButtonText: '按钮文字',
          cancelButtonText: '按钮文字'
        })
      },
      test2() {
        this.$YD_Confirm({
          modal: true
        })
      },
      test3() {
        this.$YD_Confirm('提示语').then(res => {
          alert(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
