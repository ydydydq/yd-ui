<template>
  <div :class="[size, alignLabel]" class="yd-pagination">
    <span v-if="isShowTotal" class="yd-pagination__total">共&nbsp; {{total}} &nbsp;条</span>
    <div @click.stop="preAndNextEvent('pre')" class="yd-pagination__item yd-pagination__pre" title="上一页">上一页</div>
    <div @click.stop="choosePage(1)" :class="{'active': currentChoosePage == 1}" class="yd-pagination__item yd-pagination__page">1</div>
    <span @click.stop="moreClickEvent('pre')" v-if="totalPage>7 && showPrevMore" class="yd-pagination__more yd-flex-h-hC-vC">
      <span class="yd-pagination__more-box">
        <i class="yd-pagination__more-box__spot" />
        <i class="yd-pagination__more-box__spot" />
        <i class="yd-pagination__more-box__spot" />
      </span>
    </span>
    <div @click.stop="choosePage(middleFive.page1)" v-if="middleFive.page1" :class="{'active': middleFive.page1 == currentChoosePage}" v-text="middleFive.page1" class="yd-pagination__item yd-pagination__page" />
    <div @click.stop="choosePage(middleFive.page2)" v-if="middleFive.page2" :class="{'active': middleFive.page2 == currentChoosePage}" v-text="middleFive.page2" class="yd-pagination__item yd-pagination__page" />
    <div @click.stop="choosePage(middleFive.page3)" v-if="middleFive.page3" :class="{'active': middleFive.page3 == currentChoosePage}" v-text="middleFive.page3" class="yd-pagination__item yd-pagination__page" />
    <div @click.stop="choosePage(middleFive.page4)" v-if="middleFive.page4" :class="{'active': middleFive.page4 == currentChoosePage}" v-text="middleFive.page4" class="yd-pagination__item yd-pagination__page" />
    <div @click.stop="choosePage(middleFive.page5)" v-if="middleFive.page5" :class="{'active': middleFive.page5 == currentChoosePage}" v-text="middleFive.page5" class="yd-pagination__item yd-pagination__page" />
    <span @click.stop="moreClickEvent('next')" v-if="totalPage>7 && showNextMore" class="yd-pagination__more yd-flex-h-hC-vC">
      <span class="yd-pagination__more-box yd-pagination__more-box--right">
        <i class="yd-pagination__more-box__spot" />
        <i class="yd-pagination__more-box__spot" />
        <i class="yd-pagination__more-box__spot" />
      </span>
    </span>
    <div @click.stop="choosePage(totalPage)" v-if="totalPage && totalPage != 1" :class="{'active': totalPage == currentChoosePage}" class="yd-pagination__item yd-pagination__page" v-text="totalPage"></div>
    <div @click.stop="preAndNextEvent('next')" class="yd-pagination__item yd-pagination__next" title="下一页">下一页</div>
  </div>
</template>

