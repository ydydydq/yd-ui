<template>
    <div class="yd-image">
        <!--一个占位，已插槽的形式的话能占满接收进来的全部内容-->
        <slot v-if="loading" name="placeholder">
            <div class="yd-image__placeholder"></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="yd-image__error">{{ '加载失败' }}</div>
        </slot>
        <img v-else class="yd-image__inner"
                v-bind="$attrs"
                v-on="$listeners"
                @click="clickEvent"
                :src="src"
                :style="imageStyle"
                :class="{ 'yd-image__inner--center': alignCenter, 'yd-preview cursor': preview}"
                >
        <template v-if="preview">
            <preview :z-index="zIndex" :initial-index="imageIndex" v-if="showViewer" :on-close="closeViewerEmit" :url-list="previewSrcList"/>
        </template>
    </div>
</template>

<script>
  import preview from './preview';
  // https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
  const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;
  // object-fit 属性值
  const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
  };
  // 记录页面的overflow属性
  let prevOverflow = '';
  export default {
    name: "YdImage",
    inheritAttrs: false, // 根组件不渲染属性($attrs)
    components: {preview},
    props: {
      src: String,
      fit: String,
      previewSrcList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      }
    },
    data() {
      return {
        loading: true, // 占位符
        error: false,
        imageWidth: 0,
        imageHeight: 0,
        showViewer: false, // 预览
        show: true, // 该值主要用于lazy
      }
    },
    computed: {
      imageStyle() {
        const { fit } = this;
        if (fit) {
          return isSupportObjectFit()
            ? { 'object-fit': fit }
            : this.compatibleObjectFitBehavior(fit);
        }
        return {}
      },
      alignCenter() {
        return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
      },
      preview() {
        const { previewSrcList } = this;
        return Array.isArray(previewSrcList) && previewSrcList.length > 0;
      },
      imageIndex() { // 图片索引
        let previewIndex = 0;
        const srcIndex = this.previewSrcList.indexOf(this.src);
        if (srcIndex >= 0) {
          previewIndex = srcIndex;
        }
        return previewIndex;
      }
    },
    watch: {
      src() {
        this.show && this.loadImage();
      }
    },
    mounted() {
      this.loadImage();
    },
    methods: {
      // 载入图片
      loadImage() {
        // 重置图片状态
        this.loading = true;
        this.error = false;

        // 创建好图片对象, 准备好相关后续操作
        const img = new Image();
        img.onload = e => this.handleLoad(e, img);
        img.onerror = this.handleError.bind(this);

        // 将相关属性给到图片对象
        Object.keys(this.$attrs)
          .forEach((key) => {
            const value = this.$attrs[key];
            img.setAttribute(key, value);
          });
        img.src = this.src;
      },
      handleLoad(e, img) {
        this.imageWidth = img.width;
        this.imageHeight = img.height;
        this.loading = false;
        this.error = false;
      },
      handleError(e) {
        this.loading = false;
        this.error = true;
        this.$emit('error', e);
      },
      // 兼容object-fit
      compatibleObjectFitBehavior(fit) {
        const { imageWidth, imageHeight } = this;
        const {
          clientWidth: containerWidth,
          clientHeight: containerHeight
        } = this.$el;

        if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

        const vertical = imageWidth / imageHeight < 1;

        if (fit === ObjectFit.SCALE_DOWN) {
          const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
          fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
        }

        switch (fit) {
          case ObjectFit.NONE:
            return { width: 'auto', height: 'auto' };
          case ObjectFit.CONTAIN:
            return vertical ? { width: 'auto' } : { height: 'auto' };
          case ObjectFit.COVER:
            return vertical ? { height: 'auto' } : { width: 'auto' };
          default:
            return {};
        }
      },
      // 点击图片行为
      clickEvent() {
        if (!this.preview) {
          return;
        }
        prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        this.showViewer = true;
      },
      // 关闭预览
      closeViewerEmit() {
        document.body.style.overflow = prevOverflow;
        this.showViewer = false;
      }
    }
  }
</script>

<style scoped>
    .yd-image {
        position: relative;
        display: inline-block;
        overflow: hidden
    }
    .yd-image__error, .yd-image__placeholder {
        background: #F5F7FA
    }
    .yd-image__error, .yd-image__inner, .yd-image__placeholder {
        width: 100%;
        height: 100%
    }
    .yd-image__error {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #C0C4CC;
        vertical-align: middle
    }
    .yd-image__inner {
        vertical-align: top
    }
    .yd-image__inner--center {
        position: relative;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: block
    }
    .yd-preview{
        cursor: pointer;
    }
</style>
