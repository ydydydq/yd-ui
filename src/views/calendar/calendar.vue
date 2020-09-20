<template>
  <div>
    <div class="werp">
      <header>
        <span class="date-left">{{num + "号"}} {{day}}</span>
        <div class="date-right">
          <span class="btn-left" @click="handlePrevMonth()">&lt;</span>
          <span>{{year}} {{month+1 + "月"}}</span>
          <span class="btn-right">&gt;</span>
        </div>
      </header>
      <div class="main">
        <ul class="weekday">
          <li v-for="(item,index) in weeks" :key="index">{{item}}</li>
        </ul>
        <ul class="day">
          <li
            v-for="(item,index) in refreshDate"
            :key="index"
            :class="[{now:index==nowDayIndex},{ismonthDay:isMonth(item.date.getMonth())}]"
          >{{item.day}}</li>
        </ul>
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      month_run: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      date: new Date(),
    };
  },
  computed: {
    //获取当前年份
    year: function () {
      return this.date.getFullYear();
    },
    //获取当前月份
    month: function () {
      return this.date.getMonth();
    },
    //获取当前星期数
    day: function () {
      switch (this.date.getDay()) {
        case 0:
          return "星期天";
          break;
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
      }
      return;
    },
    //获取今天的号数
    num: function () {
      return this.date.getDate();
    },
    //获取这个月的的天数
    monthDay: function () {
      return this.daysMonth(this.month, this.year);
    },
    //获取第一天是星期几
    Startday: function () {
      return this.dayStart(this.month, this.year);
    },
    refreshDate: function () {
      //获取到的日期数组存到这里
      let calendatArr = [];
      //获取当月的第一天
      let utils = new Date(this.year, this.month, 1);
      //用当月的第一天减去 周几前面几天 这样就能得到上个月开始的天数 （当前月1号是周三，那么周一就是上个月的最后两天）
      let startTime = utils - (this.Startday - 1) * 24 * 60 * 60 * 1000;
      //然后得到所有的日期
      for (let i = 0; i < 35; i++) {
        calendatArr.push({
          date: new Date(startTime + i * 24 * 60 * 60 * 1000),
          year: this.year,
          month: this.month + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
        });
      }
      return calendatArr;
    },
    //获取当月1号的索引值，来判断当天的索引值
    nowDayIndex: function () {
      let nowDayIndex = this.my_day.indexOf(1);
      return this.num + nowDayIndex - 1;
    },

    //把日期存进数组
    my_day: function () {
      let my_days = [];
      for (let i = 0; i < 35; i++) {
        my_days.push(this.refreshDate[i].day);
      }
      return my_days;
    },
  },
  methods: {
    //获取数组里的月份
    isMonth: function (month) {
      if (month == this.month) {
        return false;
      }
      return true;
    },
    //返回这个月第一天是星期几
    dayStart: function (month, year) {
      let tmpDate = new Date(year, month, 1);
      return tmpDate.getDay();
    },
    //返回这个月的天数
    daysMonth: function (month, year) {
      let Monthdays = 0;
      if (year % 4 == 0) {
        Monthdays = this.month_run[month];
        return Monthdays;
      } else {
        Monthdays = this.month_normal[month];
        return Monthdays;
      }
    },
    // 上一个月
    handlePrevMonth() {
      let utils = new Date(this.year, this.month, 1);
      // let prevMonth = .getDate(this.year, this.month, 1);
      this.date.setMonth(utils.getMonth() - 1);
      this.month = 8;
      console.log(this.date.getMonth());
      // this.month = this.date.getmonth(prevMonth);
      console.log(this.date);
    },
  },
  mounted() {
    console.log(this.date);
  },
};
</script>





<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  color: #7e9dff;
}
.werp {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: #ecfffc;
  border-radius: 12px;
}
.date-right > span {
  margin: 0 8px;
}
.btn-right,
.btn-left {
  cursor: pointer;
}
header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  // font-weight: bold;
  border-bottom: 2px solid #7e9dff;
}
header > span,
.date-right {
  padding: 0 40px;
}

.weekday {
  display: flex;
  justify-content: space-between;
  padding: 0 55px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}
.weekday > li {
  width: 50px;
}
.day {
  display: flex;
  justify-content: space-between;
  padding: 0 55px;
  flex-wrap: wrap;
  text-align: center;
}
.day li {
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 3px 0;
}

.now {
  border-radius: 50px;
  background-color: blue;
  color: white;
}
.ismonthDay {
  color: #cccccc;
}
</style>