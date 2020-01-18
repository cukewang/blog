<template>
  <div class="reply_container">
    <h2 v-if="this.location == '评论'">发表你的评论:</h2>
    <h2 v-if="this.location == '留言'">发表你的留言:</h2>
    <el-input
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 8 }"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="200"
      resize="none"
      class="input1"
    >
    </el-input>
    <el-button @click="submit()" class="button">发表</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      location: ""
    };
  },
  methods: {
    submit() {
      alert("奥利给!");
    }
  },
  mounted() {
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
