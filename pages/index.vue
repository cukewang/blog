<template>
  <div class="index_container">
    <Slogan />
    <div class="box">
      <section v-if="this.article.length != 0">
        <Artcard v-for="item in article" :key="item._id" :context="item" />
      </section>
      <section v-else style=" text-align: center;margin-top: 20px;">没有数据奥！</section>
      <!-- <aside>
        <Infocard :content="articlemsg" />
        <Classcard :content="classmsg" @getClassArticle="getClassArticle" />
      </aside>-->
    </div>
  </div>
</template>

<script>
import Artcard from "../components/index/articlecard";
import Infocard from "../components/index/infocard";
import Classcard from "../components/index/classcard";
import Slogan from "../components/index/mine";

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
    Slogan
  },
  methods: {
    async getClassArticle(myclass) {
      // console(myclass);
      const { status, data } = await this.$axios.get(
        `/article/getclassarticle?artclass=${myclass} `
      );
      // // console(status);
      // // console(data);
      if (status == 200 && data) {
        this.article = data.list;
      } else {
        // console("搞错了");
      }
    }
  },
  async mounted() {
    // console(this.classmsg);
    // console(this.articlemsg);
    // console(this.article);
  }
};
</script>

<style lang="scss">
.index_container {
  // width: 100%;
  margin: 0 10px;
  z-index: 1;
  box-sizing: border-box;
  .box {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    position: relative;
    section {
      flex: 1;
      min-width: 200px;
    }

    aside {
      flex: 0 0 220px;
      margin-left: 20px;
      // background: yellow;
    }
  }
}
</style>
