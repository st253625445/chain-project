<template>
  <div class="parkInfoCont" v-loading="parkLoading">
    <div class="countBox">
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[0] }}</div>
        <el-row>
          <el-col :span="12">
            土地挂牌价格：30.0万元/亩
          </el-col>
          <el-col :span="12">
            园区每年GDP：2150亿元
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            税收要求：80万元/亩
          </el-col>
          <el-col :span="12">
            园区每年财政收入：288.1亿元
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">投资强度：500万元/亩 </el-col>
          <el-col :span="12">每年招商新入驻企业约：90家 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">环保要求：有 </el-col>
          <el-col :span="12">厂房出租价格区间：34.8～？元/月·m2 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">环保要求：有 </el-col>
          <el-col :span="12">厂房出售价格区间：-元/m2 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">园区已建成面积：-平方公里</el-col>
          <el-col :span="12">写字楼出租价格区间：-元/月·m2 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">是否有指标：是</el-col>
          <el-col :span="12">写字楼出售价格区间：-元/m2 </el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[1] }}</div>
        <el-row>
          <el-col :span="12">水价：3.8元/m3 </el-col>
          <el-col :span="12">污水处理：1.35元/吨 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">居民用电：0.5283元/度</el-col>
          <el-col :span="12">蒸汽：有 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">商业用电：0.882元/度</el-col>
          <el-col :span="12">蒸汽价格：-元/m3 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">大工业用电：1.407元/度</el-col>
          <el-col :span="12">暖气成本：-元/m3 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">工业电价（高峰）：1.112元/度</el-col>
          <el-col :span="12">最低工资标准：1940元/月 </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">工业电价（低谷）：0.361元/度</el-col>
          <el-col :span="12">普通工人：2800元/月</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">工业电价（平时）：0.844元/度</el-col>
          <el-col :span="12">中级管理人员：4200-4700元/月</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">天然气：2.2元/m3</el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[2] }}</div>
        <el-row>
          <el-col :span="24">本地人口：1068.4万</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">流动人口：698万</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">周边职业院校：苏州市顺通职业培训学校</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">每年毕业人数：3.2万</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">财政是否独立：是</el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[3] }}</div>
        <el-row type="flex" v-for="(item, index) in matchingData" :key="index">
          <el-col class="itemRowTitle"> {{ item.title }}： </el-col>
          <el-col class="nopadding">
            {{ item.value }}
          </el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[4] }}</div>
        <el-table
          :data="data1"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="金融机构名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="data1"
            label="详细地址"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="data2"
            label="可办理业务"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="data3"
            label="服务电话"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="在线咨询"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template>
              <span class="linkSpan">
                咨询
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 1);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 1);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="data1Params.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="data1Params.total"
          :current-page="data1Params.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[5] }}</div>
        <ul class="tableUl">
          <li v-for="(item, index) in data2" :key="index">
            <span class="flex1">{{ item.name }}</span>
            <span class="flex0">{{ item.time }}</span>
          </li>
        </ul>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 1);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 1);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="data2Params.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="data2Params.total"
          :current-page="data2Params.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[7] }}</div>
        <el-row type="flex">
          <el-col :span="12" class="distributionTable">
            <el-table
              :data="data3"
              stripe
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column
                prop="index"
                label="排名"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="行业"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="proportion"
                label="占比"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12" class="distributionEchart"> </el-col>
        </el-row>
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
    <i class="toTopButton el-icon-arrow-up" @click="toUpScroll"></i>
  </div>
</template>

