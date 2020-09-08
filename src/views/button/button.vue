<template>
    <div>
        <div class="buttons">
            <yd-button>默认按钮</yd-button>
            <yd-button type="primary">主要按钮</yd-button>
            <yd-button type="success">成功按钮</yd-button>
            <yd-button type="warning">警告按钮</yd-button>
            <yd-button type="error">危险按钮</yd-button>
            <yd-button type="info">信息按钮</yd-button>
        </div>
        <div class="buttons">
            <yd-button plain>默认按钮</yd-button>
            <yd-button type="primary" plain>主要按钮</yd-button>
            <yd-button type="success" plain>成功按钮</yd-button>
            <yd-button type="warning" plain>警告按钮</yd-button>
            <yd-button type="error" plain>危险按钮</yd-button>
            <yd-button type="info" plain>信息按钮</yd-button>
        </div>
        <div class="buttons">
            <yd-button round>圆角按钮</yd-button>
            <yd-button type="primary" round>主要按钮</yd-button>
            <yd-button type="success" round>成功按钮</yd-button>
            <yd-button type="warning" round>警告按钮</yd-button>
            <yd-button type="error" round>危险按钮</yd-button>
            <yd-button type="info" round>信息按钮</yd-button>
        </div>
        <div class="buttons">
            <yd-button size="small">中等按钮</yd-button>
            <yd-button type="primary" size="small">主要按钮</yd-button>
            <yd-button type="success" size="small">成功按钮</yd-button>
            <yd-button type="warning" size="small">警告按钮</yd-button>
            <yd-button type="error" size="small">危险按钮</yd-button>
            <yd-button type="info" size="small">信息按钮</yd-button>
        </div>
        <div class="buttons">
            <yd-button size="mini">小型按钮</yd-button>
            <yd-button type="primary" size="mini">主要按钮</yd-button>
            <yd-button type="success" size="mini">成功按钮</yd-button>
            <yd-button type="warning" size="mini">警告按钮</yd-button>
            <yd-button type="error" size="mini">危险按钮</yd-button>
            <yd-button type="info" size="mini">信息按钮</yd-button>
        </div>
        <div class="buttons">
            <yd-button disabled>禁用按钮</yd-button>
            <yd-button type="primary" disabled>主要按钮</yd-button>
            <yd-button type="success" disabled>成功按钮</yd-button>
            <yd-button type="warning" disabled>警告按钮</yd-button>
            <yd-button type="error" disabled>危险按钮</yd-button>
            <yd-button type="info" disabled>信息按钮</yd-button>
        </div>
    </div>

</template>

<script>
  export default {
    name: "buttont"
  }
</script>

<style scoped>
    .buttons{
        margin-bottom: 30px;
    }
    .buttons button{
        margin-right: 18px;
    }
</style>
