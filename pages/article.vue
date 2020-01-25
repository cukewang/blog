<template>
  <div class="articlepage_container">
    <Crumbs />
    <Article :context="context" />
    <Comment :context="context.comment" />
    <Reply />
  </div>
</template>

<script>
import Crumbs from "../components/index/crumbs";
import Article from "../components/article/article";
import Comment from "../components/article/comment";
import Reply from "../components/article/reply";
export default {
  async asyncData({ route, $axios }) {
    const msg = await $axios.get(`/article/getcontext?id=${route.query.id}`);

    return { context: msg.data.article };
  },
  async mounted() {
    console.log(this.context);
  },
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
