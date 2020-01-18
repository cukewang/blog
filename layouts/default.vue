<template>
  <div class="body1">
    <div class="container animated slideInDown">
      <header>
        <Myheader :location="this.location" />
      </header>
      <main class="main">
        <nuxt />
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
  }
};
</script>

<style lang="scss">
@import "@/assets/css/animate.css";
html {
  height: 100%;
  background: hsl(230, 33%, 53%);
  // body {
  //   height: 100%;
  //   #__nuxt {
  //     height: 100%;
  //   }
  //   #__layout {
  //     height: 100%;
  //   }
  // }
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
    // background: #5f6caf;
    // height: 100%;
    //
    padding-bottom: 20px;
    .container {
      margin: 0 auto;
      flex: 0 1 auto;
      max-width: 1000px;
      background: #edf7fa;
      min-width: 400px;
      box-shadow: 0px 1px 12px #555;
    }
  }
}
</style>
