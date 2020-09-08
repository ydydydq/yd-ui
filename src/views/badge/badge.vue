<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-badge :value="value">
                <yd-button @click="test" size="small">评论</yd-button>
            </yd-badge>
        </div>
        <div>
            <h2>不同类型</h2>
            <yd-badge :value="value" type="primary">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
            --------
            <yd-badge :value="value" :max="16" type="success">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
            --------
            <yd-badge :value="value" type="warning">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
            --------
            <yd-badge :value="value" type="info">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
        </div>
        <div>
            <h2>设置最大值---必须是数字</h2>
            <yd-badge :value="value" :max="10">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
        </div>
        <div>
            <h2>也可以输入其他文本</h2>
            <yd-badge value="New">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
            --------
            <yd-badge value="Hot">
                <yd-button size="small">评论</yd-button>
            </yd-badge>
        </div>
        <div>
            <h2>小红点</h2>
            <yd-badge isDot>
                <div>评论</div>
            </yd-badge>
            --------
            <yd-badge isDot>
                <yd-button size="small" type="primary">评论</yd-button>
            </yd-badge>
        </div>
    </div>
</template>

<script>
  export default {
    name: "badge",
    data() {
      return {
        value: 12
      }
    },
    methods: {
      test() {
        this.value++
      }
    }
  }
</script>

<style scoped>

</style>
