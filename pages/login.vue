<template>
  <div class="login_container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="ruleForm"
      label-width="100px"
      size="small"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, data } = await that.$axios.post("/users/signin", {
            username: that.ruleForm.name,
            password: that.ruleForm.password
          });
          if (status === 200) {
            if (data && data.code === 0) {
              alert("登陆成功");
              location.href = "/";
            } else {
              that.error = data.msg;
              alert(that.error);
            }
          } else {
            taht.error = `服务器出错`;
            alert(that.error);
          }
        }
      });
    },
    resetForm(formName) {
      //   this.$refs[formName].resetFields();
      window.location.href = "/register";
    }
  }
};
</script>

<style lang="scss">
.login_container {
  .ruleForm {
    width: 300px;
    margin: 50px auto 20px;
    .el-input__inner {
      border-radius: 0px;
    }
    .el-button {
      border-radius: 0px;
    }
  }
}
</style>
