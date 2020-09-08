<template>
    <div  class="main-page">
        <div class="side-nav">
            <div v-for="(item, index) in YDUI" :key="index" @click="handleRouteEvent(item.path)"
                 :class="{'actived': $route.path === item.path}"
                 class="side-item">{{item.title}}</div>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
    name: "mian",
    data() {
      return {
        YDUI: [
          {title: '图标', path: '/main/icon'},
          {title: '按钮', path: '/main/button'},
          {title: '单选框', path: '/main/radio'},
          {title: '多选框', path: '/main/checkbox'},
          {title: '输入框', path: '/main/input'},
          {title: '开关', path: '/main/switch'},
          {title: '评分', path: '/main/rate'},
          {title: '标记', path: '/main/badge'},
          {title: '下拉选择器', path: '/main/select'},
          {title: '日期', path: '/main/icon1'},
          {title: '时间', path: '/main/icon1'},
          {title: '分页', path: '/main/pagination'},
          {title: '轮播', path: '/main/icon1'},
          {title: '折叠面板', path: '/main/collapse'},
          {title: '抽屉', path: '/main/icon1'},
          {title: '加载层-Loading', path: '/main/loading'},
          {title: '消息-Message', path: '/main/message'},
          {title: '通知-Notification', path: '/main/icon1'},
          {title: '确认框-Confirm', path: '/main/confirm'},
          {title: '弹窗-MessageBox', path: '/main/icon1'},
          {title: '对话框-Dialog', path: '/main/dialog'},
          {title: '文字提示-Tooltip', path: '/main/icon1'},
          {title: '自定义提示-Popover', path: '/main/popover'},
          {title: '空布局-Empty', path: '/main/empty'},
          {title: '返回顶部', path: '/main/backtop'},
        ]
      }
    },
    mounted() {
      console.log(this.YDUI.length);
    },
    methods: {
      handleRouteEvent(path) {
        if(path === this.$route.path) return;
        this.$router.push(path);
        document.documentElement.scrollTop = document.body.scrollTop =0;
      }
    }
  }
</script>

<style scoped>
    .main-page{
        display: flex;
        min-height: 100vh;
    }
    .side-nav{
        min-width: 200px;
        width: 200px;
        border-right: 1px solid #43afff;
    }
    .side-nav .side-item{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #666;
        cursor: pointer;
    }
    .side-nav .side-item:hover,
    .side-nav .side-item.actived{
        color: #43afff;
    }
    .main-content{
        box-sizing: border-box;
        padding: 20px 24px;
    }
</style>
