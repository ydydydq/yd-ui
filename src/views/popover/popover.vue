<template>
    <div>
        <div>
            <h2>基本使用</h2>

            <yd-popover>
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">点击我</yd-button>
            </yd-popover>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <yd-popover trigger="hover">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">hover我</yd-button>
            </yd-popover>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <yd-popover trigger="focus">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">focus我(按住)</yd-button>
            </yd-popover>
        </div>
        <div>
            <h2>出现的位置</h2>
            <yd-popover placement="top">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">点击我-上</yd-button>
            </yd-popover>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <yd-popover placement="bottom">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">点击我-下</yd-button>
            </yd-popover>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <yd-popover placement="left">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">点击我-左</yd-button>
            </yd-popover>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <yd-popover placement="right">
                <h1>内容</h1>
                <yd-button slot="reference" type="primary">点击我-右</yd-button>
            </yd-popover>
            <p>更多位置：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end</p>
        </div>
        <div>
            <h2>自定义标题</h2>
            <yd-popover title="自定义标题">
                <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                <yd-button slot="reference">点击我</yd-button>
            </yd-popover>
        </div>
        <div>
            <h2>显示简单的内容</h2>
            <yd-popover title="自定义标题" content="显示简单的内容">
                <yd-button slot="reference">点击我</yd-button>
            </yd-popover>
        </div>
        <div>
            <h2>不要按钮</h2>
            <yd-popover content="显示简单的内容" :isFooter="false">
                <yd-button slot="reference">点击我</yd-button>
            </yd-popover>
        </div>
        <div>
            <h2>不要小箭头</h2>
            <yd-popover title="自定义标题" content="显示简单的内容" :visibleArrow="false">
                <yd-button slot="reference">点击我</yd-button>
            </yd-popover>
        </div>
        <div>
            <h2>自定义宽度</h2>
            <yd-popover width="400px" title="自定义标题" content="显示简单的内容" cancelButtonText="取消" confirmButtonText="关闭">
                <yd-button slot="reference">点击我</yd-button>
            </yd-popover>
        </div>
    </div>
</template>

<script>
  export default {
    name: "popover"
  }
</script>

<style scoped>

</style>
