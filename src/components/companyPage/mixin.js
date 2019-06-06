export default {
  data() {
    return {
      itemBoxOffset: [],
      container: null
    };
  },
  filters: {
    // 数组,隔开
    textJoin: data => {
      if (data && data.length) {
        return data.join("，");
      } else {
        return "--";
      }
    },
    // 单位换算
    unitChange: val => {
      if (val || val == 0) {
        if (val >= 10000) {
          return `${(val / 10000).toFixed(2)}亿`;
        } else if (val >= 100000000) {
          return `${(val / 100000000).toFixed(2)}亿万`;
        } else {
          return `${(val - 0).toFixed(2)}万`;
        }
      } else {
        return "--";
      }
    },
    // 数字转千分位，无小数点
    rgxNumberNoFixed: (val, hasSymbol) => {
      if (val || val == 0) {
        if (isNaN(val)) {
          return val;
        }
        if (hasSymbol) {
          if (val >= 0) {
            return `+${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
          } else {
            val = val.toString().Substring(1);
            return `-${val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
          }
        }
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "--";
      }
    },
    // 百分比转换
    percentageChange: val => {
      if (val || val == 0) {
        if (isNaN(val)) {
          return val;
        }
        return `${((val - 0) * 100).toFixed(2)}%`;
      } else {
        return "--";
      }
    },
    // 无数据时显示 --
    isNoData: val => {
      if (val || val == 0) {
        return val;
      } else {
        return "--";
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 设置右侧跳转
    setNav() {
      this.$nextTick(() => {
        let jump = document.querySelectorAll(".companyItemBox");
        jump.forEach(item => {
          this.itemBoxOffset.push(item.offsetTop - jump[0].offsetTop);
        });
        let scrollBox = document.querySelectorAll(".countBox")[0];
        scrollBox.addEventListener("scroll", this.onScroll);
        this.container = scrollBox;
      });
    },
    // 侧边导航点击
    sideNavValChange(index) {
      // this.sideNavVal = index;
      let total = this.itemBoxOffset[index];
      let distance = this.container.scrollTop;
      let _this = this;
      // 平滑滚动，时长200ms，每10ms一跳，共20跳
      let step = total / 20;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 20;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          _this.container.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          _this.container.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          _this.container.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          _this.container.scrollTop = total;
        }
      }
    },
    // 滚动监听
    onScroll() {
      let scrolled = this.container.scrollTop;
      let _sh = this.container.scrollHeight;
      let _h = this.container.clientHeight;
      if (_sh - _h - scrolled === 0) {
        this.sideNavVal = this.itemBoxOffset.length - 1;
      } else {
        for (let i = 0; i < this.itemBoxOffset.length; i++) {
          if (
            i === this.itemBoxOffset.length - 1 &&
            scrolled >= this.itemBoxOffset[i]
          ) {
            this.sideNavVal = i;
            break;
          } else if (
            scrolled >= this.itemBoxOffset[i] &&
            scrolled < this.itemBoxOffset[i + 1]
          ) {
            this.sideNavVal = i;
            break;
          } else {
            continue;
          }
        }
      }
    },
    // 返回顶部
    toUpScroll() {
      this.sideNavValChange(0);
    }
  }
};
