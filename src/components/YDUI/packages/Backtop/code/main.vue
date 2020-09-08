<template>
    <div class="yd-backtop cursor">
        <transition name="ani_yd-backtop-fade">
            <div @click="backtopEvent" v-show="isShow" id="backtopBox" class="yd-backtop__box">
                <img class="yd-backtop__icon" id="backtopIcon" :src="backTopIcon"/>
            </div>
        </transition>
    </div>
</template>

<script>
  import backTopIcon from '../images/backTopIcon.png';
  import backTopSelectIcon from '../images/backTopSelectIcon.png';
  export default {
    name: "YdBacktop",
    data() {
      return {
        backTopIcon,
        isShow: false,
        scrollTop: 0
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (this.scrollTop > 100) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      })
    },
    methods: {
      backtopEvent() {
        document.getElementById('backtopIcon').src = backTopSelectIcon;
        let backtopBox = document.getElementById('backtopBox');
        let bottomSize = 0;
        let opacitySize = 1;
        backtopBox.style.opacity = 1;
        setTimeout(() => {
          scrollToTop();
        }, 300);
        function scrollToTop() {
          bottomSize += 30;
          opacitySize -= 0.1;
          let sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          if (sTop > 10) {
            backtopBox.style.bottom = bottomSize + 'px';
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, sTop - sTop / 8);
          }else {
            document.getElementById('backtopIcon').src = backTopIcon;
            setTimeout(() => {
              backtopBox.style.bottom = 0;
            }, 200)
          }
        }
      }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', () => {});
    }
  }
</script>

<style scoped>
    .yd-backtop {
        position: fixed;
        z-index: 999;
        right: 1%;
        bottom: 8%;
        cursor: pointer;
    }
    .yd-backtop__box {
        margin-top: 18px;
        transition: 0.3s;
        opacity: 0.3;
        width: 50px;
        height: 50px;
        position: relative;
    }
    .yd-backtop__icon {
        width: 100%;
        height: 100%;
        transform: rotateZ(-45deg);
    }
    .yd-backtop__box:hover {
        opacity: 1;
        animation: rubberBand 1s;
    }
    .ani_yd-backtop-fade-leave-active,
    .ani_yd-backtop-fade-enter-active {
        transition: all .5s;
    }
    .ani_yd-backtop-fade-enter {
        opacity: 0;
        transform: translateY(40px);
    }
    .ani_yd-backtop-fade-leave-to {
        opacity: 0;
    }
    @keyframes rubberBand {
        0% {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            transform: scale3d(0.95, 1.05, 1);
        }
        75% {
            transform: scale3d(1.05, .95, 1);
        }
        100% {
            transform: scale3d(1, 1, 1);
        }
    }
</style>
