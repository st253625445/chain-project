<template>
  <div class="informationPage">
    <div class="typeBox">
      <div class="scorllBox">
        <div class="tabBox">
          <span class="title">分类</span>
          <ul>
            <li :class="{ active: typeTab === 0 }" @click="typeTabChange(0)">
              <span>新闻资讯</span>
            </li>
            <li :class="{ active: typeTab === 1 }" @click="typeTabChange(1)">
              <span>行业研究</span>
            </li>
            <li :class="{ active: typeTab === 2 }" @click="typeTabChange(2)">
              <span>政策法规</span>
            </li>
          </ul>
        </div>
        <div class="tabBox">
          <span class="title">节点</span>
          <ul>
            <li
              v-for="(item, index) in nodeList"
              :key="index"
              :class="{ active: nodeTab === index }"
              @click="nodeTabChange(index)"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="tipsBox">滑动鼠标，查看更多</div>
    </div>
    <div class="listBox">
      <div>
        <div class="newsItem" v-for="(item, index) in newsList" :key="index">
          <div>
            <img src="../../assets/img/noImg.png" alt="" />
            <p class="title">
              <a
                @click="getIndustryResearchFile(item.file)"
                v-if="typeTab === 1"
              >
                {{ item.title }}
              </a>
              <a :href="item.url" target="_blank" v-else> {{ item.title }}</a>
            </p>
            <span class="source">{{ item.source }}</span>
            <span class="time">{{ item.publishTime | timeFilter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  chainItemSearch,
  getNewsList,
  getResearchList,
  getPolicyList
} from "@/api/getData";
export default {
  data() {
    return {
      typeTab: 0,
      nodeTab: 0,
      nodeList: [],
      newsList: []
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
    if (query.chainId) {
      this.getNodeList(query.chainId);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    // 请求节点列表
    getNodeList(id) {
      this.typeTab = 0;
      this.nodeTab = 0;
      chainItemSearch({ id: id }).then(res => {
        if (res.code === 200) {
          this.nodeList = res.data.nodes;
          this.getNewsList();
        }
      });
    },
    // 请求新闻列表
    getNewsList() {
      let _opt = {
        name: this.nodeList[this.nodeTab],
        page: 1
      };
      if (this.typeTab === 0) {
        getNewsList(_opt).then(res => {
          this.newsList = res.data;
        });
      } else if (this.typeTab === 1) {
        getResearchList(_opt).then(res => {
          this.newsList = res.data;
        });
      } else if (this.typeTab === 2) {
        getPolicyList(_opt).then(res => {
          this.newsList = res.data;
        });
      } else {
        console.log("err");
      }
    },
    // 打开产业研究
    async getIndustryResearchFile(file) {
      if (file) {
        let routeData = this.$router.resolve({
          path: "/pdf",
          query: { file: file }
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$message.error("pdf文件打开失败");
      }
    },
    typeTabChange(index) {
      this.typeTab = index;
      this.getNewsList();
    },
    nodeTabChange(index) {
      this.nodeTab = index;
      this.getNewsList();
    }
  }
};
</script>
<style lang="less">
.informationPage {
  width: 100%;
  padding: 20px;
  .typeBox {
    position: relative;
    height: 120px;
    background: #fff;
    border: 1px solid #eeeeee;
    .scorllBox {
      height: 100px;
      padding: 15px 15px 0px;
      overflow-y: auto;
    }
    .tabBox {
      position: relative;
      width: 100%;
      padding-left: 60px;
      font-size: 12px;
      color: #666666;
      ul:after {
        content: "";
        display: block;
        clear: both;
      }
      li {
        float: left;
        width: 10%;
        margin-bottom: 10px;
        padding-right: 10px;
        span {
          display: block;
          float: left;
          max-width: 100%;
          padding: 0 10px;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        &.active {
          span {
            color: #ffffff;
            background: #4b61e7;
          }
        }
      }
    }
    .title {
      position: absolute;
      left: 5px;
      color: #000;
    }
    .tipsBox {
      opacity: 0;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      background: #fdf7d0;
      line-height: 20px;
      font-size: 12px;
      color: #bcb274;
      text-align: center;
    }
    &:hover {
      .tipsBox {
        opacity: 1;
      }
    }
  }
  .listBox {
    min-height: calc(100vh - 240px);
    background: #fff;
    border: 1px solid #eeeeee;
    margin-top: 20px;
    > div {
      display: flex;
      flex-wrap: wrap;
    }
    .newsItem {
      width: 50%;
      height: 130px;
      padding: 0 20px;
      > div {
        position: relative;
        height: 100%;
        border-bottom: 1px solid #eeeeee;
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
  }
}
</style>
