<template>
  <div class="index_container">
    <section v-if="this.article.length != 0">
      <Crumbs />
      <Artcard v-for="item in article" :key="item._id" :context="item" />
    </section>
    <section v-else style=" text-align: center;margin-top: 20px;">没有数据奥！</section>
    <aside>
      <Infocard :content="articlemsg" />
      <Classcard :content="classmsg" @getClassArticle="getClassArticle" />
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
    const res2 = await $axios.get("/article/articleclass");
    const res3 = await $axios.get("/article/getclass");

    return {
      article: res.data.article,
      articlemsg: res2.data,
      classmsg: res3.data.articleClassnum
    };

    // return {
    //   article: "",
    //   articlemsg: "",
    //   classmsg: ""
    // };
  },
  components: {
    Artcard,
    Infocard,
    Classcard,
    Crumbs
  },
  methods: {
    async getClassArticle(myclass) {
      console.log(myclass);
      const { status, data } = await this.$axios.get(
        `/article/getclassarticle?artclass=${myclass} `
      );
      // console.log(status);
      // console.log(data);
      if (status == 200 && data) {
        this.article = data.list;
      } else {
        console.log("搞错了");
      }
    }
  },
  async mounted() {
    console.log(this.classmsg);
    console.log(this.articlemsg);
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
