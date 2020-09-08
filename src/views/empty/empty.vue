<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-empty></yd-empty>
        </div>
        <div>
            <h2>不同类型</h2>
            <yd-empty type="2"></yd-empty>
        </div>
        <div>
            <h2>自定义占有范围</h2>
            <yd-empty padding="60px 30px"></yd-empty>
        </div>
        <div>
            <h2>自定义文字</h2>
            <yd-empty text="自定义文字"></yd-empty>
        </div>
        <div>
            <h2>不显示文字</h2>
            <yd-empty :isText="false"></yd-empty>
        </div>
        <div>
            <h2>自定义图标大小</h2>
            <yd-empty :styles="{width: '128px', height: '82px'}"></yd-empty>
        </div>
        <div>
            <h2>自定义图标</h2>
            <yd-empty :image="require('../../assets/images/1.jpg')"></yd-empty>
        </div>
    </div>
</template>

<script>
  export default {
    name: "empty"
  }
</script>

<style scoped>

</style>
