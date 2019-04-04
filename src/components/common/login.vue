<template>
  <div class="form-wrap-main">
    <p class="header-title">登录</p>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="0"
      class="demo-form demo-loginForm"
      v-if="!phoneLogin"
    >
      <el-form-item prop="username">
        <span class="icon"><i class="iconfont">&#xe60d;</i></span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          autocomplete="off"
          @keyup.enter.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <span class="icon"><i class="iconfont">&#xe6a6;</i></span>
        <el-input
          type="password"
          v-model="loginForm.passwd"
          placeholder="请输入密码"
          autocomplete="off"
          @keyup.enter.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item class="el-form-item-buttonbox">
        <div class="forget-pass" style="text-align:left;padding-top:10px;">
          <a href="javascript:;" @click="changeForm">手机密码登录</a>
          <a class="fr" href="javascript:;" @click="linkcallback('3')"
            >忘记密码？</a
          >
        </div>
        <div class="button-main">
          <el-button
            @click="submitForm('loginForm')"
            class="form-main-button submit-btn"
            :loading="inSubmit"
            >登录</el-button
          >
          <el-button class="form-main-button cancel-btn" @click="cancelCallback"
            >取消</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <el-form
      :model="phoneloginForm"
      status-icon
      :rules="rules"
      ref="phoneloginForm"
      label-width="0"
      class="demo-form demo-loginForm"
      v-if="phoneLogin"
    >
      <el-form-item prop="mobile">
        <span class="icon"><i class="iconfont">&#xe640;</i></span>
        <el-input
          v-model="phoneloginForm.mobile"
          placeholder="请输入11位手机号码"
          auto-complete="off"
          @keyup.enter.native="submitForm('phoneloginForm')"
          :maxlength="phonelength"
          @blur="phoneNull = false"
        ></el-input>
        <p class="phoneNull" v-if="phoneNull">
          该手机号尚未注册，请先<a
            href="javascript:void(0);"
            @click="linkcallback('2')"
            >申请试用</a
          >
        </p>
      </el-form-item>
      <el-form-item prop="smsCode" class="authcode-buttonbox">
        <span class="icon"><i class="iconfont">&#xe6a6;</i></span>
        <el-input
          v-model.trim="phoneloginForm.smsCode"
          placeholder="请输入验证码"
          :maxlength="codelength"
          @keyup.enter.native="submitForm('phoneloginForm')"
        ></el-input>
        <button
          type="button"
          class="send-authcode"
          :disabled="phoneloginForm.mobile == ''"
          @click="sendAuthcode"
          ref="authcodebtn"
        >
          发送
        </button>
      </el-form-item>
      <el-form-item class="el-form-item-buttonbox">
        <div class="forget-pass" style="text-align:left;padding-top:10px;">
          <a href="javascript:;" @click="changeForm">账号密码登录</a
          ><a class="fr" href="javascript:;" @click="linkcallback('3')"
            >忘记密码？</a
          >
        </div>
        <div class="button-main">
          <el-button
            @click="submitForm('phoneloginForm')"
            class="form-main-button submit-btn"
            :loading="inSubmit"
            >登录</el-button
          >
          <el-button class="form-main-button cancel-btn" @click="cancelCallback"
            >取消</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAuthCode } from "@/api/getData";
export default {
  props: ["ispc"],
  data() {
    return {
      inSubmit: false,
      phoneNull: false,
      phoneLogin: false,
      phonelength: 11,
      codelength: 4,
      loginForm: {
        username: "",
        passwd: ""
      },
      phoneloginForm: {
        mobile: "",
        smsCode: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "账号格式错误", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "密码格式错误", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^((400[0-9]{7})|(800[0-9]{7})|(0\d{2,3}-\d{7,8}(-\d{1,6})?$)|([1](([3][0-9])|([4][5,7,9])|([5][4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}))$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        smsCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { pattern: /^\d{4}$/, message: "请输入正确的验证码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.phoneNull = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tryLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    phonesubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tryLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async tryLogin() {
      if (this.inSubmit) return;
      let opt = {
        from: this.loginForm,
        type: "account"
      };
      if (this.phoneLogin) {
        opt = {
          from: this.phoneloginForm,
          type: "mobile"
        };
      }
      this.inSubmit = true;
      console.log("tryLogin");
      this.$store
        .dispatch("Login", opt)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(() => {});
      this.inSubmit = false;
    },
    async getAuthCode() {
      let res = await getAuthCode(this.phoneloginForm.mobile, "login");
      if (res.code === 200) {
        let authcodebtn = this.$refs.authcodebtn;
        this.getNumber(authcodebtn, 60);
      } else {
        if (res.error === "mobile.not.find") {
          this.phoneNull = true;
        } else {
          this.$message.error(res.error);
        }
      }
    },
    // 验证码倒计时
    getNumber(obj, count) {
      obj.innerHTML = `${count}s后获取`;
      obj.disabled = true;
      count--;
      if (count > 0) {
        this.codeTimer = setTimeout(() => {
          this.getNumber(obj, count);
        }, 1000);
      } else {
        obj.innerHTML = `发送`;
        obj.disabled = false;
      }
    },
    // 发送验证码
    sendAuthcode() {
      let reg = /^((400[0-9]{7})|(800[0-9]{7})|(0\d{2,3}-\d{7,8}(-\d{1,6})?$)|([1](([3][0-9])|([4][5,7,9])|([5][4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}))$/;
      if (!reg.test(this.phoneloginForm.mobile)) {
        this.$message.error("请输入正确的手机号码");
      } else {
        this.getAuthCode();
      }
    },
    // 改变登录方式
    changeForm() {
      this.cancelCallback();
      this.phoneLogin = !this.phoneLogin;
    },
    linkcallback(val) {
      this.$emit("changeType", val);
      this.cancelCallback();
    },
    // 取消
    cancelCallback() {
      if (!this.phoneLogin) {
        this.$refs["loginForm"].resetFields();
      } else {
        this.$refs["phoneloginForm"].resetFields();
      }
    }
  }
};
</script>
<style>
.phoneNull {
  position: absolute;
  color: #f56c6c;
  font-size: 12px;
  line-height: 12px;
  padding-top: 4px;
}
.phoneNull a {
  color: #0f2a84 !important;
}
</style>
