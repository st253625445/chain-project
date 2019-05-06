<template>
  <div class="parkNewsPage">
    <div class="topTabs">
      <span
        class="leftTab"
        :class="{ active: newTab === 0 }"
        @click="changeTab(0)"
        >园区要闻</span
      >
      <span
        class="rightTab"
        :class="{ active: newTab === 1 }"
        @click="changeTab(1)"
        >园区政策</span
      >
    </div>
    <div
      class="itemBox parkNewsBox"
      v-show="newTab === 0"
      v-loading="loadingShow"
      ref="parkNewsBox1"
    >
      <div class="newsItem" v-for="(item, index) in newsList1" :key="index">
        <div>
          <img src="../../assets/img/noImg.png" alt="" />
          <p class="title">
            <a :href="item.href" target="_blank"> {{ item.title }}</a>
          </p>
          <span class="source">{{ item.source }}</span>
          <span class="time">{{ item.publishDate | timeFilter }}</span>
        </div>
      </div>
      <div class="scrollText" v-if="newsList1.length !== 0">{{ tips1 }}</div>
      <div class="noData" v-if="newsList1.length === 0 && !loadingShow">
        无数据！
      </div>
    </div>
    <div
      class="itemBox parkNewsBox"
      v-show="newTab === 1"
      v-loading="loadingShow"
      ref="parkNewsBox2"
    >
      <div class="newsItem" v-for="(item, index) in newsList2" :key="index">
        <div>
          <img src="../../assets/img/noImg.png" alt="" />
          <p class="title">
            <a :href="item.href" target="_blank"> {{ item.title }}</a>
          </p>
          <span class="source">{{ item.source }}</span>
          <span class="time">{{ item.publishDate | timeFilter }}</span>
        </div>
      </div>
      <div class="scrollText" v-if="newsList2.length !== 0">{{ tips2 }}</div>
      <div class="noData" v-if="newsList2.length === 0 && !loadingShow">
        无数据！
      </div>
    </div>
  </div>
</template>
<script>
import { getParkNewsPolicy } from "@/api/getData";
export default {
  data() {
    return {
      newTab: 0,
      loadingShow: true,
      parkId: 0,
      page1: 1,
      page2: 1,
      pageSize: 20,
      tips1: "努力加载中...",
      tips2: "努力加载中...",
      newsList1: [],
      newsList2: [],
      REQUIRE: true
    };
  },
  filters: {
    timeFilter(val) {
      if (val) {
        return val.substring(0, 10);
      }
    }
  },
  created() {
    let query = this.$route.query;
    this.parkId = query.parkId;
    this.getParkNewsPolicy();
  },
  mounted() {
    this.$refs.parkNewsBox1.addEventListener("scroll", this.scrollBottom);
    this.$refs.parkNewsBox2.addEventListener("scroll", this.scrollBottom);
  },
  methods: {
    changeTab(index) {
      this.newTab = index;
      if (this[`newsList${index + 1}`].length === 0) {
        this.getParkNewsPolicy();
      }
    },
    getParkNewsPolicy() {
      if (this.parkId) {
        let _opt = {
          id: this.parkId,
          type: this.newTab + 1,
          page: this[`page${this.newTab + 1}`],
          pageSize: this.pageSize
        };
        this.loadingShow = true;
        this.REQUIRE = false;
        getParkNewsPolicy(_opt)
          .then(res => {
            this[`newsList${_opt.type}`] = this[`newsList${_opt.type}`].concat(
              res.data.list
            );
            if (res.data.hasNextPage) {
              this[`tips${_opt.type}`] = "努力加载中...";
            } else {
              this[`tips${_opt.type}`] = "无更多数据";
            }
            this.$nextTick(() => {
              this.loadingShow = false;
              this.REQUIRE = true;
            });
          })
          .catch(rej => {
            this.loadingShow = false;
            this.REQUIRE = true;
            console.log(rej);
          });
      }
    },
    scrollBottom() {
      let _h = this.$refs[`parkNewsBox${this.newTab + 1}`].clientHeight;
      let _scrollTop = this.$refs[`parkNewsBox${this.newTab + 1}`].scrollTop;
      let allH = this.$refs[`parkNewsBox${this.newTab + 1}`].scrollHeight;
      if (
        _h + _scrollTop === allH &&
        this[`tips${this.newTab + 1}`] !== "无更多数据" &&
        this.REQUIRE
      ) {
        this[`page${this.newTab + 1}`] += 1;
        this.getParkNewsPolicy();
      }
    }
  }
};
</script>

<style lang="less">
.parkNewsPage {
  width: 100%;
  padding: 20px;
  .topTabs {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    > span {
      display: inline-block;
      width: 50%;
      text-align: center;
      font-size: 18px;
      color: rgb(75, 97, 231);
      line-height: 38px;
      border: 1px solid rgb(75, 97, 231);
      background: #fff;
      &.active {
        color: #fff;
        background: rgb(75, 97, 231);
      }
    }
  }
  .parkNewsBox {
    height: calc(100vh - 170px);
    background: #fff;
    border: 1px solid #eeeeee;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    .newsItem {
      width: 50%;
      height: 130px;
      padding: 0 20px;
      > div {
        position: relative;
        height: 100%;
        border-bottom: 1px solid #eeeeee;
        cursor: pointer;
      }
      img {
        position: absolute;
        width: 160px;
        height: 80px;
        top: 20px;
        left: 0;
      }
      p.title {
        position: absolute;
        width: calc(100% - 200px);
        top: 20px;
        left: 180px;
        font-size: 18px;
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        a {
          color: #333333;
          cursor: pointer;
          &:hover {
            color: #4b61e7;
          }
        }
      }
      .source {
        position: absolute;
        width: 100px;
        left: 180px;
        top: 80px;
        color: #798aa1;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        position: absolute;
        left: 300px;
        top: 80px;
        color: #798aa1;
        font-size: 14px;
      }
    }
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
    .scrollText {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
  }
}
</style>
