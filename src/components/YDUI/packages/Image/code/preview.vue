<template>
    <transition name="viewer-fade">
        <div ref="ydPreview" tabindex="-1" class="yd-preview" :style="{'z-index': zIndex }">
            <div class="yd-preview__mask"></div>
            <!-- 关闭按钮 -->
            <span class="yd-preview__btn yd-preview__close" @click="hideEvent">
                <yd-icon class="yd-preview__icon" icon-class="close" />
            </span>
            <!-- 展示区 -->
            <div class="yd-preview__canvas">
                <img
                        v-for="(url, i) in urlList"
                        v-if="i === index"
                        ref="img"
                        class="el-image-viewer__img"
                        :key="url"
                        :src="currentImg"
                        :style="imgStyle"
                        @load="handleImgLoad"
                        @error="handleImgError"
                        @mousedown="handleMouseDown">
            </div>
            <!-- 操作区 -->
            <div class="yd-preview__btn yd-preview__actions">
                <div class="yd-preview__actions__inner">
                    <yd-icon @click.stop="handleActions('zoomOut')" icon-class="zoomout" class="yd-preview__actions__icon cursor"/>
                    <yd-icon @click.stop="handleActions('zoomIn')" icon-class="zoomin" class="yd-preview__actions__icon cursor" />
                    <yd-icon @click.stop="toggleModeEvent"  :icon-class="mode.icon" class="yd-preview__actions__icon cursor" />
                    <yd-icon @click="handleActions('anticlocelise')" icon-class="undo" class="yd-preview__actions__icon cursor" />
                    <yd-icon @click="handleActions('clocelise')" icon-class="redo" class="yd-preview__actions__icon cursor" />
                </div>
            </div>
            <!--左右箭头-->
            <template v-if="!isSingle">
                <span class="yd-preview__btn yd-preview__prev cursor"
                        :class="{ 'is-disabled': !infinite && isFirst }"
                        @click="prevEvent">
                  <yd-icon icon-class="left"/>
                </span>
                <span class="yd-preview__btn yd-preview__next cursor"
                      :class="{ 'is-disabled': !infinite && isLast }"
                      @click="nextEvent">
                  <yd-icon icon-class="right"/>
                </span>
            </template>
        </div>
    </transition>
</template>

