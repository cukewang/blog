<template>
  <div class="articlepage_container">
    <Crumbs />
    <Article />
    <Comment />
    <Reply />
  </div>
</template>

<script>
import Crumbs from "../components/index/crumbs";
import Article from "../components/article/article";
import Comment from "../components/article/comment";
import Reply from "../components/article/reply";
export default {
  components: {
    Crumbs,
    Article,
    Comment,
    Reply
  }
};
</script>

<style lang="scss">
.articlepage_container {
  margin: 0 50px;
}
</style>
