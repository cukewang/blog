<template>
  <div class="index_container">
    <section>
      <Crumbs />
      <Artcard v-for="item in article" :key="item._id" :context="item" />
    </section>
    <aside>
      <Infocard />
      <Classcard />
    </aside>
  </div>
</template>

<script>
import Artcard from "../components/index/articlecard";
import Infocard from "../components/index/infocard";
import Classcard from "../components/index/classcard";
import Crumbs from "../components/index/crumbs";

export default {
  async asyncData({ $axios }) {
    const res = await $axios.get("/article/getlist");
    return { article: res.data.article };
  },
  components: {
    Artcard,
    Infocard,
    Classcard,
    Crumbs
  },
  mounted() {
    console.log(this.article);
  }
};
</script>

<style lang="scss">
.index_container {
  margin: 0 50px;
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  section {
    flex: 1;
    min-width: 200px;
  }

  aside {
    flex: 0 0 200px;
    margin-left: 50px;
    // background: yellow;
  }
}
</style>
