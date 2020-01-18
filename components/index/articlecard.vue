<template>
  <div class="art_container" @click="godetails()">
    <article>
      <h3>这个是标题</h3>
      <p>这个是简介，现在省略三百字..</p>
      <div class="info">
        <ul>
          <li class="date">2019-2-22</li>
          <li class="browse_volume">阅读量(299)</li>
          <li class="comment">评论(2)</li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  methods: {
    godetails() {
      window.location.href = "/article?id=1";
    }
  }
};
</script>

<style lang="scss">
.art_container {
  &:first-child {
    margin-top: 0px;
  }
  background: #edf7fa;
  margin-top: 20px;
  overflow: hidden;
  padding: 10px;
  border: 1px solid #000000;
  cursor: pointer;
  //   border-radius: 20px;
  //   background: yellowgreen;
  article {
    .info {
      text-align: right;
      ul,
      li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
</style>
