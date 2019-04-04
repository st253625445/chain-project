<template>
  <div class="commen-wrap whcenter" style="min-width:1070px;">
    <div class="commen-header-wrap">
      <div class="fl">
        <div class="index-logo-box" @click="$router.push('/index')">
          <div class="logo-main fl">
            <svg-icon icon-class="logo-new2" class="logo" />
          </div>
          <div class="logo-text">
            <p>FINANCE</p>
            <p>INTELLIGENCE</p>
          </div>
        </div>
      </div>
    </div>
    <div class="commen-center-wrap whcenter">
      <div class="intro-wrap">
        <h1>您好，</h1>
        <h1>欢迎来到诺知科技</h1>
        <p>还未申请过，请申请试用</p>
        <div class="line"></div>
        <a
          href="javascript:void(0);"
          @click="fromType = '2'"
          v-if="fromType === '1'"
          >申请免费试用</a
        >
        <a
          href="javascript:void(0);"
          @click="fromType = '1'"
          v-if="fromType === '2' || fromType === '3'"
          >已有账号登录</a
        >
      </div>
      <div class="form-wrap">
        <login-pane
          :ispc="ispc"
          @changeType="changeFromType"
          v-if="fromType === '1'"
        ></login-pane>
        <register-pane
          :ispc="ispc"
          @changeType="changeFromType"
          v-if="fromType === '2'"
        ></register-pane>
        <forgetpass-pane
          :ispc="ispc"
          @changeType="changeFromType"
          v-if="fromType === '3'"
        ></forgetpass-pane>
      </div>
    </div>
  </div>
</template>
<script>
import "@/style/loginForm.css";
import loginPane from "@/components/common/login";
import registerPane from "@/components/common/register";
import forgetpassPane from "@/components/common/forgetPass";
export default {
  data() {
    return {
      ispc: true,
      page: "",
      fromType: "1"
    };
  },
  mounted() {},
  components: {
    loginPane,
    registerPane,
    forgetpassPane
  },
  methods: {
    changeFromType(val) {
      this.fromType = val;
    }
  }
};
</script>
