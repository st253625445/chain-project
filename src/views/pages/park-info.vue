<template>
  <div class="parkInfoPage" v-loading="parkLoading">
    <div class="parkTopInfo">
      <div class="title">{{ parkName | isNoData }}--园区画像</div>
      <div class="topInfo">
        <span>{{ parkName | isNoData }}</span>
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
        <span>
          园区类型：国家级
        </span>
        <span>
          电话：051-2333333
        </span>
        <span>
          地址：051-2333333
        </span>
        <span>
          主导产业：XXX
        </span>
        <span>
          园区面积：XXX
        </span>
        <span>
          所在城市：XXX
        </span>
      </div>
    </div>
    <template v-if="!parkLoading">
      <parkInfo :parkId="parkId" />
    </template>
  </div>
</template>
<script>
import parkInfo from "@/components/parkPage/parkInfo";
import mixin from "@/components/companyPage/mixin";
export default {
  data() {
    return {
      parkLoading: true,
      parkId: "",
      parkName: "",
      portraitData: {
        legalPerson: {}
      }
    };
  },
  mixins: [mixin],
  components: { parkInfo },
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
    this.getParkInfo();
  },
  mounted() {},
  methods: {
    // 获取数据
    getParkInfo() {
      this.parkLoading = false;
    },
    // 所属产业链跳转
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
    .topInfo {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      > span {
        margin-right: 80px;
        font-size: 14px;
        color: rgb(51, 51, 51);
        line-height: 34px;
      }
    }
  }
  .countBox {
    width: calc(100% + 6px);
    height: calc(100vh - 215px);
    padding: 20px 120px 30px 20px;
    overflow: scroll;
    .companyItemBox {
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
