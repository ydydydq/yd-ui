<template>
    <div class="btns">
        <yd-button @click="test1">基本使用</yd-button>
        <yd-button @click="primary" type="primary" >信息</yd-button>
        <yd-button @click="success" type="success" >成功</yd-button>
        <yd-button @click="warning" type="warning" >警告</yd-button>
        <yd-button @click="error" type="error" >危险</yd-button>
        <yd-button @click="test2">5秒关闭</yd-button>
        <yd-button @click="test3">手动关闭</yd-button>
        <yd-button @click="test4">不会关闭</yd-button>
        <yd-button @click="test5">文字居中</yd-button>
    </div>
</template>

<script>
  export default {
    name: "message",
    methods: {
      test1() {
        this.$YD_Message('简单使用...')
      },
      primary() {
        this.$YD_Message({
          type: 'info',
          message: '信息...'
        })
      },
      success() {
        this.$YD_Message({
          type: 'success',
          message: '成功...'
        })
      },
      warning() {
        this.$YD_Message({
          type: 'warning',
          message: '警告...'
        })
      },
      error() {
        this.$YD_Message({
          type: 'error',
          message: '危险...'
        })
      },
      test2() {
        this.$YD_Message({
          duration: 5000,
          message: '5秒关闭...'
        })
      },
      test3() {
        this.$YD_Message({
          duration: 0,
          showClose: true,
          message: '不会关闭...'
        })
      },
      test4() {
        this.$YD_Message({
          duration: 0,
          message: '不会关闭...'
        })
      },
      test5() {
        this.$YD_Message({
          center: true,
          message: '文字居中'
        })
      }
    }
  }
</script>

<style scoped>
    .btns .yd-button{
        margin-right: 30px;
    }
</style>
