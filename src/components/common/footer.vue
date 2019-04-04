<template>
  <div class="chain-footer">
    <div class="company-logo">
      <img src="../../assets/img/footer-logo.png" />
      <p>北京诺知科技有限公司 版权所有</p>
    </div>
    <div class="icpInfo">
      <span
        >Copyright © 2017-{{ thisYear }} Knogen. All Rights Reserved.诺知科技
        版权所有 {{ ICPInfo }}</span
      >
    </div>
    <div class="weixin">
      <p style="fontSize: 16px;">关注诺知微信公众号</p>
      <p>北京诺知科技有限公司</p>
    </div>
    <div class="QRcode">
      <img src="../../assets/img/QRcode.jpg" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ICPInfo: "京ICP备17042353号"
    };
  },
  computed: {
    thisYear: function() {
      let date = new Date();
      let year = date.getFullYear();
      return year;
    }
  }
};
</script>

<style lang="less">
.chain-footer {
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  padding: 0 60px;
  background: #484b5a;
  font-size: 12px;
  color: #9e9d9d;
  .company-logo {
    img {
      width: 112px;
      height: auto;
      opacity: 0.4;
    }
  }
  .icpInfo {
    flex: 1;
    text-align: center;
  }
  .weixin {
    text-align: right;
  }
  .QRcode {
    img {
      width: 60px;
      height: 60px;
      margin-left: 22px;
    }
  }
}
</style>
