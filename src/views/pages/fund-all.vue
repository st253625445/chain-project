<template>
  <div class="fundAllPage">
    <div class="seach-header">
      <span
        class="dropdown-link"
        @click="dropdownShow = !dropdownShow"
        v-clickoutside="dropdownOutClick"
      >
        {{ locationVal }}
        <i class="el-icon-arrow-down el-icon--right"></i>
        <i class="borderMask" v-if="dropdownShow"></i>
        <transition name="dropdown">
          <div class="dropdownBox" v-if="dropdownShow" @click.stop>
            <ul>
              <li v-for="(item, key, index) of locationData" :key="index">
                <span class="title">{{ key }}</span>
                <span
                  class="item"
                  v-for="(item2, index2) in item"
                  :key="index2"
                  @click="locationDropdownItemClick(item2)"
                  >{{ item2 }}</span
                >
              </li>
            </ul>
          </div>
        </transition>
      </span>
      <el-input
        placeholder="协会名称关键字"
        v-model="fundAllNameQ"
        class="fundAllNameSearch"
      >
        <el-button slot="append">搜索</el-button>
      </el-input>
    </div>
    <div class="fundAllTagsBox">
      <div class="tagsUl">
        <ul>
          <li class="active"><span>全部</span></li>
          <li v-for="(item, index) in locationList" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="title">地区</p>
      </div>
      <div class="tagsUl">
        <ul>
          <li class="active"><span>全部</span></li>
          <li v-for="(item, index) in industryList" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="title">产业</p>
      </div>
    </div>
    <div class="itemBox fundAllList">
      <p class="title">
        <span class="subTitle"
          >北京区域共计5支产业基金，投资实体
          <span class="blueSpan">10000</span> 家</span
        >
      </p>
      <div class="tableBox">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <el-table-column
            type="selection"
            width="85"
            label-class-name="selectLable"
          >
          </el-table-column>
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column label="产业基金名称">
            <template slot-scope="scope">
              <span @click="openInfoBox(scope.row)" class="pointerHover">{{
                scope.row.data1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="data2" label="注册资本（万元）">
          </el-table-column>
          <el-table-column prop="data3" label="币种"> </el-table-column>
          <el-table-column prop="data3" label="成立时间"> </el-table-column>
          <el-table-column prop="data3" label="投资实体总数"> </el-table-column>
          <el-table-column prop="data3" label="直接投资实体企业数">
          </el-table-column>
          <el-table-column prop="data3" label="间接投资实体企业">
          </el-table-column>
          <el-table-column label="投资谱系">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="100"
          layout="prev, pager, next, sizes, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
    <div
      class="fundAllInfoBox"
      v-if="infoBoxShow"
      v-clickoutside="closeInfoBox"
    >
      <div class="title">张江高科技园区</div>
      <div class="infoCount">
        <div>
          <p>
            截止2012年底，园区累计注册企业9164家；从业人员27万，本科学历以上占比超过60%。实现经营总收入4200亿元，同比增长13.5%；工业总产值2084亿元，同比增长19.75%；固定资产投资206亿元，同比增长1.93%；税收收入189.15亿元，同比增长10.6%。成为浦东发展的重要增长极。根据“2012年上海市开发区综合评价”，张江高科技园区再度蝉联综合排名第一，同时在创新发展和投资环境指标上也排名第一。
          </p>
          <p>
            经过20年的开发，园区构筑了生物医药创新链和集成电路产业链的框架。目前，园区建有国家上海生物医药科技产业基地、国家信息产业基地、国家集成电路产业基地、
          </p>
          <p>
            国家半导体照明产业基地、国家863信息安全成果产业化（东部）基地、国家软件产业基地、国家软件出口基地、国家文化产业示范基地、国家网游动漫产业发展基地等多个国家级基地。在科技创新方面，园区拥有多模式、多类型的孵化器，建有国家火炬创业园、国家留学人员创业园，一批新经济企业实现了大踏步的飞跃。“自我设计、自主经营、自由竞争”和“鼓励成功、宽容失败”的园区文化和创业氛围正逐渐形成。
          </p>
        </div>
      </div>
      <div class="submit" @click="closeInfoBox">确 定</div>
    </div>
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  data() {
    return {
      locationVal: "全国",
      dropdownShow: false,
      infoBoxShow: false,
      fundAllNameQ: "",
      locationList: [
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区",
        "东城区",
        "西城区",
        "朝阳区"
      ],
      industryList: [
        "快递",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备",
        "纺织",
        "家用电器",
        "电子元件",
        "集成电路研发设备"
      ],
      tableData: [
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        }
      ],
      locationData: {
        全国: ["全国", "京津冀"],
        直辖市: ["北京", "上海", "天津", "重庆"],
        华北: ["河北", "山西", "内蒙古"],
        华东: ["山东", "江苏", "安徽", "江西", "浙江", "福建", "台湾"],
        华中: ["湖北", "湖南", "河南"],
        华南: ["广东", "广西", "海南", "香港", "澳门"],
        西南: ["四川", "贵州", "云南", "西藏"],
        西北: ["陕西", "甘肃", "宁夏", "新疆", "青海"],
        东北: ["黑龙江", "吉林", "辽宁"]
      }
    };
  },
  directives: { Clickoutside },
  methods: {
    // 下拉外部点击隐藏下拉
    dropdownOutClick() {
      this.dropdownShow = false;
    },
    // 城市筛选点击
    locationDropdownItemClick(data) {
      this.locationVal = data;
      this.dropdownShow = false;
    },
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 排序改变
    sortChange(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 显示园区信息
    openInfoBox() {
      this.infoBoxShow = true;
    },
    // 园区信息外部点击隐藏
    closeInfoBox() {
      this.infoBoxShow = false;
    },
    // 链接投资谱系
    clickFn(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less">
.fundAllPage {
  position: relative;
  width: 100%;
  padding: 20px;
  .seach-header {
    display: flex;
    .dropdown-link {
      position: relative;
      width: 70px;
      height: 24px;
      text-align: center;
      padding-right: 15px;
      margin-right: 10px;
      color: #4b61e7;
      background: #fff;
      border: 1px solid #4b61e7;
      i {
        position: absolute;
        right: 5px;
        top: 5px;
      }
      .borderMask {
        position: absolute;
        left: 0;
        top: 21px;
        width: 100%;
        height: 3px;
        background: #fff;
        z-index: 3;
      }
    }
    .dropdownBox {
      position: absolute;
      left: -1px;
      top: 22px;
      width: 320px;
      height: auto;
      padding: 10px 20px;
      border: 1px solid #4b61e7;
      background: #fff;
      z-index: 2;
      ul {
        width: 100%;
      }
      li {
        position: relative;
        width: 100%;
        padding-left: 60px;
        text-align: left;
      }
      span {
        font-size: 14px;
        line-height: 32px;
      }
      span.item {
        display: inline-block;
        width: 25%;
        cursor: pointer;
      }
      span.title {
        position: absolute;
        left: 0;
        color: #000;
      }
    }
    .fundAllNameSearch {
      width: 300px;
      height: 24px;
      margin-bottom: 10px;
    }
    .el-input__inner {
      height: 24px;
      border-radius: 0;
    }
    .el-input-group__append {
      border-radius: 0;
      background-color: #4b61e7;
      border-color: #4b61e7;
      color: #fff;
    }
  }
  .fundAllTagsBox {
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #666666;
    background: #fff;
    border: 1px solid #eeeeee;
    .tagsUl {
      position: relative;
      width: 100%;
      padding: 0 20px 0 77px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        max-width: 110px;
        margin: 10px 7px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        span {
          padding: 0 9px;
        }
        &:hover,
        &.active {
          color: #fff;
          background: #4b61e7;
        }
      }
    }
    .title {
      position: absolute;
      width: 48px;
      text-align: justify;
      left: 20px;
      top: 10px;
      color: #000;
      &:after {
        content: "";
        display: inline-block;
        width: 100%;
      }
    }
  }
  .fundAllList {
    .tableBox {
      width: 100%;
      padding: 0 20px 20px;
    }
    .el-table .cell {
      text-align: center;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none;
    }
    .el-table th {
      background-color: #fbfbfb;
    }
    .cell.selectLable {
      > label {
        display: none;
      }
      &::before {
        content: "勾选";
      }
    }
    .el-pagination {
      text-align: center;
      padding-bottom: 20px;
    }
    .pointerHover {
      color: #4b61e7;
    }
  }
  .fundAllInfoBox {
    position: absolute;
    width: 600px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -200px;
    padding: 20px 40px 0;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
    cursor: default;
    .title {
      width: 100%;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
    }
    .infoCount {
      width: 100%;
      height: 270px;
      overflow: hidden;
      > div {
        width: calc(100% + 20px);
        height: 270px;
        padding-right: 20px;
        padding-bottom: 70px;
        overflow-y: scroll;
      }
      p {
        padding: 5px 0;
        font-size: 12px;
        line-height: 24px;
        text-indent: 2em;
        text-align: justify;
      }
    }
    .submit {
      position: absolute;
      width: 100%;
      height: 60px;
      left: 0;
      bottom: 0;
      font-size: 18px;
      color: rgb(75, 97, 231);
      line-height: 60px;
      text-align: center;
      box-shadow: 0px -40px 40px rgba(255, 255, 255);
    }
  }
}
</style>
