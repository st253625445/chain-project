<template>
  <div class="listedInfoBox" v-loading="listedLoading">
    <div class="countBox">
      <div class="companyItemBox" v-loading="itemLoading[0]">
        <div class="title">{{ sideNavData[0] }}</div>
        <el-row>
          <el-col :span="6">
            注册资本：{{ businessInfo.regCapitalNumClean }}
          </el-col>
          <el-col :span="6">
            实缴资本：{{ businessInfo.paidInCapital }}
          </el-col>
          <el-col :span="6"> 经营状态：{{ businessInfo.regStatus }} </el-col>
          <el-col :span="6">
            成立日期：{{ businessInfo.establishDate | timeFilter }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            统一社会信用代码：{{ businessInfo.creditCode }}
          </el-col>
          <el-col :span="6">
            纳税人识别号：{{ businessInfo.taxRegisterNumber }}
          </el-col>
          <el-col :span="6"> 注册号：{{ businessInfo.registerNumber }} </el-col>
          <el-col :span="6">
            组织机构代码：{{ businessInfo.organizationCode }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"> 公司类型：{{ businessInfo.companyType }} </el-col>
          <el-col :span="6"> 所属行业：{{ businessInfo.industry }} </el-col>
          <el-col :span="6">
            核准日期：{{ businessInfo.approveDate | timeFilter }}
          </el-col>
          <el-col :span="6">
            登记机关：{{ businessInfo.registAuthority }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            营业期限：{{ businessInfo.opePeriodStart | timeFilter }} 至
            {{ businessInfo.opePeriodEnd | timeFilter }}
          </el-col>
          <el-col :span="18"> 企业地址：{{ businessInfo.regLocation }} </el-col>
        </el-row>
        <el-row type="flex">
          <el-col style="width:108px;">
            经营范围：
          </el-col>
          <el-col class="nopadding">
            {{ businessInfo.businessScope }}
          </el-col>
        </el-row>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[1]">
        <div class="title">{{ sideNavData[1] }}</div>
        <el-table
          :data="staffData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (staffParams.page - 1) * staffParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="相关" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="职务" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.titles.join(",") }} </span>
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
          :page-size="staffParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="staffParams.total"
          :current-page="staffParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[2]">
        <div class="title">疑似实际控制人</div>
        <el-table
          :data="actualControllerData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="actualControlName"
            label="最终受益人名称"
            width="320"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="持股比例"
            width="120"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.percent | percentageChange }}</span>
            </template>
          </el-table-column>
          <el-table-column label="股权链" class-name="investChainList">
            <template slot-scope="scope">
              <span
                v-html="investChainListFilter(scope.row.investChainList)"
              ></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[3]">
        <div class="title">{{ sideNavData[3] }}</div>
        <el-table
          :data="beneficiaryData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="最终受益人名称"
            width="320"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="持股比例"
            width="120"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.percent | percentageChange }}</span>
            </template>
          </el-table-column>
          <el-table-column label="股权链" class-name="investChainList">
            <template slot-scope="scope">
              <span v-html="investChainListFilter(scope.row.chainList)"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[4]">
        <div class="title">{{ sideNavData[4] }}</div>
        <el-table
          :data="shareholderInfoData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (shareholderInfoParams.page - 1) *
                      shareholderInfoParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ownerName"
            label="股东名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="持股比例"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.percentStr | percentageChange }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amoutStr"
            label="认缴出资额（万元）"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="dateStr"
            label="认缴出资日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="paymentStr"
            label="实际出资额（万元）"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="payDateStr"
            label="实际出资日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 4);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 4);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="shareholderInfoParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="shareholderInfoParams.total"
          :current-page="shareholderInfoParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[5]">
        <div class="title">{{ sideNavData[5] }}</div>
        <el-table
          :data="outInvestData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (outInvestParams.page - 1) * outInvestParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="被投资企业名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="legalPerson"
            label="被投资法定代理人"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="regCapital"
            label="注册资本"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="出资比例"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.percentStr | percentageChange }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dateStr"
            label="成立日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="regStatus"
            label="状态"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 5);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 5);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="outInvestParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="outInvestParams.total"
          :current-page="outInvestParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[6]">
        <div class="title">{{ sideNavData[6] }}</div>
        <el-table
          :data="branchData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (branchParams.page - 1) * branchParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="分支机构"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 6);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 6);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="branchParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="branchParams.total"
          :current-page="branchParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[7]">
        <div class="title">{{ sideNavData[7] }}</div>
        <el-table
          :data="enterpriseData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (enterpriseParams.page - 1) * enterpriseParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="被投资企业名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="legalPersonName"
            label="被投资法定代表人"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="regCapital"
            label="注册资本"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="出资比例"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.percent | percentageChange }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="establishTime"
            label="成立日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="regStatus"
            label="状态"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 7);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 7);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="enterpriseParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="enterpriseParams.total"
          :current-page="enterpriseParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox" v-loading="itemLoading[8]">
        <div class="title">{{ sideNavData[8] }}</div>
        <el-table
          :data="changeLogData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (changeLogParams.page - 1) * changeLogParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="changeTime"
            label="变更日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="changeItem"
            label="变更项目"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="变更前" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-html="htmlMsg(scope.row.contentBefore)"> </span>
            </template>
          </el-table-column>
          <el-table-column label="变更后" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-html="htmlMsg(scope.row.contentAfter)"> </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="
            val => {
              return pageSizeChange(val, 8);
            }
          "
          @current-change="
            val => {
              return pageCurrentChange(val, 8);
            }
          "
          :page-sizes="[5, 10, 20]"
          :page-size="changeLogParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="changeLogParams.total"
          :current-page="changeLogParams.page"
        >
        </el-pagination>
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
import {
  getBusinessInfo,
  getImportPerson,
  getActControl,
  getBenefit,
  getShareHolder,
  getInverst,
  getBranch,
  getHoldEnter,
  getChangeItem
} from "@/api/getData";
import mixin from "./mixin";
export default {
  props: ["companyId"],
  mixins: [mixin],
  data() {
    return {
      listedLoading: true,
      itemLoading: [],
      sideNavData: [
        "工商信息",
        "重要人员",
        "实际控制人",
        "最终受益人",
        "股东信息",
        "对外投资",
        "分支机构",
        "控股企业",
        "变更记录"
      ],
      sideNavVal: 0,
      // 工商信息
      businessInfo: {},
      // 重要人物
      staffData: [],
      staffParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      // 实际控股人
      actualControllerData: [],
      actualControllerParams: {},
      // 最终受益人
      beneficiaryData: [],
      beneficiaryParams: {},
      // 股东信息
      shareholderInfoData: [],
      shareholderInfoParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      // 对外投资
      outInvestData: [],
      outInvestParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      // 分支机构
      branchData: [],
      branchParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      // 控股企业
      enterpriseData: [],
      enterpriseParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      // 变更记录
      changeLogData: [],
      changeLogParams: {
        total: 0,
        page: 1,
        pageSize: 5
      }
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
    investChainListFilter(data) {
      if (!data) return false;
      let _data = JSON.parse(data);
      let _text = "";
      let _fn = val => {
        let _str = "";
        for (let i = 0; i < val.length; i++) {
          if (val[i] instanceof Array) {
            if (i < val.length - 1) {
              _str += _fn(val[i]) + "<br /><br />";
            } else {
              _str += _fn(val[i]);
            }
          } else {
            if (val[i].type === "name" || val[i].type === "company") {
              _str += `${val[i].value}`;
            } else if (val[i].type === "percent") {
              _str += `<span class="percentValue"><i class="el-icon-right"></i>${
                val[i].value
              }</span>`;
            } else {
              _str += ``;
            }
          }
        }
        return _str;
      };
      _text = _fn(_data);
      return _text;
    },
    getData() {
      this.listedLoading = true;
      Promise.all([
        this.getBusinessInfo(),
        this.getImportPerson(),
        this.getActControl(),
        this.getBenefit(),
        this.getShareHolder(),
        this.getInverst(),
        this.getBranch(),
        this.getHoldEnter(),
        this.getChangeItem()
      ]).then(res => {
        console.log(res);
        this.listedLoading = false;
        this.setNav();
      });
    },
    // 工商信息
    getBusinessInfo() {
      let _opt = {
        companyId: this.companyId
      };
      return new Promise(resolve => {
        getBusinessInfo(_opt)
          .then(res => {
            if (res.code === 200) {
              this.businessInfo = res.data;
            }
            resolve();
            this.itemLoading[0] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[0] = false;
          });
      });
    },
    // 重要人物
    getImportPerson() {
      let _opt = {
        companyId: this.companyId,
        page: this.staffParams.page,
        pageNum: this.staffParams.pageSize
      };
      return new Promise(resolve => {
        getImportPerson(_opt)
          .then(res => {
            if (res.code === 200) {
              this.staffParams.total = res.data.parkOtherStatics.otherCount;
              let _data = res.data.staffMap;
              let _staff = [];
              for (const key in _data) {
                if (_data.hasOwnProperty(key)) {
                  _staff.push({ name: key, titles: _data[key] });
                }
              }
              this.staffData = _staff;
            }
            resolve();
            this.itemLoading[1] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[1] = false;
          });
      });
    },
    // 实际控股人
    getActControl() {
      let _opt = {
        companyId: this.companyId
      };
      return new Promise(resolve => {
        getActControl(_opt)
          .then(res => {
            if (res.code === 200) {
              this.actualControllerData = [res.data];
            }
            resolve();
            this.itemLoading[2] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[2] = false;
          });
      });
    },
    // 最终受益人
    getBenefit() {
      let _opt = {
        companyId: this.companyId
      };
      return new Promise(resolve => {
        getBenefit(_opt)
          .then(res => {
            if (res.code === 200) {
              this.beneficiaryData = res.data;
            }
            resolve();
            this.itemLoading[3] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[3] = false;
          });
      });
    },
    // 股东信息
    getShareHolder() {
      let _opt = {
        companyId: this.companyId,
        page: this.shareholderInfoParams.page,
        pageNum: this.shareholderInfoParams.pageSize
      };
      return new Promise(resolve => {
        getShareHolder(_opt)
          .then(res => {
            if (res.code === 200) {
              this.shareholderInfoData = res.data.companyInvestList;
              this.shareholderInfoParams.total =
                res.data.parkOtherStatics.otherCount;
            }
            resolve();
            this.itemLoading[4] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[4] = false;
          });
      });
    },
    // 对外投资
    getInverst() {
      let _opt = {
        companyId: this.companyId,
        page: this.outInvestParams.page,
        pageNum: this.outInvestParams.pageSize
      };
      return new Promise(resolve => {
        getInverst(_opt)
          .then(res => {
            if (res.code === 200) {
              this.outInvestData = res.data.companyInverstList;
              this.outInvestParams.total = res.data.parkOtherStatics.otherCount;
            }
            resolve();
            this.itemLoading[5] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[5] = false;
          });
      });
    },
    // 分支机构
    getBranch() {
      let _opt = {
        companyId: this.companyId,
        page: this.branchParams.page,
        pageNum: this.branchParams.pageSize
      };
      return new Promise(resolve => {
        getBranch(_opt)
          .then(res => {
            if (res.code === 200) {
              this.branchData = res.data.companyBranch;
              this.branchParams.total = res.data.parkOtherStatics.otherCount;
            }
            resolve();
            this.itemLoading[6] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[6] = false;
          });
      });
    },
    // 控股企业
    getHoldEnter() {
      let _opt = {
        companyId: this.companyId,
        page: this.enterpriseParams.page,
        pageNum: this.enterpriseParams.pageSize
      };
      return new Promise(resolve => {
        getHoldEnter(_opt)
          .then(res => {
            if (res.code === 200) {
              this.enterpriseData = res.data.companyHoldList;
              this.enterpriseParams.total =
                res.data.parkOtherStatics.otherCount;
            }
            resolve();
            this.itemLoading[7] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[7] = false;
          });
      });
    },
    // 变更记录
    getChangeItem() {
      let _opt = {
        companyId: this.companyId,
        page: this.changeLogParams.page,
        pageNum: this.changeLogParams.pageSize
      };
      return new Promise(resolve => {
        getChangeItem(_opt)
          .then(res => {
            if (res.code === 200) {
              this.changeLogData = res.data.companyChangeItemList;
              this.changeLogParams.total = res.data.parkOtherStatics.otherCount;
            }
            resolve();
            this.itemLoading[8] = false;
          })
          .catch(rej => {
            console.log(rej);
            resolve();
            this.itemLoading[8] = false;
          });
      });
    },
    // 每页条数改变
    pageSizeChange(val, index) {
      this.itemLoading[index] = true;
      switch (index) {
        case 1:
          this.staffParams.pageSize = val;
          this.staffParams.page = 1;
          this.getImportPerson();
          break;
        case 4:
          this.shareholderInfoParams.pageSize = val;
          this.shareholderInfoParams.page = 1;
          this.getShareHolder();
          break;
        case 5:
          this.outInvestParams.pageSize = val;
          this.outInvestParams.page = 1;
          this.getInverst();
          break;
        case 6:
          this.branchParams.pageSize = val;
          this.branchParams.page = 1;
          this.getBranch();
          break;
        case 7:
          this.enterpriseParams.pageSize = val;
          this.enterpriseParams.page = 1;
          this.getHoldEnter();
          break;
        case 8:
          this.changeLogParams.pageSize = val;
          this.changeLogParams.page = 1;
          this.getChangeItem();
          break;
        default:
          break;
      }
    },
    // 当前页码改变
    pageCurrentChange(val, index) {
      this.itemLoading[index] = true;
      switch (index) {
        case 1:
          this.staffParams.page = val;
          this.getImportPerson();
          break;
        case 4:
          this.shareholderInfoParams.page = val;
          this.getShareHolder();
          break;
        case 5:
          this.outInvestParams.page = val;
          this.getInverst();
          break;
        case 6:
          this.branchParams.page = val;
          this.getBranch();
          break;
        case 7:
          this.enterpriseParams.page = val;
          this.getHoldEnter();
          break;
        case 8:
          this.changeLogParams.page = val;
          this.getChangeItem();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less">
.el-table .investChainList .cell {
  white-space: pre-wrap;
  .percentValue {
    display: inline-block;
    margin-right: 40px;
    margin-left: 10px;
    color: #4b61e7;
  }
}
</style>
