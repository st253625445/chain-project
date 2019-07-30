<template>
  <div class="parkInfoPage" v-loading="parkLoading">
    <div class="parkTopInfo">
      <div class="title">{{ parkName | isNoData }}--企业画像</div>
      <ul class="topInfoBox">
        <li>
          <span>{{ portraitData.regStatus | isNoData }}企业</span>
          <span>
            所属产业链:
            <span
              v-for="(item, index) in chainItems"
              @click="linkToChain(item)"
              class="linkSpan"
              :key="index"
            >
              {{ item.chainName | isNoData }}
              <span v-if="index < 4">,</span>
            </span>
          </span>
        </li>
        <li>
          <span
            >官网：
            <a
              :href="'http://' + portraitData.website"
              target="_blank"
              class="linkSpan"
            >
              {{ portraitData.website | isNoData }}
            </a>
          </span>
          <span></span>
        </li>
        <li>
          <span
            >法人代表：{{
              portraitData.legalPerson &&
                portraitData.legalPerson.name | isNoData
            }}</span
          >
          <span>所属集团：{{ portraitData.group | isNoData }}</span>
        </li>
        <li>
          <span>电话：{{ portraitData.phoneNumber | isNoData }}</span>
          <span>关联方图谱</span>
        </li>
        <li>
          <span>地址：{{ portraitData.regLocation | isNoData }}</span>
          <span></span>
        </li>
      </ul>
    </div>
    <template v-if="!parkLoading">
      <ListedInfo
        :parkId="parkId"
        v-if="!tabData[0].disable && tabIndexVal === 0"
      />
      <parkInfo
        :parkId="parkId"
        v-if="!tabData[1].disable && tabIndexVal === 1"
      />
      <JudicialRisk :parkId="parkId" v-if="1 === 2" />
    </template>
  </div>
</template>
<script>
import { getparkPortrait } from "@/api/getData";
import ListedInfo from "@/components/parkPage/listedInfo";
import parkInfo from "@/components/parkPage/parkInfo";
import JudicialRisk from "@/components/parkPage/judicialRisk";
import mixin from "@/components/parkPage/mixin";
export default {
  data() {
    return {
      parkLoading: true,
      parkId: "",
      parkName: "",
      tabData: [
        {
          text: "上市信息",
          disable: false
        },
        {
          text: "基本情况",
          disable: false
        },
        {
          text: "司法风险",
          disable: false
        },
        {
          text: "经营风险",
          disable: false
        },
        {
          text: "财务状况",
          disable: false
        },
        {
          text: "发展状况",
          disable: false
        },
        {
          text: "资产状况",
          disable: false
        },
        {
          text: "经营状况",
          disable: false
        }
      ],
      tabIndexVal: 0,
      portraitData: {
        legalPerson: {}
      }
    };
  },
  mixins: [mixin],
  components: {
    ListedInfo,
    parkInfo,
    JudicialRisk
  },
  computed: {
    chainItems: function() {
      if (this.portraitData.chainItemList) {
        return this.portraitData.chainItemList.slice(0, 5);
      }
      return [];
    }
  },
  created() {
    let query = this.$route.query;
    if (query.parkId && query.parkName) {
      this.parkId = query.parkId;
      this.parkName = query.parkName;
    }
    getparkPortrait({ parkId: this.parkId })
      .then(res => {
        if (res.code === 200) {
          this.portraitData = res.data;
          if (res.data.parkCategory !== 1) {
            this.tabData[0].disable = true;
            this.tabIndexVal = 1;
          }
        }
        this.parkLoading = false;
      })
      .catch(rej => {
        console.log(rej);
        this.parkLoading = false;
        this.portraitData = {
          legalPerson: {}
        };
      });
  },
  mounted() {},
  methods: {
    // 所有产业链跳转
    linkToChain(data) {
      if (data) {
        let _query = {
          chainId: data.chainId,
          nodeName: data.chainName
        };
        let routeData = this.$router.resolve({
          path: "/index",
          query: _query
        });
        window.open(routeData.href, "_blank");
      }
    },
    // tab切换
    tabChange(index) {
      console.log(index);
      this.tabIndexVal = index;
    }
  }
};
</script>
<style lang="less">
.parkInfoPage {
  width: 100%;
  .parkTopInfo {
    position: relative;
    width: 100%;
    height: 155px;
    padding: 20px;
    background: #fff;
    .title {
      font-size: 28px;
      color: rgb(1, 1, 1);
      line-height: 30px;
      margin-bottom: 20px;
    }
    .topInfoBox {
      display: flex;
      width: 100%;
      li {
        flex: 1;
        padding: 0 20px;
        font-size: 14px;
        color: rgb(51, 51, 51);
        line-height: 34px;
        > span {
          display: block;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .countBox {
    width: calc(100% + 6px);
    height: calc(100vh - 300px);
    padding: 0 120px 30px 20px;
    overflow: scroll;
    .parkItemBox {
      width: 100%;
      background: #fff;
      padding: 0 20px 15px;
      margin-bottom: 10px;
      .title {
        position: relative;
        width: calc(100% + 40px);
        margin-left: -20px;
        height: 56px;
        text-indent: 26px;
        font-size: 16px;
        line-height: 56px;
        color: rgb(0, 0, 0);
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 18px;
          height: 20px;
          width: 6px;
          background: #4b61e7;
        }
      }
      .el-row {
        text-indent: 26px;
        line-height: 30px;
        font-size: 14px;
        color: #333333;
        padding-right: 26px;
      }
      .el-col {
        text-indent: 0;
        padding-left: 26px;
        &.nopadding {
          flex: 1;
          padding-left: 0;
        }
      }
      .el-table {
        .el-table_1_column_1 {
          text-align: center;
        }
        th {
          color: #333333;
          font-weight: unset;
        }
        td {
          color: #798aa1;
        }
      }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none;
      }
      .el-table th {
        background-color: #fbfbfb;
      }
      .el-pagination {
        text-align: center;
      }
      p {
        font-size: 14px;
        color: rgb(51, 51, 51);
        padding: 10px 0;
        text-align: justify;
      }
    }
  }
  .sideNav {
    position: absolute;
    width: 90px;
    right: 20px;
    top: 255px;
    padding: 20px 0;
    background: #fff;
    ul {
      width: 80px;
      margin-left: 10px;
      border-left: 1px solid #eeeeee;
      > li {
        position: relative;
        width: 100%;
        padding: 5px 10px;
        span {
          position: relative;
          display: block;
          width: 100%;
          font-size: 12px;
          line-height: 25px;
          color: #333333;
          text-align: left;
          cursor: default;
          &:hover {
            background: #eeeeee;
            &::before {
              content: "";
              position: absolute;
              border: solid transparent;
              height: 0;
              width: 0;
              right: 100%;
              top: 7px;
              border-width: 5px;
              border-right-color: #eeeeee;
            }
          }
        }
        &::before {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          left: -4px;
          top: 14px;
          border: 1px solid #eeeeee;
          background: #fff;
        }
        &.active {
          span {
            color: #4b61e7;
          }
          &::before {
            content: "";
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            left: -4px;
            top: 14px;
            border: 1px solid #4b61e7;
            background: #fff;
          }
          &::after {
            content: "";
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            left: -2px;
            top: 16px;
            background: #4b61e7;
          }
        }
      }
    }
  }
  .toTopButton {
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: 40px;
    right: 16px;
    color: #cccccc;
    border: 1px solid #cccccc;
    text-align: center;
    font-size: 24px;
    &:hover {
      color: #4b61e7;
      border-color: #4b61e7;
    }
  }
}
</style>
