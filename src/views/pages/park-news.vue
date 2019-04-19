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
    <div class="itemBox parkNewsBox" v-if="newTab === 0">
      <div>
        <div class="newsItem" v-for="(item, index) in newsList1" :key="index">
          <div>
            <img src="../../assets/img/noImg.png" alt="" />
            <p class="title">
              <a :href="item.url" target="_blank"> {{ item.title }}</a>
            </p>
            <span class="source">{{ item.source }}</span>
            <span class="time">{{ item.publishTime | timeFilter }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="itemBox parkNewsBox" v-if="newTab === 1">
      <div>
        <div class="newsItem" v-for="(item, index) in newsList2" :key="index">
          <div>
            <img src="../../assets/img/noImg.png" alt="" />
            <p class="title">
              <a :href="item.url" target="_blank"> {{ item.title }}</a>
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
export default {
  data() {
    return {
      newTab: 0,
      newsList1: [
        {
          id: "271272",
          nodeName: "轨交",
          title: "北京轨道交通 试行推出电子定期票",
          digest:
            "据北京市交通委透露,北京轨道交通1月20日起试行推出电子定期票,为乘客地铁出行增添新选择。 据了解,轨道交通电子定期票包括一日票、二日票、三日票、五日票及七日",
          url:
            "https://baijiahao.baidu.com/s?id=1623311543788140429&wfr=spider&for=pc",
          publishTime: "2019-01-21T22:42:58.000+0000",
          source: "百家号",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "271282",
          nodeName: "轨交",
          title: "年度投资盘点:基建补短板力度加大 轨道交通是新年发力重点",
          digest:
            "去年下半年以来,随着“补短板”的推进,固定资产投资增速也保持缓中趋稳的态势。 国家统计局21日发布的数据显示,2018年全年全国固定资产投资(不含农户)635636亿元,比",
          url:
            "https://baijiahao.baidu.com/s?id=1623278341118407018&wfr=spider&for=pc",
          publishTime: "2019-01-21T13:55:00.000+0000",
          source: "第一财经",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "271285",
          nodeName: "轨交",
          title: "年度投资盘点:加大基建补短板力度 发力轨道交通",
          digest:
            "年度投资盘点:基建补短板力度加大 轨道交通是新年发力重点 去年下半年以来,随着“补短板”的推进,固定资产投资增速也保持缓中趋稳的态势。 国家统计局21日发布的数据",
          url:
            "http://finance.sina.com.cn/roll/2019-01-21/doc-ihrfqziz9796379.shtml",
          publishTime: "2019-01-21T13:50:00.000+0000",
          source: "新浪",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "271287",
          nodeName: "轨交",
          title: "济南这个路口四个方向全部禁止左转!轨道交通施工,绕行攻略来了",
          digest:
            "1月21日,济南轨道交通集团发布《轨道交通施工交通组织通告》。按照济南市轨道交通整体施工部署,计划自2019年1月25日起对北园大街长途汽车站路段围挡进行调整。2019年",
          url:
            "https://baijiahao.baidu.com/s?id=1623277896876468136&wfr=spider&for=pc",
          publishTime: "2019-01-21T13:48:00.000+0000",
          source: "闪电新闻",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "271289",
          nodeName: "轨交",
          title: "轨交人民广场站通道齐聚百家“福”,行人纷纷驻足",
          digest:
            "这两天,走过轨交一号线人民广场地铁站15号口附近的通道,红色背景墙上100张由各行各业幻化而成的福字,使得路人纷纷驻足停留。 这一百个“福”字,蕴含着不同职业从",
          url:
            "https://baijiahao.baidu.com/s?id=1623276822725430267&wfr=spider&for=pc",
          publishTime: "2019-01-21T13:31:00.000+0000",
          source: "文汇报",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "271291",
          nodeName: "轨交",
          title: "2019江苏省暨苏州市青年志愿者服务春运“暖冬行动”启动",
          digest:
            "来自高校、公路、铁路、轨交、社会组织等各家单位14支志愿服务团队200余名青年志愿者参加了启动仪式。 本次活动由共青团江苏省委、江苏省文明办、江苏省春运办联合",
          url:
            "https://baijiahao.baidu.com/s?id=1623270024931148591&wfr=spider&for=pc",
          publishTime: "2019-01-21T12:17:00.000+0000",
          source: "中国江苏网",
          uploadTime: "2019-01-21T22:44:58.000+0000"
        },
        {
          id: "197173",
          nodeName: "轨交",
          title: "城铁和轨交换乘免安检 苏州火车站换乘通道试运行",
          digest:
            "1月18日起,换乘通道将试运行,乘坐城际列车到站的旅客换乘轨交出行时,可以不用出站再次接受安检,直接通过换乘通道验票出站。车站在站台、地下通道等醒目位置已增设",
          url:
            "https://baijiahao.baidu.com/s?id=1622964259809874965&wfr=spider&for=pc",
          publishTime: "2019-01-18T02:43:14.000+0000",
          source: "中国江苏网",
          uploadTime: "2019-01-18T07:43:14.000+0000"
        }
      ],
      newsList2: []
    };
  },
  filters: {
    timeFilter(val) {
      if (val) {
        return val.substring(0, 10);
      }
    }
  },
  methods: {
    changeTab(index) {
      this.newTab = index;
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
    min-height: calc(100vh - 170px);
    background: #fff;
    border: 1px solid #eeeeee;
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
  }
}
</style>
