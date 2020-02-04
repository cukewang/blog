<template>
  <div class="comment_container">
    <h2 v-if="this.location == '评论'">评论({{ context.length }}条)</h2>
    <h2 v-if="this.location == '留言'">留言({{ context.length }}条)</h2>
    <div class="comment_card" v-for="i in context" :key="i._id">
      <h3 class="name">#{{ i.num }} {{ i.username }} 说：</h3>
      <!-- <p>{{ i.context }}</p> -->
      <p v-html="i.context"></p>
      <span style="margin-top: 10px;">{{ i.data }}</span>
      <span @click="quote(i)" class="quote">#引用</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    context: {
      type: Array
    }
  },
  data() {
    return {
      location: "",
      num: 0
    };
  },
  created() {
    let num = 1;
    if (this.context) {
      this.context.forEach(element => {
        element.num = num++;
        element.data = moment(element.data).format("YYYY-MM-DD HH:mm:ss");
      });
    } else {
      this.context = [];
    }
    // console(this.context);
  },
  computed: {
    date() {
      // return moment(this.context.data).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    quote(e) {
      this.$emit("upload", e);
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
.comment_container {
  h2 {
    margin: 30px 0 2px;
  }
  blockquote {
    background: #eee;
    padding: 10px;
    margin-bottom: 5px;
  }
  .comment_card {
    margin-bottom: 10px;
    h3 {
      margin: 10px 10px 2px 0;
      display: inline-block;
    }
    .quote {
      cursor: pointer;
      // color: #fe9801;
      border-bottom: 2px solid #fe9801;
    }
  }
}
</style>
