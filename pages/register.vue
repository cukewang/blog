<template>
  <div class="login_container">
    <!-- 首先element表单的外标签。标签里的属性可以参考element-ui文档的Form表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="ruleForm"
      label-width="100px"
      size="small"
    >
      <!-- 其中表单项用el-form-item标签包起来，证明这是一个表单项目 -->
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="ruleForm.password2"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
        <el-button
          @click="sendMsg"
          class="sendemail"
          :disabled="ruleForm.verifyflag"
          >{{ ruleForm.verifymsg }}</el-button
        >
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')">注册</el-button>
        <!-- <el-button @click="resetForm('ruleForm')"></el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        password2: "",
        email: "",
        code: "",
        verifymsg: "发送验证码", // 要设置成动态的data，而不是直接填写在按钮里是因为data需要变化，直接操作data方便一点。
        verifyflag: false // 测试现在按钮是否可以点击，因为60秒之内不能重复发验证码
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          {
            required: true,

            message: "请确认您的密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请正确输入您的邮箱",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请正确输入您的验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    sendMsg() {
      // 找个that接住this,省了this指向不同的作用域而找不到数据。
      const that = this;
      // 确定是否name和email字段填写好了
      let namePass, emailPass;
      // validateField顾名思义，单独的验证某项是否填写完成。
      this.$refs.ruleForm.validateField("name", context => {
        //context是ruleForm里的Message，比如说你没填name你的message提示的是请输入用户名。这个请输入用户名就是context
        namePass = context;
      });
      // 同理
      this.$refs.ruleForm.validateField("email", context => {
        emailPass = context;
      });
      // 如果都填写了name和email,那么就执行发送请求。
      if (!namePass && !emailPass) {
        this.$axios
          .post("/users/verify", {
            email: this.ruleForm.email,
            username: encodeURIComponent(this.ruleForm.name)
          })
          .then(({ status, data }) => {
            //如果data有了，status爷是200,那么就改变按钮里的字，并且禁用按钮。
            if (status === 200 && data) {
              let count = 60;
              // 更改按钮中的字
              that.ruleForm.verifymsg = `剩余${count--}秒`;
              //禁用按钮
              that.ruleForm.verifyflag = true;
              //设定个计时器，一秒一次。记住count放在计时器外面，要不然每次都是60秒。
              that.timerid = setInterval(() => {
                // 每一秒过去就更改一下按钮中的数字
                that.ruleForm.verifymsg = `剩余${count--}秒`;
                if (count === 0) {
                  // 当count变成零的时候，清楚计时器，更改按钮字，然后让按钮可以点击
                  clearInterval(that.timerid);
                  that.ruleForm.verifyflag = false;
                  that.ruleForm.verifymsg = "发送验证码";
                }
              }, 1000);
            }
          });
      }
    },
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, data } = await that.$axios.post("/users/signup", {
            username: that.ruleForm.name,
            password: that.ruleForm.password,
            email: that.ruleForm.email,
            code: that.ruleForm.code
          });

          if (status == 200 && data) {
            // console(data.msg);
            alert("注册成功！");
            window.location.href = "/login";
          } else {
            alert("注册失败");
          }
        }
      });
    },
    sendEmail() {
      if (this.ruleForm.email != "") {
        const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        let isok = reg.test(this.ruleForm.email);
        if (!isok) {
          alert("邮箱格式不正确，请重新输入！");
          //   document.getElementById("EMAIL").focus();
          return false;
        } else {
          alert("ok!");
        }
      }
    },
    register() {}
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
    .sendemail {
      // position: absolute;
      // margin-left: 20px;
      margin-top: 10px;
    }
  }
}
</style>
