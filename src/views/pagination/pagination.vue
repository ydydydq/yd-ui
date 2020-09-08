<template>
    <div style="width: 800px;">
        <div class="page">
            <h2>基本使用</h2>
            <yd-pagination :total="total"></yd-pagination>
        </div>
        <div class="page">
            <h2>自定义开始页码</h2>
            <yd-pagination v-model="page" :total="total"></yd-pagination>
        </div>
        <div class="page">
            <h2>小型分页</h2>
            <yd-pagination size="small" :total="total"></yd-pagination>
        </div>
        <div class="page">
            <h2>展示总数</h2>
            <yd-pagination :isShowTotal="true" :total="total"></yd-pagination>
        </div>
        <div class="page">
            <h2>自定义每页显示条目个数</h2>
            <yd-pagination :isShowTotal="true" :total="total" pageSize="5"></yd-pagination>
        </div>
        <div class="page">
            <h2>不同对齐方向</h2>
            <yd-pagination :total="total"></yd-pagination><br/>
            <yd-pagination :total="total" align="left"></yd-pagination><br/>
            <yd-pagination :total="total" align="center"></yd-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
        page: 4,
        total: 100
      }
    }
  }
</script>

<style scoped>
    .page{
        width: 100%;
    }
</style>
