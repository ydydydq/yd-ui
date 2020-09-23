<template>
  <div>
    <div class="werp">
      <header>
        <span class="date-left">{{new Date().getDate() + "号"}} {{week}}</span>
        <div class="date-right">
          <span class="btn-left" @click.stop="chooseMonth(dateData.month-1)">&lt;</span>
          <span>{{dateData.year}} {{dateData.month + "月"}}</span>
          <span class="btn-right" @click.stop="chooseMonth(dateData.month+1)">&gt;</span>
        </div>
      </header>
      <div class="main">
        <ul class="weekday">
          <li v-for="(item,index) in weeks" :key="index">{{item}}</li>
        </ul>
        <ul class="day">
          <li
            v-for="(item, index) in dateData.days"
            :key="index"
            :class="{'is-now': item.isCurrentDay === 0, 'is-not-cur-month': item.showMonth !== dateData.month}"
          >{{item.showDay}}</li>
        </ul>
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      dateData: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        days: [],
      },
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  created() {
    this.dateData = this.getMonthAllDay();
  },
  computed: {
    // 获取当前星期数
    week() {
      switch (new Date().getDay()) {
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
    }
  },
  methods: {
    // 获取每个月的天数，42天为一整体
    getMonthAllDay(year, month){
      let monthData = [];
      // 初始默认值
      if (!year || !month) {
        year = new Date().getFullYear();
        month = new Date().getMonth() + 1;
      }

      // 获取本月第一天和这天是星期几
      let curMonthFirstDay = new Date(year, month - 1, 1);
      let curMonthFirstDayWeek = curMonthFirstDay.getDay() === 0 ? 7 : curMonthFirstDay.getDay();
      year = curMonthFirstDay.getFullYear();
      month = curMonthFirstDay.getMonth() + 1;

      // 获取本月最后一天和这天是几号
      let curMonthLastDay = new Date(year, month, 0);
      let curMonthLastDayNum = curMonthLastDay.getDate();

      // 获取上个月最后一天和这天是几号
      let prevMonthLastDay = new Date(year, month - 1, 0); // month - 1:为原来的月份,0:可以变成一个月最后一天
      let prevMonthLastDayNum = prevMonthLastDay.getDate();

      // 计算补多少天为上个月的
      let prevMonthDayCount = curMonthFirstDayWeek - 1; // 设计本月1号为周四,则4-1 = 3,还要补三天

      for (let i = 0; i < 7 * 6; i++) {
        let date = i - prevMonthDayCount;
        let showDay = date;
        let showMonth = month;
        let showYear = year;

        // 天数越界处理
        if (date <= 0) {
          // 上一个月
          showDay = prevMonthLastDayNum + date;
          showMonth = month - 1;
        }
        else if (date > curMonthLastDayNum) {
          // 下个月
          showDay = showDay - curMonthLastDayNum;
          showMonth = month + 1;
        }

        // 月数越界处理
        if (showMonth <= 0) showMonth = 12;
        if (showMonth > 12) showMonth = 1;

        // 年数越界处理
        if (month === 12 && showMonth === 1) showYear = year + 1;
        if (month === 1 && showMonth === 12) showYear = year - 1;

        monthData.push({
          showYear,
          showMonth,
          showDay,
          date,
          isCurrentDay: this.compareDate(showYear + '/' + showMonth + '/' + showDay),
          isSaturday: new Date(showYear + '/' + showMonth + '/' + showDay).getDay() === 6 ? 1 : 0,
          isSunday: new Date(showYear + '/' + showMonth + '/' + showDay).getDay() === 0 ? 1 : 0
        })
      }
      return {
        year,
        month,
        days: monthData
      }
    },
    // 比较两个日期大小
    compareDate(date1, date2 = new Date(), compareTime = false) {
      let flag = null;
      if (!date1) {
        console.warn('请输入比较的日期');
        return;
      }
      if (!(date1 instanceof Date)) {
        date1 = new Date(date1.replace(/-/g, "\/"));
      }
      if (!(date2 instanceof Date)) {
        date2 = new Date(date2.replace(/-/g, "\/"));
      }
      // 不比较时间,只比较日期
      if (!compareTime) {
        date1 = new Date(date1.getFullYear() + '/' + (date1.getMonth() + 1) + '/' + date1.getDate());
        date2 = new Date(date2.getFullYear() + '/' + (date2.getMonth() + 1) + '/' + date2.getDate());
      }
      if (date1.getTime() < date2.getTime()) {
        flag = -1;
      } else if (date1.getTime() == date2.getTime()) {
        flag = 0;
      } else {
        flag = 1;
      }
      return flag;
    },
    // 选择月份
    chooseMonth(month) {
      if(month < 1) {
        this.dateData.year--;
        month = 1;
      }else if(month > 12) {
        this.dateData.year++;
        month = 12;
      }
      this.dateData.month = month;
      this.dateData = this.getMonthAllDay(this.dateData.year, this.dateData.month);
    }
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
  box-sizing: border-box;
  padding-bottom: 10px;
}
.day li {
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 3px 0;
}
.is-now {
  border-radius: 50px;
  background-color: blue;
  color: white;
}
.is-not-cur-month {
  color: #cccccc;
}
</style>
