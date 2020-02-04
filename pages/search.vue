<template>
  <div class="search_container">
    <p class="title">"{{this.$route.query.keyword}}"</p>
    <div v-if="article != ''">
      <Articlecard v-for="item in article" :key="item._id" :context="item" />
    </div>
    <div v-else class="none">暂无相关信息</div>
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
      `article/search?keyword=${this.$route.query.keyword}`
    );
    if (status == 200 && data.code == 0) {
      this.article = data.article;
    }
  }
};
</script>

<style lang="scss">
.search_container {
  .title {
    text-align: center;
    font-size: 50px;
    color: rgb(142, 172, 228);
    padding: 30px;
  }
  .none {
    text-align: center;
    font-size: 20px;
    margin: 50px;
  }
}
</style>