<script>
  import { on, off } from '../../../src/utils/dom';
  import { isFirefox, rafThrottle } from '../../../src/utils/utils';
  const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
  // 模式
  const Mode = {
    CONTAIN: {
      name: 'contain',
      icon: 'expend'
    },
    ORIGINAL: {
      name: 'original',
      icon: 'scale'
    }
  };
  export default {
    name: "preview",
    props: {
      urlList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      },
      onSwitch: {
        type: Function,
        default: () => {}
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      onClose: {
        type: Function,
        default: () => {}
      },
    },
    data() {
      return {
        index: this.initialIndex,
        isShow: false,
        loading: false,
        mode: Mode.CONTAIN,
        infinite: true,
        transform: {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        }
      }
    },
    computed: {
      isFirst() {
        return this.index === 0;
      },
      isLast() {
        return this.index === this.urlList.length - 1;
      },
      currentImg() {
        return this.urlList[this.index];
      },
      imgStyle() {
        const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
        const style = {
          transform: `scale(${scale}) rotate(${deg}deg)`,
          transition: enableTransition ? 'transform .3s' : '',
          'margin-left': `${offsetX}px`,
          'margin-top': `${offsetY}px`
        };
        if (this.mode === Mode.CONTAIN) {
          style.maxWidth = style.maxHeight = '100%';
        }
        return style;
      },
      isSingle() {
        return this.urlList.length <= 1;
      }
    },
    watch: {
      index: {
        handler: function(val) {
          this.reset();
          this.onSwitch(val);
        }
      },
      currentImg(val) {
        this.$nextTick(_ => {
          const $img = this.$refs.img[0];
          if (!$img.complete) {
            this.loading = true;
          }
        });
      }
    },
    mounted() {
      this.deviceSupportInstall();
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      // 没明白能干什么
      this.$refs['yd-preview'].focus();
    },
    methods: {
      // 图片载入
      handleImgLoad(e) {
        this.loading = false;
      },
      // 图片载入失败
      handleImgError(e) {
        this.loading = false;
        e.target.alt = '加载失败';
      },
      // 图片监听键盘按键
      handleMouseDown(e) {
        if (this.loading || e.button !== 0) return;

        const { offsetX, offsetY } = this.transform;
        const startX = e.pageX;
        const startY = e.pageY;
        this._dragHandler = rafThrottle(ev => {
          this.transform.offsetX = offsetX + ev.pageX - startX;
          this.transform.offsetY = offsetY + ev.pageY - startY;
        });
        on(document, 'mousemove', this._dragHandler);
        on(document, 'mouseup', ev => {
          off(document, 'mousemove', this._dragHandler);
        });

        e.preventDefault();
      },
      // 关闭
      hideEvent() {
        this.deviceSupportUninstall();
        this.onClose();
      },
      // 切换模式
      toggleModeEvent() {
        if (this.loading) return;
        const modeNames = Object.keys(Mode);
        const modeValues = Object.values(Mode);
        const index = modeValues.indexOf(this.mode);
        const nextIndex = (index + 1) % modeNames.length;
        this.mode = Mode[modeNames[nextIndex]];
        this.reset();
      },
      // 上一张
      prevEvent() {
        if (this.isFirst && !this.infinite) return;
        const len = this.urlList.length;
        this.index = (this.index - 1 + len) % len;
      },
      // 下一张
      nextEvent() {
        if (this.isLast && !this.infinite) return;
        const len = this.urlList.length;
        this.index = (this.index + 1) % len;
      },
      // 放大缩小
      handleActions(action, options = {}) {
        if (this.loading) return;
        const { zoomRate, rotateDeg, enableTransition } = {
          zoomRate: 0.2,
          rotateDeg: 90,
          enableTransition: true,
          ...options
        };
        const { transform } = this;
        switch (action) {
          case 'zoomOut':
            if (transform.scale > 0.2) {
              transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
            }
            break;
          case 'zoomIn':
            transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
            break;
          case 'clocelise':
            transform.deg += rotateDeg;
            break;
          case 'anticlocelise':
            transform.deg -= rotateDeg;
            break;
        }
        transform.enableTransition = enableTransition;
      },
      // 重置模式的样式
      reset() {
        this.transform = {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        };
      },
      // 绑定键盘按钮事件
      deviceSupportInstall() {
        this._keyDownHandler = rafThrottle(e => {
          const keyCode = e.keyCode;
          switch (keyCode) {
            // ESC
            case 27:
              this.hideEvent();
              break;
            // SPACE
            case 32:
              this.toggleModeEvent();
              break;
            // LEFT_ARROW
            case 37:
              this.prevEvent();
              break;
            // UP_ARROW
            case 38:
              this.handleActions('zoomIn');
              break;
            // RIGHT_ARROW
            case 39:
              this.nextEvent();
              break;
            // DOWN_ARROW
            case 40:
              this.handleActions('zoomOut');
              break;
          }
        });
        this._mouseWheelHandler = rafThrottle(e => {
          const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
          if (delta > 0) {
            this.handleActions('zoomIn', {
              zoomRate: 0.015,
              enableTransition: false
            });
          } else {
            this.handleActions('zoomOut', {
              zoomRate: 0.015,
              enableTransition: false
            });
          }
        });
        on(document, 'keydown', this._keyDownHandler);
        on(document, mousewheelEventName, this._mouseWheelHandler);
      },
      // 解除键盘按钮事件
      deviceSupportUninstall() {
        off(document, 'keydown', this._keyDownHandler);
        off(document, mousewheelEventName, this._mouseWheelHandler);
        this._keyDownHandler = null;
        this._mouseWheelHandler = null;
      },
    }
  }
</script>

<style scoped>
    .yd-preview {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .yd-preview__mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000
    }
    .yd-preview__btn {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none
    }
    .yd-preview__close{
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 40px
    }
    .yd-preview__canvas {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .yd-preview__actions {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px;
    }
    .yd-preview__actions__inner{
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        font-size: 23px;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .yd-preview__actions__icon{
        cursor: pointer;
    }
    .yd-preview__next, .yd-preview__prev {
        top: 50%;
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff
    }
    .yd-preview__prev {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 40px
    }
    .yd-preview__next {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 40px;
        text-indent: 2px
    }
    .is-disabled{
        cursor: no-drop !important;
    }

    .viewer-fade-enter-active {
        -webkit-animation: viewer-fade-in .3s;
        animation: viewer-fade-in .3s
    }
    .viewer-fade-leave-active {
        -webkit-animation: viewer-fade-out .3s;
        animation: viewer-fade-out .3s
    }
    @-webkit-keyframes viewer-fade-in {
        0% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
    }
    @keyframes viewer-fade-in {
        0% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0
        }
        100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
    }
    @-webkit-keyframes viewer-fade-out {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
        100% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0
        }
    }
    @keyframes viewer-fade-out {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
        100% {
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
            opacity: 0
        }
    }
</style>
