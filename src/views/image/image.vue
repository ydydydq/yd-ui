<template>
    <div>
        <div>
            <h2>基本使用</h2>
            <div class="yd-flex-h-hL-vC">
                <div v-for="fit in fits" :key="fit" class="image-box yd-flex-v-hC-vC">
                    <span>{{fit}}</span>
                    <yd-image
                            style="width: 100px; height: 100px;"
                            :src="url"
                            :fit="fit"></yd-image>
                </div>
            </div>
        </div>
        <br/>
        <div>
            <h2>开启预览模式</h2>
            <div class="yd-flex-h-hL-vC">
                <yd-image
                        style="width: 100px; height: 100px;"
                        :src="url"
                        :fit="fit"
                        :preview-src-list="srcList"></yd-image>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  }
</script>

<style scoped>
    .image-box{
        margin-right: 30px;
    }
</style>
