<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-button @click="test1">基本使用</yd-button>
        </div>
        <div>
            <h2>不同样式</h2>
            <yd-button @click="test2" type="success">不同样式1</yd-button>&nbsp;&nbsp;
            <yd-button @click="test3" type="error">不同样式1</yd-button>
        </div>
        <div>
            <h2>自定义文字内容</h2>
            <yd-button @click="test4">自定义文字内容</yd-button>
        </div>
        <div>
            <h2>调节背景色与层级</h2>
            <yd-button @click="test5">调节背景色与层级</yd-button>
        </div>
        <div>
            <h2>页面可以存在滚动条</h2>
            <yd-button @click="test6">页面可以存在滚动条</yd-button>
        </div>
        <div>
            <h2>随意调节覆盖范围</h2>
            <yd-button @click="test7">随意调节覆盖范围</yd-button>
        </div>
        <div>
            <h2>指令的形式</h2>
            <yd-button @click="test8">点击打开/关闭</yd-button>
            <div v-yd-loading="checked"  class="box"></div>
        </div>
        <div>
            <h2>指令的形式---配置</h2>
            <yd-button @click="test9">点击打开/关闭</yd-button>
            <div v-yd-loading="checked1"
                 yd-loading-text="自定义文字内容"
                 yd-loading-type="3" yd-loading-background="#ffcdd2"
                 class="box"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "loading",
    data() {
      return {
        loading: null,
        checked: false,
        checked1: false
      }
    },
    methods: {
      test1() {
        this.loading = this.$YD_Loading();
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 3000)
      },
      test2() {
        this.loading = this.$YD_Loading({
          type: 2
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 3000)
      },
      test3() {
        this.loading = this.$YD_Loading({
          type: 3
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 3000)
      },
      test4() {
        this.loading = this.$YD_Loading({
          text: '自定义文字内容'
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 3000)
      },
      test5() {
        this.loading = this.$YD_Loading({
          text: '自定义文字内容',
          background: '#ffcdd2',
          zIndex: 5000
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 3000)
      },
      test6() {
        this.loading = this.$YD_Loading({
          text: '自定义文字内容',
          bodyScroll: true,
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 5000)
      },
      test7() {
        this.loading = this.$YD_Loading({
          text: '自定义文字内容',
          background: '#ffcdd2',
          left: '200px',
          top: '50px'
        });
        setTimeout(() => {
          this.loading.hideEvent();
          this.loading = null;
        }, 5000)
      },
      test8() {
        this.checked = !this.checked;
      },
      test9() {
        this.checked1 = !this.checked1;
      }
    }
  }
</script>

<style scoped>
    .box{
        width: 300px;
        height: 300px;
        background: #D1D1D1;
    }
</style>
