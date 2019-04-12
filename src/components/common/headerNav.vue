<template>
  <div class="chainHeader">
    <div class="logo-box" @click="$router.push('/')">
      <img src="../../assets/img/logo-chain.png" alt="logo" class="logo" />
      <span class="logo-text">数知·产业链</span>
    </div>
    <div class="menuGroup">
      <div class="groupBox" v-if="thisSearchQ">
        <span
          :class="[
            'menuItem',
            { active: index === groupIndex },
            { hover: index === hoverGroupIndex && navDrdownShow }
          ]"
          v-for="(item, index) in menuDatas"
          :key="index"
          @mouseover="hoverMenuItem(index)"
          @mouseout="outMenuItem(index)"
          >{{ item.title }}({{ item.total }})</span
        >
      </div>
    </div>
    <el-input
      class="autocompleteHeader"
      placeholder="请输入内容"
      @keyup.enter.native="searchChain"
      v-model="thisSearchQ"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @click="searchChain"
      ></i>
    </el-input>
    <!-- 个人中心 start -->
    <div class="userMenuBox">
      <el-dropdown trigger="click" class="fl">
        <span class="style-icon small-icon iconAction">
          <i class="iconfont">&#xe65f;</i>
        </span>
        <el-dropdown-menu slot="dropdown" class="model-pop my-center-dropdown">
          <ul>
            <li>
              <a
                :href="
                  $route.query.activeName != 'first'
                    ? '/mycenter?activeName=first'
                    : 'javascript:;'
                "
                :target="
                  $route.query.activeName != 'first' ? '_blank' : '_self'
                "
                @click="clickEntrance('accountInfo')"
                >账户信息</a
              >
            </li>
            <li>
              <a
                :href="
                  $route.query.activeName != 'second'
                    ? '/mycenter?activeName=second'
                    : 'javascript:;'
                "
                :target="
                  $route.query.activeName != 'second' ? '_blank' : '_self'
                "
                @click="clickEntrance('passWord')"
                >修改密码</a
              >
            </li>
            <li>
              <a href="/chain/myconcern" target="_blank">我的关注</a>
            </li>
            <li>
              <a href="javascript:;" @click="logOut">退出</a>
            </li>
          </ul>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人中心 end -->
    <transition>
      <div
        v-if="navDrdownShow"
        class="navDropdownBox"
        @mouseover="hoverNavDrdown"
        @mouseout="outNavDrdown"
      >
        <div class="navDropdownList">
          <span
            :class="
              groupIndex === hoverGroupIndex && itemActiveIndex === index
                ? 'navDropdownItem active'
                : 'navDropdownItem'
            "
            v-for="(item, index) in navDrdownList"
            :key="index"
            @click="chainItemClick(item, index)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { trim } from "@/utils";
import { chainSearch } from "@/api/getData";

