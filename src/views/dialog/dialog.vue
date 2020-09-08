<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <yd-button @click="visible1=true">基本使用</yd-button>
            <yd-dialog :visible.sync="visible1">
                <h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>自定义基本配置</h2>
            <yd-button @click="visible2=true">自定义基本配置</yd-button>
            <yd-dialog :visible.sync="visible2" title="我是自定义标题"
                       width="500px" height="500px" top="20px" :zIndex="5000">
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
                <h1>自定义标题、宽度、高度、偏移量、层级</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>不要蒙层</h2>
            <yd-button @click="visible3=true">不要蒙层</yd-button>
            <yd-dialog :visible.sync="visible3"
                       :modal="false">
                <h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>点击蒙层是否关闭</h2>
            <yd-button @click="visible4=true">点击蒙层是否关闭</yd-button>
            <yd-dialog :visible.sync="visible4"
                       :closeOnClickModal="false">
                <h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>生成页脚</h2>
            <yd-button @click="visible5=true">生成页脚</yd-button>
            <yd-dialog :visible.sync="visible5" :isFooter="true" height="500px"
                       @confirmEmit="confirmEmit" @closeEmit="closeEmit"
                       >
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>其他配置</h2>
            <yd-button @click="visible6=true">点击蒙层是否关闭</yd-button>
            <yd-dialog :visible.sync="visible6" :isFooter="true" cancelButtonText="自定义取消文字-且不自动关闭"
                       confirmButtonText="自定义确定文字"
                       bodyPadding="60px"
                       :noAutoCancel="true">
                <h1>调节内容的内边框</h1>
                <h1>调节内容的内边框</h1>
                <h1>调节内容的内边框</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>页面可以存在滚动条</h2>
            <yd-button @click="visible7=true">页面可以存在滚动条</yd-button>
            <yd-dialog :visible.sync="visible7"
                :bodyScroll="true"
                :beforeClose="test">
                <h1>我可以自定义内容用于展示</h1><h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
        <div>
            <h2>阻止默认关闭</h2>
            <yd-button @click="visible8=true">阻止默认关闭</yd-button>
            <yd-dialog :visible.sync="visible8" :isFooter="true"
                       :beforeClose="test" @confirmEmit="confirmEmit">
                <h1>我可以自定义内容用于展示</h1>
            </yd-dialog>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ydialog",
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false,
        visible6: false,
        visible7: false,
        visible8: false,
      }
    },
    methods: {
      confirmEmit() {
        console.log('点击了确定')
        this.visible8 = false
      },
      closeEmit() {
        console.log('点击了取消') // 待优化，触发了两次的？
      },
      test() {
        console.log('111')
      }
    }
  }
</script>

<style scoped>

</style>