<script>
import mixin from "../companyPage/mixin";
export default {
  props: ["parkId"],
  mixins: [mixin],
  data() {
    return {
      parkLoading: true,
      itemLoading: [],
      sideNavData: [
        "园区概况",
        "投资成本",
        "园区资源",
        "环保配套",
        "第三方服务",
        "地区政策",
        "发展规划",
        "产业分布"
      ],
      sideNavVal: 0,
      businessInfo: {},
      matchingData: [],
      data1: [],
      data1Params: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      data2: [],
      data2Params: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      data3: []
    };
  },
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    htmlMsg(data) {
      return data.replace(/\n/g, "<br>");
    },
    getData() {
      this.parkLoading = false;
      this.matchingData = [
        {
          title: "货运站距离",
          value:
            "1.苏州货运站 19km；2.东英货运站 23km：3.苏州园区火车站 41.4km。"
        },
        {
          title: "高铁距离",
          value: "1.苏州站 10.9km；2.苏州北站 8.6km：3.昆山南站 41.4km。"
        },
        {
          title: "港口距离",
          value: "1.太仓港 81km；2.上海港 45km。"
        },
        {
          title: "机场距离",
          value:
            "1.上海虹桥国际机场 10.9km；2.上海浦东国际机场 8.6km：3.无锡硕放机场 41.4km。"
        },
        {
          title: "园区介绍",
          value:
            "苏州工业园区位于苏州古城区东部，以发达的高速公路、铁路、水路及航空网与世界各主要城市相连。苏州工业园区位于苏州古城区东部，以发达的高速公路、铁路、水路及航空网与世界各主要城市相连。苏州工业园区位于苏州古城区东部，以发达的高速公路、铁路、水路及航空网与世界各主要城市相连。苏州工业园区位于苏州古城区东部，以发达的高速公路、铁路、水路及航空网与世界各主要城市相连。"
        },
        {
          title: "公路运输",
          value:
            "常台高速、环城高速公路、沪苏浙高速公路、京沪高速公路、苏沪高速公路。"
        },
        {
          title: "铁路运输",
          value: "京沪铁路、沪宁城际铁路、京沪高速铁路。"
        },
        {
          title: "园区周边房价",
          value: "16453元/m3"
        },
        {
          title: "两居室租金",
          value: "2500元/月"
        },
        {
          title: "本市住房均价",
          value: "16453元/m3"
        },
        {
          title: "园区生活配套",
          value:
            "生活配套设施完善，各项社会事业协调发展，建立了覆盖全区的社会保证体系。"
        },
        {
          title: "居住环境",
          value: "环境宜居，区域整体环境通过ISO14001认证，绿化覆盖率45%。"
        },
        {
          title: "商业环境",
          value:
            "商业环境优良，以打造苏州市域CBD为龙头，着力发展金融服务、总部经济等高端服务业。"
        }
      ];
      this.data1 = [
        {
          name: "中国工商银行（苏州星湖支行）",
          data1: "地址111",
          data2: "业务111",
          data3: "电话111"
        },
        {
          name: "中国工商银行（苏州星湖支行）",
          data1: "地址111",
          data2: "业务111",
          data3: "电话111"
        },
        {
          name: "中国工商银行（苏州星湖支行）",
          data1: "地址111",
          data2: "业务111",
          data3: "电话111"
        }
      ];
      this.data2 = [
        {
          name: "[江苏省]江苏省提高知识产权产出质量",
          time: "2019-6-18"
        },
        {
          name: "[江苏省]江苏省提高知识产权产出质量",
          time: "2019-6-18"
        },
        {
          name: "[江苏省]江苏省提高知识产权产出质量",
          time: "2019-6-18"
        },
        {
          name: "[江苏省]江苏省提高知识产权产出质量",
          time: "2019-6-18"
        }
      ];
      this.data3 = [
        {
          name: "商务服务业",
          index: "1",
          proportion: "27%"
        },
        {
          name: "批发业",
          index: "2",
          proportion: "27%"
        }
      ];
      this.setNav();
    },
    // 每页条数改变
    pageSizeChange(val, index) {
      this.itemLoading[index] = true;
    },
    // 当前页码改变
    pageCurrentChange(val, index) {
      this.itemLoading[index] = true;
    }
  }
};
</script>

<style lang="less">
.parkInfoPage .parkInfoCont {
  .el-table .investChainList .cell {
    white-space: pre-wrap;
    .percentValue {
      display: inline-block;
      margin-right: 40px;
      margin-left: 10px;
      color: #4b61e7;
    }
  }
  .countBox {
    padding-right: 130px;
    .companyItemBox .distributionTable {
      padding-left: 0;
    }
  }
  .sideNav {
    width: 100px;
    top: 175px;
    ul {
      width: 90px;
    }
  }
  .itemRowTitle {
    width: auto;
  }
}
</style>
