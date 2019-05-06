<template>
  <div class="companyPage">
    <h1>暂未开发，敬请期待！</h1>
    <!-- <div class="companyTopInfo">
      <div class="title">{{ companyName }}--企业画像</div>
      <ul class="topInfoBox">
        <li><span>再营（开业）企业</span><span>所属产业链：银行</span></li>
        <li>
          <span>官网：http://www.cmbchina.com/</span
          ><span>所属产业园：深圳金融产业园</span>
        </li>
        <li><span>法人代表：李建红</span><span>所属集团：招行系</span></li>
        <li><span>电话：0755-83198888</span><span>关联方图谱</span></li>
        <li>
          <span>地址：深圳市福田区深南大道7088号招商银行大厦</span><span></span>
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
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="countBox">
      <div class="companyItemBox">
        <div class="title">股票详情</div>
        <el-row>
          <el-col :span="6">股票代码：600036</el-col>
          <el-col :span="6">总 市 值：7739.97亿元</el-col>
          <el-col :span="6">流通市值：6331.02亿元</el-col>
          <el-col :span="6">市 盈 率：104.6</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">上市类型：上交所主板A股</el-col>
          <el-col :span="6">上市日期：2002-04-09</el-col>
          <el-col :span="6">网上发日期：2002-03-27</el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">基本信息</div>
        <el-row>
          <el-col :span="12">公司全称：招商银行股份有限公司</el-col>
          <el-col :span="12">英文名称：China Merchants Bank Co., Ltd.</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">所属行业：银行</el-col>
          <el-col :span="6">上市曾用名：招商银行->G招行</el-col>
          <el-col :span="6">注册资本：252亿</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">管理人员数：37</el-col>
          <el-col :span="6">雇员人数：71765</el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">证券信息</div>
        <el-row>
          <el-col :span="12">A股代码：600036</el-col>
          <el-col :span="12">A股简称：招商银行</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">B股代码：--</el-col>
          <el-col :span="12">B股简称：--</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">H股代码：03968</el-col>
          <el-col :span="12">H股简称：招商银行</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">证券类别：上交所主板A股</el-col>
          <el-col :span="12">律师事务所：北京市君合(深圳)律师事务所</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >会计师事务所：德勤华永会计师事务所(特殊普通合伙)</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">重要人员</div>
        <el-row>
          <el-col :span="12">总 经 理：田惠宇</el-col>
          <el-col :span="12">法人代表：李建红</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">董 秘：王良</el-col>
          <el-col :span="12">董 事 长：李建红</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">证券事务代表：霍建军</el-col>
          <el-col :span="12"
            >独立董事：梁锦松,潘承伟,赵军,王仕雄,刘俏,李孟刚</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">联系信息</div>
        <el-row>
          <el-col :span="12">联系电话：0755-83198888</el-col>
          <el-col :span="12">联系电话：0755-83198888</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">传 真：0755-83195109</el-col>
          <el-col :span="12">公司网址：www.cmbchina.com</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">区 域：广东</el-col>
          <el-col :span="12">邮政编码：518040</el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            >办公地址：广东省深圳市福田区深南大道7088号,香港夏悫道12号美国银行中心21楼</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="24"
            >注册地址：中国广东省深圳市福田区深南大道7088号</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">十大股东</div>

        <el-table
          :data="shareholderData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="data2" label="股东名称"> </el-table-column>
          <el-table-column prop="data2" label="股份类型"> </el-table-column>
          <el-table-column prop="data3" label="持股数(股)"> </el-table-column>
          <el-table-column prop="data3" label="持股比例"> </el-table-column>
          <el-table-column prop="data3" label="增减(股)"> </el-table-column>
          <el-table-column prop="data3" label="变动比例"> </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
        <div class="title">公司高管</div>

        <el-table
          :data="ceoData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="data2" label="姓名"> </el-table-column>
          <el-table-column prop="data2" label="年龄"> </el-table-column>
          <el-table-column prop="data3" label="性别"> </el-table-column>
          <el-table-column prop="data3" label="学历"> </el-table-column>
          <el-table-column prop="data3" label="职务"> </el-table-column>
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
      <div class="companyItemBox">
        <div class="title">发行相关</div>
        <el-row>
          <el-col :span="12">成立日期：1987-03-31</el-col>
          <el-col :span="12">上市日期：2002-04-09</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">发行方式：网下询价配售,战略配售</el-col>
          <el-col :span="12">发行量(股)：15.0亿</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">发行总市值(元)：110亿</el-col>
          <el-col :span="12">每股发行价(元)：7.30</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">募集资金净额(元):107亿</el-col>
          <el-col :span="12">首日开盘价(元)10.66</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">首日收盘价(元)：10.66</el-col>
          <el-col :span="12">首日换手率：69.02%</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">网下配售中签率：--</el-col>
          <el-col :span="12">定价中签率：1.25%</el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">股本结构</div>

        <el-table
          :data="capitalData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="data2" label="股份构成(万股)/变更日期">
          </el-table-column>
          <el-table-column prop="data2" label="2018-12-31"> </el-table-column>
          <el-table-column prop="data2" label="2018-12-28"> </el-table-column>
          <el-table-column prop="data3" label="2018-12-20"> </el-table-column>
          <el-table-column prop="data3" label="2018-12-28"> </el-table-column>
          <el-table-column prop="data3" label="2018-12-28"> </el-table-column>
          <el-table-column prop="data3" label="2018-12-28"> </el-table-column>
          <el-table-column prop="data3" label="2018-12-28"> </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
        <div class="title">核心题材</div>
        <p>
          要点一:所属板块 HS300_ MSCI大盘 彩票概念 参股期货 长江三角 创业板综
          创业成份 大数据 电子信息 股权激励 互联金融 券商概念 融资融券 上海板块
          深成500 深股通 深证100R 网红直播 云计算 证金持股 转债标的<br /><br />
          要点二:经营范围
          第二类增值电信业务中的呼叫中心业务和信息服务业务(以经营许可证为准),企业投资咨询、策划,商务咨询,会务会展咨询服务,计算机软硬件及网络系统的技术开发、技术服务、技术咨询、技术转让,设计、制作、发布、代理国内外各类广告,经营性互联网文化信息服务,自有房屋租赁。(依法须经批准的项目,经相关部门批准后方可开展经营活动)。
          <br /><br />
          要点三:证券业务、金融电子商务服务业务、金融数据服务业务及互联网广告服务业务
          公司是国内领先的互联网金融服务平台综合运营商,通过以“东方财富网”为核心,集互联网财经门户平台、金融电子商务平台、金融终端平台及移动端平台等为一体的互联网金融服务大平台,向海量用户提供基于互联网平台应用的产品和服务。公司运营的以“东方财富网”为核心的互联网金融服务大平台已成为我国用户访问量最大、用户黏性最高的互联网金融服务平台之一,“东方财富网”、“天天基金网”和“股吧”等,在用户数量和用户黏性方面长期保持竞争优势,具有市场领先地位,形成了公司的核心竞争力。报告期内,公司主要业务有证券业务、金融电子商务服务业务、金融数据服务业务及互联网广告服务业务等。
        </p>
      </div>
    </div>
    <div class="sideNav">
      <ul>
        <li
          v-for="(item, index) in sideNavData"
          :key="index"
          :class="{ active: sideNavVal === index }"
        >
          <span @click="sideNavValChange(index)">{{ item }}</span>
        </li>
      </ul>
    </div>
    <i class="toTopButton el-icon-arrow-up" @click="toUpScroll"></i> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: "招商银行股份有限公司",
      tabData: [
        "上市信息",
        "基本情况",
        "司法风险",
        "经验风险",
        "财务状况",
        "发展状况",
        "资产状况",
        "经营状况"
      ],
      tabIndexVal: 0,
      shareholderData: [
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
      ceoData: [
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
      capitalData: [
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
      sideNavData: [
        "股票详情",
        "基本信息",
        "证券信息",
        "重要人员",
        "联系信息",
        "十大股东",
        "公司高管",
        "发行相关",
        "股本结构",
        "核心题材"
      ],
      sideNavVal: 0,
      itemBoxOffset: [],
      container: null
    };
  },
  mounted() {
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
  methods: {
    // tab切换
    tabChange() {},

    // 页码每页条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 侧边导航点击
    sideNavValChange(index) {
      // this.sideNavVal = index;
      let total = this.itemBoxOffset[index];
      let distance = this.container.scrollTop;
      let _this = this;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
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
        span {
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
    padding: 10px;
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
    width: 100%;
    height: calc(100vh - 300px);
    padding: 0 10px;
    padding-right: 110px;
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
        padding: 0 20px;
        text-align: justify;
      }
    }
  }
  .sideNav {
    position: absolute;
    width: 90px;
    right: 16px;
    top: 235px;
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
