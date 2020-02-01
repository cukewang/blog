<template>
  <div class="article_container">
    <h1>{{ context.header }}</h1>
    <div class="info">
      <span class="item">发布时间:{{ commentDate }}</span>
      <span class="item">浏览量:{{ context.pageview }}</span>
      <span class="item">评论量:{{ context.commoent.length }}</span>
    </div>
    <div v-html="context.context"></div>
    <div v-if="ismanger" class="control">
      <span @click="edit" class="pointer">
        <i class="el-icon-edit"></i> 编辑
      </span>

      <span @click="deleteart" class="pointer">
        <i class="el-icon-delete"></i> 删除
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default {
  props: {
    context: {
      type: Object
    }
  },
  computed: {
    commentDate() {
      return moment(this.context.date).format("YYYY-MM-DD HH:mm:ss");
    },
    ismanger() {
      return this.$store.state.user.user.manger == 1 ? true : false;
    }
  },
  mounted() {
    hljs.initHighlightingOnLoad();
    // console.log(this.context);
  },
  methods: {
    edit() {
      // alert(666);
      window.location.href = `/editor?article=${this.context._id}`;
    },
    async deleteart() {
      var sure = confirm("删除后不会恢复，确认删除？");
      if (sure) {
        const { status, data } = await this.$axios.get(
          `/article/delete?id=${this.$route.query.id}`
        );
        if (status == 200 && data) {
          console.log(data);
        } else {
          console.log("操作失败");
        }
      }
    }
  }
};
</script>

<style lang="scss">
.article_container {
  img {
    max-width: 100%;
    margin-top: 10px;
    height: auto;
    margin-bottom: 10px;
  }
  code {
    // border-radius: 20px;
    display: block;
    background: #eee;
    margin: 10px 100px 10px 0px;
    border: 1px solid #ccc;
    padding: 20px;
  }
  .pointer {
    cursor: pointer;
    margin-right: 10px;
  }
  h1 {
    margin: 10px 0 5px;
  }
  .info {
    .item {
      margin-right: 5px;
      line-height: 35px;
    }
  }
  .control {
    margin-top: 10px;
  }
}
</style>
