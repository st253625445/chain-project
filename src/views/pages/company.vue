<template>
  <div class="companyPage" v-loading="companyLoading">
    <div class="companyTopInfo">
      <div class="title">{{ companyName | isNoData }}--企业画像</div>
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
    <div class="tabNav">
      <ul>
        <li
          v-for="(item, index) in tabData"
          :key="index"
          :class="{ active: index === tabIndexVal }"
          @click="tabChange(index)"
          v-show="!item.disable"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <template v-if="!companyLoading">
      <ListedInfo
        :companyId="companyId"
        v-if="!tabData[0].disable && tabIndexVal === 0"
      />
      <CompanyInfo
        :companyId="companyId"
        v-if="!tabData[1].disable && tabIndexVal === 1"
      />
    </template>
  </div>
</template>
<script>
import { getCompanyPortrait } from "@/api/getData";
import ListedInfo from "@/components/companyPage/listedInfo";
import CompanyInfo from "@/components/companyPage/companyInfo";
import mixin from "@/components/companyPage/mixin";
export default {
  data() {
    return {
      companyLoading: true,
      companyId: "",
      companyName: "",
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
    CompanyInfo
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
    if (query.companyId && query.companyName) {
      this.companyId = query.companyId;
      this.companyName = query.companyName;
    }
    getCompanyPortrait({ companyId: this.companyId })
      .then(res => {
        if (res.code === 200) {
          this.portraitData = res.data;
          if (res.data.companyCategory !== 1) {
            this.tabData[0].disable = true;
            this.tabIndexVal = 1;
          }
        }
        this.companyLoading = false;
      })
      .catch(rej => {
        console.log(rej);
        this.companyLoading = false;
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
.companyPage {
  width: 100%;
  .companyTopInfo {
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
  .tabNav {
    width: 100%;
    padding: 20px;
    ul {
      display: flex;
      width: 100%;
      height: 60px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.19);
      li {
        flex: 1;
        font-size: 16px;
        line-height: 60px;
        color: #666666;
        text-align: center;
        cursor: default;
        &:hover {
          color: #010101;
        }
        &.active {
          color: rgb(75, 97, 231);
        }
      }
    }
  }
  .countBox {
    width: calc(100% + 6px);
    height: calc(100vh - 300px);
    padding: 0 120px 30px 20px;
    overflow: scroll;
    .companyItemBox {
      width: 100%;
      background: #fff;
      padding-bottom: 15px;
      margin-bottom: 10px;
      .title {
        position: relative;
        width: 100%;
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
      }
      .el-table {
        padding: 0 20px;
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
        padding: 10px 20px;
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
        height: 35px;
        padding: 5px 10px;
        span {
          position: relative;
          display: block;
          width: 100%;
          font-size: 12px;
          line-height: 25px;
          color: #333333;
          text-align: center;
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
