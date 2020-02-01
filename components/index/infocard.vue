<template>
  <div class="info_card">
    <h3>博客信息</h3>
    <ul>
      <li>随笔:{{ content.articlenum }}</li>
      <li>评论:{{ content.comment }}</li>
      <li>浏览量:{{ content.pageview }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
.info_card {
  &:first-child {
    margin-top: 0px;
  }
  background: #e3f5fa;

  margin-top: 20px;
  padding: 10px;
  border-top: 3px solid #ffb677;
  // background: #ffb677;

  ul {
    margin-top: 5px;
  }
}
</style>
