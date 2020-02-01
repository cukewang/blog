<template>
  <div class="body1">
    <div class="container">
      <header>
        <Myheader :location="this.location" @getClassArticle="handle" />
      </header>
      <main class="main">
        <nuxt ref="nuxta" />
      </main>
      <footer>
        <Myfooter />
      </footer>
    </div>
  </div>
</template>

<script>
import Myheader from "../components/public/header";
import Myfooter from "../components/public/footer";
export default {
  components: {
    Myheader,
    Myfooter
  },
  data: () => {
    return {
      location: ""
    };
  },
  mounted() {
    this.location = window.location.href.split("/").pop();
  },
  methods: {
    handle(e) {
      console.log("default触发");
      console.log(e);
      console.log(this.$refs);
      // if (this.$refs.nuxta.getClassArticle()) {
      //   console.log("default内的if触发");
      //   this.$refs.nuxta.getClassArticle(e);
      // }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/animate.css";
html {
  height: 100%;
  background: #4f98ca;
}
* {
  font-family: "Times New Roman", Georgia, Serif;
  margin: 0;
  padding: 0;
  ul,
  li {
    list-style: none;
  }
  .body1 {
    padding-bottom: 20px;
    .container {
      margin: 0 auto;
      flex: 0 1 auto;
      max-width: 1000px;
      background: #edf7fa;
      min-width: 400px;
      box-shadow: 0px 1px 12px #999;
    }
  }
}
</style>
