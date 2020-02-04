<template>
  <div class="tag_container">
    <p class="title">"{{$route.query.type}}"</p>
    <Articlecard v-for="item in article" :key="item._id" :context="item" />
  </div>
</template>

<script>
import Articlecard from "../components/index/articlecard";
export default {
  data() {
    return {
      article: []
    };
  },
  components: {
    Articlecard
  },
  async mounted() {
    const { status, data } = await this.$axios.get(
      `/article/getclassarticle?artclass=${this.$route.query.type}`
    );
    if (status == 200 && data.code == 0) {
      this.article = data.list;
    }
  }
};
</script>

<style lang="scss">
.tag_container {
  .title {
    text-align: center;
    font-size: 50px;
    color: rgb(142, 172, 228);
    padding: 30px;
  }
}
</style>