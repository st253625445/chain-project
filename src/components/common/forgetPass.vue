<template>
  <div class="form-wrap-main">
    <p class="header-title">找回密码</p>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="mod-register-form"
      >
        <el-form-item prop="mobile">
          <span class="icon"><i class="iconfont">&#xe640;</i></span>
          <el-input
            v-model.trim="ruleForm.mobile"
            placeholder="手机号码"
            :maxlength="phonelength"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="smsCode" class="authcode-buttonbox">
          <span class="icon"><i class="iconfont">&#xe63e;</i></span>
          <el-input
            v-model.trim="ruleForm.smsCode"
            placeholder="验证码"
            :maxlength="codelength"
            auto-complete="off"
          ></el-input>
          <button
            type="button"
            class="send-authcode"
            :disabled="ruleForm.mobile == ''"
            @click="sendAuthcode"
            ref="authcodebtn"
          >
            发送
          </button>
        </el-form-item>
        <el-form-item prop="newPasswd">
          <span class="icon"><i class="iconfont">&#xe641;</i></span>
          <el-input v-model="ruleForm.newPasswd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPasswd">
          <span class="icon"><i class="iconfont">&#xe642;</i></span>
          <el-input
            v-model="ruleForm.confirmPasswd"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-buttonbox">
          <div class="button-main">
            <el-button
              @click="resetPass('ruleForm')"
              class="form-main-button submit-btn"
              >提交</el-button
            >
            <el-button
              class="form-main-button cancel-btn"
              @click="cancelCallback"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { resetPassword, getAuthCode } from "@/api/getData";
export default {
  props: ["ispc"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPasswd) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      phonelength: 11,
      codelength: 4,
      codeTimer: null,
      canAuthcode: false,
      ruleForm: {
        mobile: "",
        smsCode: "", // 验证码
        newPasswd: "",
        confirmPasswd: ""
      },
      rules: {
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
        ],
        newPasswd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "密码格式错误", trigger: "blur" }
        ],
        confirmPasswd: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetPass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetPassword();
          return false;
        } else {
          return false;
        }
      });
    },
    async resetPassword() {
      let res = await resetPassword(this.ruleForm);
      if (res.code === 200) {
        this.sureCallback();
      } else {
        this.$message.error(res.error);
      }
    },
    async getAuthCode() {
      let res = await getAuthCode(this.ruleForm.mobile, "resetPassword");
      if (res.code === 200) {
        let authcodebtn = this.$refs.authcodebtn;
        this.getNumber(authcodebtn, 60);
      } else {
        this.$message.error("发送失败");
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
      if (!reg.test(this.ruleForm.mobile)) {
        this.$message.error("请输入正确的手机号码");
      } else {
        this.getAuthCode();
      }
    },
    // 提交成功后
    sureCallback() {
      this.cancelCallback();
    },
    // 取消
    cancelCallback() {
      this.$refs["ruleForm"].resetFields();
      this.$emit("changeType", "1");
    }
  }
};
</script>