<script>
  export default {
    name: "YdPagination",
    props: {
      value: {
        type: Number,
        default: 1,
      },
      pageSize: {
        default: 10
      },
      total: {
        required: true,
        default: 0
      },
      isShowTotal: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default'
      },
      align: {
        type: String,
        default: 'right'
      }
    },
    data() {
      return {
        totalPage: 0, // 总页数
        middleFive: { // 中间5个页数
          page1: '',
          page2: '',
          page3: '',
          page4: '',
          page5: '',
        },
        currentChoosePage: 1, //当前选中的页数
        showPrevMore: false,
        showNextMore: false,
      }
    },
    watch: {
      value: {
        handler: function() {
          if(this.value !== this.currentChoosePage) {
            this.currentChoosePage = this.value;
          }
        },
        immediate: true
      },
      currentChoosePage() {
        this.middleFivePage()
        this.moreEvent()
        this.$emit('pageChangeEmit', this.currentChoosePage)
      },
      total: {
        immediate: true,
        deep: true,
        handler (val){
          this.totalPage = Math.ceil(this.total/this.pageSize)
          this.middleFivePage()
          this.moreEvent()
        }
      }
    },
    computed: {
      alignLabel() {
        if(this.align === 'left')
          return 'yd-flex-h-hL-vC';
        else if(this.align === 'center')
          return 'yd-flex-h-hC-vC';
        else
          return 'yd-flex-h-hR-vC';
      }
    },
    methods: {
      choosePage(page) {
        this.currentChoosePage = page
      },
      // 展示更多
      moreEvent() {
        let showPrevMore = false;
        let showNextMore = false;
        const halfPagerCount = (7 - 1) / 2; // 7可以控制

        if (this.totalPage > 7) {
          if (Number(this.currentChoosePage) > 7 - halfPagerCount) {
            showPrevMore = true;
          }

          if (Number(this.currentChoosePage) < this.totalPage - halfPagerCount) {
            showNextMore = true;
          }
        }

        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;
      },
      moreClickEvent(msg) {
        let newPage = 1;
        if(msg === 'pre') {
          newPage = this.currentChoosePage - 5; // 这里5可以控制起来
          if(newPage <= 0) {
            newPage = 1;
          }
        }else if(msg === 'next') {
          newPage = this.currentChoosePage + 5;
          if(newPage > this.totalPage) {
            newPage = this.totalPage
          }
        }
        this.currentChoosePage = newPage;
      },
      // 上一页和下一页
      preAndNextEvent(msg) {
        if (msg === 'pre') {
          if(this.currentChoosePage > 1) {
            this.currentChoosePage--
          }
        }
        else if(msg === 'next') {
          if(this.currentChoosePage < this.totalPage) {
            this.currentChoosePage++
          }
        }
      },
      // 计算中间五页
      middleFivePage() {
        if(this.totalPage <= 7) { // 页数少的直接显示
          this.middleFive.page5 = this.totalPage-1 <= 1 ? '' : this.totalPage-1
          this.middleFive.page4 = this.totalPage-2 <= 1 ? '' : this.totalPage-2
          this.middleFive.page3 = this.totalPage-3 <= 1 ? '' : this.totalPage-3
          this.middleFive.page2 = this.totalPage-4 <= 1 ? '' : this.totalPage-4
          this.middleFive.page1 = this.totalPage-5 <= 1 ? '' : this.totalPage-5
        }
        else if(this.totalPage >= 7) { // 页数多的要分情况了
          if(this.currentChoosePage <= 4) { // 当前页为最前五页
            this.middleFive.page1 = 2
            this.middleFive.page2 = 3
            this.middleFive.page3 = 4
            this.middleFive.page4 = 5
            this.middleFive.page5 = 6
          }
          else if(this.currentChoosePage >= this.totalPage - 3) { // 当前页为最后五页
            this.middleFive.page1 = this.totalPage-5
            this.middleFive.page2 = this.totalPage-4
            this.middleFive.page3 = this.totalPage-3
            this.middleFive.page4 = this.totalPage-2
            this.middleFive.page5 = this.totalPage-1
          }
          else { // 当前页为中间
            this.middleFive.page1 = this.currentChoosePage-2
            this.middleFive.page2 = this.currentChoosePage-1
            this.middleFive.page3 = this.currentChoosePage
            this.middleFive.page4 = this.currentChoosePage+1
            this.middleFive.page5 = this.currentChoosePage+2
          }
        }
        // 处理删除的时候,有可能造成总页数比当前选中的页数小,这时候选中的页面应该要进一才对,且要排除当前选中的页数为一的情况
        if(this.currentChoosePage != 1 && this.totalPage < this.currentChoosePage) {
          this.currentChoosePage--;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../src/theme/variables';
  .yd-pagination{
    user-select: none;
  }
  .yd-pagination__total{
    font-size: 14px;
    color: #777777;
    margin-right: 12px;
    white-space: nowrap;
  }
  .yd-pagination__item{
    width: fit-content;
    background: #e8e8e8;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 13px;
    color: #777777;
    cursor: pointer;
    min-width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  .yd-pagination__item:hover{
    color: @color-primary;
  }
  .yd-pagination__page{
    margin-right: 6px;
  }
  .yd-pagination__page.active{
    background: @color-primary;
    color: #fff;
  }
  .yd-pagination__pre{
    margin-right: 10px;
  }
  .yd-pagination__next{
    margin-left: 10px;
  }
  .yd-pagination__more{
    font-size: 15px;
    color: #777777;
    margin-right: 6px;
    width: 35px;
    height: 35px;
    background: #e8e8e8;
    border-radius: 3px;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    cursor: pointer;
  }
  .yd-pagination__more-box{
    display: block;
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    overflow: hidden;
  }
  .yd-pagination__more-box__spot{
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #777777;
    position: absolute;
    top: 10px;
    opacity: 1;
  }
  .yd-pagination__more-box__spot:nth-child(1) {
    left: 2px;
  }
  .yd-pagination__more-box__spot:nth-child(2) {
    left: 9px;
  }
  .yd-pagination__more-box__spot:nth-child(3) {
    right: 1px;
  }
  .yd-pagination__more:hover .yd-pagination__more-box{
    background: transparent;
  }
  .yd-pagination__more:hover .yd-pagination__more-box:before{
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid @color-primary;
    border-right: 1px solid @color-primary;
    transform: rotate(-135deg);
    box-sizing: border-box;
    position: absolute;
    top: 7px;
    left: 5px;
  }
  .yd-pagination__more:hover .yd-pagination__more-box:after{
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid @color-primary;
    border-right: 1px solid @color-primary;
    transform: rotate(-135deg);
    box-sizing: border-box;
    position: absolute;
    top: 7px;
    left: 11px;
  }
  .yd-pagination__more:hover .yd-pagination__more-box--right:before{
    left: 1px;
    transform: rotate(45deg);
  }
  .yd-pagination__more:hover .yd-pagination__more-box--right:after{
    left: 7px;
    transform: rotate(45deg);
  }
  .yd-pagination__more:hover .yd-pagination__more-box__spot{
    opacity: 0;
  }
  .yd-pagination div:nth-last-child(2){
    margin-right: 0;
  }

  /*small*/
  .yd-pagination.small .yd-pagination__total{
    font-size: 12px;
  }
  .yd-pagination.small .yd-pagination__item{
    font-size: 12px;
    padding: 0 6px;
    height: 30px;
    line-height: 30px;
    min-width: 30px;
  }
  .yd-pagination.small .yd-pagination__more{
    height: 30px;
    line-height: 30px;
    width: 30px;
  }
  .yd-pagination.small .yd-pagination__more-box{
    width: 18px;
    height: 18px;
  }
  .yd-pagination.small .yd-pagination__more-box__spot{
    top: 8px;
  }
  .yd-pagination.small .yd-pagination__more-box__spot:nth-child(2) {
    left: 8px;
  }
  .yd-pagination.small .yd-pagination__more:hover .yd-pagination__more-box:before{
    top: 6px;
  }
  .yd-pagination.small .yd-pagination__more:hover .yd-pagination__more-box:after{
    top: 6px;
  }
</style>
