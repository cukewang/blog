<template>
  <div class="comment_container">
    <h2 v-if="this.location == '评论'">评论(12条)</h2>
    <h2 v-if="this.location == '留言'">留言(12条)</h2>
    <div class="comment_card" v-for="i in [1, 2, 3, 4, 5]" :key="i">
      <h3 class="name">#1 老铁</h3>
      <span>2019-2-12 19:44:22</span>
      <span @click="quote()" class="quote"> #引用</span>
      <p>我觉得挺好的没毛病，但是总感觉哪里出了些问题。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: ""
    };
  },
  methods: {
    quote() {
      alert("我引用了！");
    }
  },
  mounted() {
    window.location.href
      .split("/")
      .pop()
      .indexOf("message")
      ? (this.location = "评论")
      : (this.location = "留言");
  }
};
</script>

<style lang="scss">
.comment_container {
  h2 {
    margin: 10px 0 10px;
  }
  .comment_card {
    margin-bottom: 10px;
    h3 {
      margin: 10px 10px 10px 0;
      display: inline-block;
    }
    .quote {
      cursor: pointer;
    }
  }
}
</style>
