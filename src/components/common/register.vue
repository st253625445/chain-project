<template>
  <div>
    <div class="form-wrap-main" v-show="!isRegister">
      <p class="header-title">注册账号</p>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="mod-register-form"
        >
          <el-form-item prop="username">
            <span class="icon"><i class="iconfont">&#xe60d;</i></span>
            <el-input
              v-model.trim="ruleForm.username"
              placeholder="用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="icon"><i class="iconfont">&#xe6a6;</i></span>
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <span class="icon"><i class="iconfont">&#xe6a6;</i></span>
            <el-input
              type="password"
              v-model="ruleForm.password2"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="companyName">
            <span class="icon"><i class="iconfont">&#xe6ac;</i></span>
            <el-input
              v-model.trim="ruleForm.companyName"
              placeholder="公司"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <span class="icon"><i class="iconfont">&#xe63d;</i></span>
            <el-input
              v-model.trim="ruleForm.email"
              placeholder="工作邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="invitationCode">
            <span class="icon"><i class="iconfont">&#xe648;</i></span>
            <el-input
              v-model.trim="ruleForm.invitationCode"
              placeholder="邀请码（选填）"
            ></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-buttonbox">
            <div class="button-main">
              <el-button
                @click="tryRegister('ruleForm')"
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
  </div>
</template>
<script>
import { regist } from "@/api/login";
export default {
  props: ["ispc"],
  data() {
    return {
      phonelength: 11,
      codelength: 4,
      isRegister: false,
      codeTimer: null,
      canAuthcode: false,
      ruleForm: {
        userName: "",
        password: "",
        password2: "",
        companyName: "",
        email: "",
        invitationCode: "" // 邀请码
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "账号格式错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "密码格式错误", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "密码格式错误", trigger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                return callback(new Error("确认密码需与密码一致"));
              }
            },
            trigger: "blur"
          }
        ],
        companyName: [
          { required: true, message: "公司不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        invitationCode: [
          { pattern: /^\d{4}$/, message: "请输入正确的邀请码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    tryRegister() {
      this.register();
    },
    async register() {
      let res = await regist(this.ruleForm);
      if (res.code === 200) {
        this.sureCallback();
      } else {
        this.$message.error(res.error);
      }
    },
    // async getAuthCode() {
    //   let res = await getAuthCode(this.ruleForm.mobile, "apply");
    //   if (res.code === 200) {
    //     let authcodebtn = this.$refs.authcodebtn;
    //     this.getNumber(authcodebtn, 60);
    //   } else {
    //     this.$message.error(res.error);
    //   }
    // },
    // 验证码倒计时
    // getNumber(obj, count) {
    //   obj.innerHTML = `${count}s后获取`;
    //   obj.disabled = true;
    //   count--;
    //   if (count > 0) {
    //     this.codeTimer = setTimeout(() => {
    //       this.getNumber(obj, count);
    //     }, 1000);
    //   } else {
    //     obj.innerHTML = `发送`;
    //     obj.disabled = false;
    //   }
    // },
    // // 发送验证码
    // sendAuthcode() {
    //   let reg = /^((400[0-9]{7})|(800[0-9]{7})|(0\d{2,3}-\d{7,8}(-\d{1,6})?$)|([1](([3][0-9])|([4][5,7,9])|([5][4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}))$/;
    //   if (!reg.test(this.ruleForm.mobile)) {
    //     this.$message.error("请输入正确的手机号码");
    //   } else {
    //     this.getAuthCode(); // 验证码接口
    //   }
    // },
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
<style>
.finish-inner h1 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 15px;
  line-height: 30px;
}
.finish-inner p {
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 14px;
}
</style>
