<template>
  <div class="article_container">
    <h1 class="title">{{ context.header }}</h1>
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
    // // console(this.context);
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
          // console(data);
        } else {
          // console("操作失败");
        }
      }
    }
  }
};
</script>

<style lang="scss">
.article_container {
  overflow: hidden;
  li {
    margin-left: 35px;
    // list-style: disc;
  }
  .title {
    text-align: center;
  }
  img {
    max-width: 100%;
    margin-top: 10px;
    height: auto;
    margin-bottom: 10px;
  }
  pre {
    code {
      // border-radius: 20px;
      display: block;
      background: #fff;
      margin: 10px 0px 10px 0px;
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 10px;
    }
  }
  code {
  }
  p {
    code {
      color: #f665a9;
      padding: 2px 10px;
      background: rgb(238, 255, 254);
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .pointer {
    cursor: pointer;
    margin-right: 10px;
  }

  .info {
    text-align: center;
    .item {
      margin-right: 5px;
      line-height: 35px;
    }
  }
  .control {
    margin-top: 10px;
  }
  margin: 0 10px;
  h1,
  h2,
  h3,
  h4 {
    margin: 20px 0px;
  }
  p {
    margin: 16px 0;
  }
  // code {
  //   display: inline-block;
  // }

  blockquote {
    margin-left: 10px;
    background: #fff;
    border-left: 5px solid #b7e1ec;
    padding: 5px 10px;
    // line-height: 5px;
  }
}
</style>
