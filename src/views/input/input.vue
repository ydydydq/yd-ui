<template>
    <div>
        <div style="width: 200px;">
            <h2>基本使用</h2>
            <yd-input v-model="input" placeholder="请输入"></yd-input>
            {{input}}
        </div>
        <div style="width: 200px;">
            <h2>禁止使用</h2>
            <yd-input v-model="input2" placeholder="请输入" :disabled="true"></yd-input>
        </div>
        <div class="size">
            <h2>不同尺寸</h2>
            <yd-input  v-model="input" placeholder="请输入"></yd-input>
            <yd-input  size="medium" v-model="input" placeholder="请输入"></yd-input>
            <yd-input  size="small" v-model="input" placeholder="请输入"></yd-input>
            <yd-input  size="mini" v-model="input" placeholder="请输入" ></yd-input>
        </div>
        <div style="width: 200px;">
            <h2>可清空</h2>
            <yd-input v-model="input" placeholder="请输入" :clearable="true"></yd-input>
            {{input}}
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        input2: ''
      }
    }
  }
</script>

<style scoped>
    .size .yd-input{
        width: 180px;
        margin-right: 20px;
    }
</style>
