<template>
  <div class="article_container">
    <h1>{{ context.header }}</h1>
    <div class="info">
      <span class="item">发布时间:{{ commentDate }}</span>
      <span class="item">浏览量:{{ context.pageview }}</span>
      <span class="item">评论量:{{ context.commoent.length }}</span>
    </div>
    <article v-html="context.context"></article>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    context: {
      type: Object
    }
  },
  computed: {
    commentDate() {
      return moment(this.context.date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    console.log(this.context);
  }
};
</script>

<style lang="scss">
.article_container {
  h1 {
    margin: 10px 0 5px;
  }
  .info {
    .item {
      margin-right: 5px;
      line-height: 35px;
    }
  }
}
</style>
