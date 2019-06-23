<template>
  <div class="listedInfoBox" v-loading="listedLoading">
    <div class="countBox">
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[0] }}</div>
        <el-row>
          <el-col :span="6">
            注册资本：20万人民币
          </el-col>
          <el-col :span="6">
            实缴资本：20万人民币
          </el-col>
          <el-col :span="6">
            经营状态：续存
          </el-col>
          <el-col :span="6">
            成立日期：1999-09-92
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            统一社会信用代码：2000000000
          </el-col>
          <el-col :span="6">
            纳税人识别号：22222222
          </el-col>
          <el-col :span="6">
            注册号：22222222222222
          </el-col>
          <el-col :span="6">
            组织机构代码：222222222
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            公司类型：股份有限公司
          </el-col>
          <el-col :span="6">
            所属行业：金融业
          </el-col>
          <el-col :span="6">
            核准日期：000000
          </el-col>
          <el-col :span="6">
            登记机关：232322222
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            营业期限：232323
          </el-col>
          <el-col :span="18">
            企业地址：2323232
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col style="width:108px;">
            经营范围：
          </el-col>
          <el-col class="nopadding">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </el-col>
        </el-row>
      </div>
      <div class="companyItemBox">
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
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="staffParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="staffParams.total"
          :current-page="staffParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
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
            prop="name"
            label="最终受益人名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="持股比例" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="股权链" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
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
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="持股比例" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="股权链" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
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
            prop="name"
            label="股东名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="持股比例" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="认缴出资额（万元）"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="认缴出资日期" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="实际出资额（万元）"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="实际出资日期" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="shareholderInfoParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="shareholderInfoParams.total"
          :current-page="shareholderInfoParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
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
            label="被投资法定代理人"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="注册资本" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="出资比例" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="成立日期" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="状态" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="outInvestParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="outInvestParams.total"
          :current-page="outInvestParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
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
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="branchParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="branchParams.total"
          :current-page="branchParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
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
            prop="name"
            label="被投资法定代表人"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="注册资本"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="出资比例"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="成立日期"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="enterpriseParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="enterpriseParams.total"
          :current-page="enterpriseParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
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
          </el-table-column>
          <el-table-column
            prop="name"
            label="变更日期"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="变更项目" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="变更前" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="变更后" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
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
import mixin from "./mixin";
export default {
  props: ["companyId"],
  mixins: [mixin],
  data() {
    return {
      listedLoading: true,
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
      staffData: [],
      staffParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      actualControllerData: [],
      actualControllerParams: {},
      beneficiaryData: [],
      beneficiaryParams: {},
      shareholderInfoData: [],
      shareholderInfoParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      outInvestData: [],
      outInvestParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      branchData: [],
      branchParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      enterpriseData: [],
      enterpriseParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      changeLogData: [],
      changeLogParams: {}
    };
  },
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listedLoading = false;
      this.setNav();
    },
    // 每页条数改变
    pageSizeChange() {},
    // 当前页码改变
    pageCurrentChange() {}
  }
};
</script>