export default {
  data() {
    return {
      userAlert: false,
      mycenterAccess: false,
      Interval: null,
      msg: true,
      thisSearchQ: "",
      groupIndex: 0,
      hoverGroupIndex: 0,
      itemActiveIndex: 0,
      groupMenus: ["上市公司", "行业门类", "市场概念"],
      menuDatas: [],
      chainItemId: "",
      navDrdownShow: false,
      navDrdownList: [],
      navDrdownHideTime: null
    };
  },
  mounted() {
    let _query = this.$route.query;
    if (_query.keyword) {
      this.thisSearchQ = _query.keyword;
      this.searchChain();
    } else if (_query.chainId) {
      this.chainItemId = _query.chainId;
    }
    // style-icon 点击样式*/
    let icon = document.getElementsByClassName("iconAction");
    for (let i = 0; i < icon.length; i++) {
      icon[i].onmousedown = function() {
        icon[i].classList.add("active");
      };
      icon[i].onmouseup = function() {
        icon[i].classList.remove("active");
      };
    }
  },
  methods: {
    logOut() {
      // 退出
      if (confirm("确定退出吗？")) {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    },
    // 搜索产业链列表
    async searchChain() {
      let q = this.thisSearchQ;
      if (!trim(q)) {
        this.$message({
          showClose: true,
          message: "请输入关键词",
          type: "error"
        });
        return false;
      }
      this.thisSearchQ = trim(q);
      // 数据请求
      await this.searchChainList();
    },
    // 请求列表
    async searchChainList() {
      let _res = await chainSearch(this.thisSearchQ);
      this.menuDatas = this.setMenuNav(_res.data);
      if (_res && _res.data.length !== 0) {
        for (let i = 0; i < this.menuDatas.length; i++) {
          if (this.menuDatas[i].items.length > 0) {
            this.groupIndex = this.hoverGroupIndex = i;
            break;
          } else {
            continue;
          }
        }
        let _item = this.menuDatas[this.groupIndex].items[0];
        if (_item.id === this.chainItemId) {
          return false;
        }
        this.chainItemClick(_item, 0);
      } else {
        this.chainItemClick({ name: null, id: null }, -1);
      }
    },
    // 处理列表数据返回nav
    setMenuNav(val) {
      let _data = [];
      for (let i = 0; i < this.groupMenus.length; i++) {
        _data[i] = {
          title: this.groupMenus[i],
          total: 0,
          show: false,
          items: []
        };
      }
      val.map(item => {
        let _index = item.category - 1;
        if (_index < 3) {
          _data[_index].total += 1;
          _data[_index].items.push(item);
        }
      });
      return _data;
    },
    // 鼠标经过菜单栏
    hoverMenuItem(index) {
      if (this.menuDatas[index].total > 0) {
        clearTimeout(this.navDrdownHideTime);
        this.navDrdownShow = true;
        this.hoverGroupIndex = index;
        this.navDrdownList = this.menuDatas[index].items;
      }
    },
    outMenuItem() {
      this.navDrdownHideTime = setTimeout(() => {
        this.navDrdownShow = false;
      }, 100);
    },
    hoverNavDrdown() {
      clearTimeout(this.navDrdownHideTime);
      this.navDrdownShow = true;
    },
    outNavDrdown() {
      this.navDrdownHideTime = setTimeout(() => {
        this.navDrdownShow = false;
      }, 100);
    },
    // 点击产业链url添加参数
    chainItemClick(item, index) {
      if (index === -1) {
        this.groupIndex = null;
      } else {
        this.itemActiveIndex = index;
        this.groupIndex = this.hoverGroupIndex;
      }
      this.chainItemId = item.id;
      let _query = {
        keyword: trim(this.thisSearchQ),
        chainId: item.id,
        nodeName: item.name
      };
      // 修改链接
      this.$router.push({ path: "/index", query: _query });
    }
  }
};
</script>

<style lang="less">
.chainHeader {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  height: 56px;
  .logo-box {
    display: flex;
    align-items: center;
    width: 170px;
    height: 100%;
    padding-left: 20px;
    cursor: pointer;
    .logo {
      margin: 0;
      margin-right: 10px;
      width: 30px;
      height: 30px !important;
    }
    .logo-text {
      font-size: 18px;
      color: #222438;
    }
  }
  .menuGroup {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .groupBox {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .menuItem {
      position: relative;
      padding: 0 30px;
      font-size: 16px;
      color: rgb(0, 0, 0);
      line-height: 56px;
      cursor: pointer;
      &.hover {
        color: #5063df;
        &::after {
          content: "";
          position: absolute;
          left: 30px;
          bottom: 0;
          width: -moz-calc(100% - 60px);
          width: -webkit-calc(100% - 60px);
          width: calc(100% - 60px);
          height: 4px;
          background: #5063df;
        }
      }
      &.active {
        color: #5063df;
      }
    }
  }
  .navDropdownBox {
    position: absolute;
    width: 100%;
    padding: 60px 0 20px 0;
    top: 56px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 27px 3px rgba(0, 0, 0, 0.1);
    z-index: 2002;
    .navDropdownList {
      width: 100%;
      max-height: 320px;
      overflow: auto;
    }
    .navDropdownItem {
      display: inline-block;
      width: 175px;
      padding: 0 10px;
      margin-bottom: 20px;
      margin-left: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: rgb(51, 51, 51);
      line-height: 30px;
      cursor: default;
      &:hover {
        background: #f2f2f2;
      }
      &.active {
        color: #fff;
        background: #5063df;
      }
    }
  }
  .autocompleteHeader {
    width: 200px;
    height: 100%;
    .el-input__inner {
      height: 56px;
      padding-left: 15px;
      padding-right: 45px;
      line-height: 56px;
      background: #eeeeee;
      border: none;
      border-radius: 0;
    }
    .el-input__suffix {
      right: 15px;
      cursor: pointer;
    }
    .el-input__icon {
      font-size: 20px;
    }
  }
}
/*my-center-dropdown*/
.my-center-dropdown {
  padding: 0;
  width: 170px;
  text-align: center;
  border-radius: 2px;
  border: none;
  z-index: 3000 !important;
}
.my-center-dropdown li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #5f5f5f;
}
.my-center-dropdown li a {
  font-size: 14px;
  color: inherit;
  display: block;
  text-align: center;
}
.my-center-dropdown li:hover,
.my-center-dropdown .el-dropdown-menu__item:hover {
  background: #eee;
  color: #000;
}

.style-icon {
  display: inline-block;
  height: 30px;
  color: #222438;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  position: relative;
  border-radius: 2px;
}
.style-icon .remind {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: linear-gradient(#f15c3f, #c52034);
  border-radius: 6px;
  position: absolute;
  top: 4px;
  right: 6px;
  box-shadow: -1px 1px 2px 0 rgb(0, 0, 0);
}
.style-icon i {
  font-size: inherit;
  color: inherit;
}
.small-icon {
  width: 56px;
  font-size: 18px;
  background: transparent;
  border: none;
  margin-top: 5px;
}
.button-icon {
  width: 100px;
  font-size: 14px;
}
.style-icon:hover {
  color: #000;
}
.style-icon.on {
  color: #000;
  background: #fff;
}
.style-icon.active {
  color: #000;
  background: #fff;
}
.MR10 {
  margin-right: 10px;
}

.model-pop {
  background: rgb(247, 247, 247);
  position: relative;
  margin-top: 4px !important;
  border: none !important;
  border-top: 2px solid #43b9e5 !important;
  padding: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
