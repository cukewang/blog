<template>
  <div class="body1">
    <header class="topheader">
      <Myheader :location="this.location" @getClassArticle="handle" />
    </header>
    <div class="container">
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
    handle(e) {}
  }
};
</script>

<style lang="scss">
@import "@/assets/css/animate.css";
html {
  height: 100%;
  background: #f7f7f7;
  min-width: 300px;
}
* {
  font-family: "Times New Roman", Georgia, Serif;
  margin: 0;
  padding: 0;
  ul,
  li {
    // list-style: none;
  }
  .body1 {
    padding-bottom: 20px;
    .topheader {
      position: sticky;
      top: 0px;
      z-index: 100000;
    }
    .container {
      margin: 0 auto;
      flex: 0 1 auto;
      max-width: 1000px;
      background: #f7f7f7;
      // min-width: 400px;
      // box-shadow: 0px 1px 12px #999;
    }
  }
}
</style>
