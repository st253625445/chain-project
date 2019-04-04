<template>
  <div class="chain-header">
    <div class="logo-box" @click="$router.push('/')">
      <img src="../../assets/img/logo-chain.png" alt="logo" class="logo" />
      <span class="logo-text">数知·产业链</span>
    </div>
    <!-- 个人中心 start -->
    <div class="userMenuBox">
      <el-dropdown trigger="click" class="fl">
        <span class="style-icon small-icon iconAction">
          <i class="iconfont">&#xe65f;</i>
        </span>
        <el-dropdown-menu slot="dropdown" class="model-pop my-center-dropdown">
          <ul>
            <li>
              <a href="/mycenter?activeName=first" target="_blank">账户信息</a>
            </li>
            <li>
              <a href="/mycenter?activeName=second" target="_blank">修改密码</a>
            </li>
            <li>
              <a href="/myconcern" target="_blank">我的关注</a>
            </li>
            <li>
              <a href="javascript:;" @click="logOut">退出</a>
            </li>
          </ul>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      // 退出
      if (confirm("确定退出吗？")) {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    }
  }
};
</script>

<style lang="less">
.chain-header {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  height: 60px;
  border-bottom: 1px solid #eaeaea;
  .logo-box {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 20px;
    margin-right: auto;
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
  .userMenuBox {
    display: flex;
    height: 100%;
    align-items: center;
    border-left: 1px solid #eaeaea;
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
