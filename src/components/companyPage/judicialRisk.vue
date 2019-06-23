<template>
  <div class="listedInfoBox" v-loading="listedLoading">
    <div class="countBox">
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[0] }}信息</div>
        <el-table
          :data="personData"
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
                    (personParams.page - 1) * personParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="案号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="立案时间" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行法院" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行标号" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="personParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="personParams.total"
          :current-page="personParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[1] }}信息</div>
        <el-table
          :data="faithPersonData"
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
                    (faithPersonParams.page - 1) * faithPersonParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="案号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="发布时间" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="立案时间" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行法院" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="省份" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="履行情况" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="faithPersonParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="faithPersonParams.total"
          :current-page="faithPersonParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[2] }}</div>
        <el-table
          :data="documentsData"
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
                    (documentsParams.page - 1) * documentsParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="案件名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="案由" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="发布时间" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="案件编号" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="案件身份" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行法院" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="documentsParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="documentsParams.total"
          :current-page="documentsParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[3] }}</div>
        <el-table
          :data="courtNoticeData"
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
                    (courtNoticeParams.page - 1) * courtNoticeParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="当事人"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="公告类型" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="公告人" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="刊登时间" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="内容" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="courtNoticeParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="courtNoticeParams.total"
          :current-page="courtNoticeParams.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[4] }}</div>
        <el-table
          :data="assistanceData"
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
                    (assistanceParams.page - 1) * assistanceParams.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="被执行人"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="股权数额" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行通知文号" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="执行法院" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="类型 | 状态" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="内容" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="assistanceParams.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="assistanceParams.total"
          :current-page="assistanceParams.page"
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
import mixin from "./mixin";
export default {
  props: ["companyId"],
  mixins: [mixin],
  data() {
    return {
      listedLoading: true,
      sideNavData: [
        "被执行人",
        "失信被执行人",
        "裁判文书",
        "法官公告",
        "司法协助"
      ],
      sideNavVal: 0,
      personData: [],
      personParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      faithPersonData: [],
      faithPersonParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      documentsData: [],
      documentsParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      courtNoticeData: [],
      courtNoticeParams: {
        total: 0,
        page: 1,
        pageSize: 5
      },
      assistanceData: [],
      assistanceParams: {
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
