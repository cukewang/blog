<template>
  <div class="reply_container">
    <h2>发表你的评论:</h2>
    <el-input
      placeholder="请输入你的用户名"
      v-model="username"
      maxlength="20"
      class="input0"
      :disabled="islogin"
      >></el-input
    >
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="200"
      resize="none"
      class="input1"
    ></el-input>
    <el-button @click="submit()" class="button">发表</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      location: "",
      username: "",
      islogin: false
    };
  },
  props: {
    content: {
      type: String
    }
  },
  watch: {
    content() {
      this.textarea = this.content;
    }
  },
  methods: {
    async submit() {
      if (this.username == "") {
        this.username = "忘记写名字的老铁";
      }
      const { status, data } = await this.$axios.post("article/commit", {
        id: this.$route.query.id,
        username: this.username,
        context: this.textarea,
        date: new Date()
      });

      if (status == 200 && data) {
        // // console(data);
        location.reload(true);
      }
    }
  },
  mounted() {
    if (this.$store.state.user.user.username) {
      this.islogin = true;
      this.username = this.$store.state.user.user.username;
    } else {
      this.username = "";
    }

    // // console(this.$store.state.user.user.username);
    window.location.href
      .split("/")
      .pop()
      .indexOf("message")
      ? (this.location = "评论")
      : (this.location = "留言");
  }
};
</script>

<style lang="scss">
.reply_container {
  h2 {
    margin-top: 20px;
  }
  .input0 {
    margin-top: 10px;
  }
  .input1 {
    margin-top: 10px;
    textarea {
      border-radius: 0px;
    }
  }
  .button {
    margin-top: 10px;
    border-radius: 0;
  }
}
</style>
