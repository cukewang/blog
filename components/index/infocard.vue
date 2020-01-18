<template>
  <div class="info_card">
    <h3>博客信息</h3>
    <ul>
      <li>随笔:65</li>
      <li>评论:223</li>
      <li>浏览量:2131</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.info_card {
  &:first-child {
    margin-top: 0px;
  }
  background: #edf7fa;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #000000;
  ul {
    margin-top: 5px;
  }
}
</style>
