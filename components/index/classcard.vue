<template>
  <div class="class_container">
    <h3>随笔分类</h3>
    <ul>
      <li
        v-for="item in content"
        :key="item.name"
        @click="goclass(item.name)"
        class="pointer"
      >{{ item.name }}({{ item.num }})</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Array }
  },
  methods: {
    goclass(param) {
      this.$emit("getClassArticle", param);
    }
  }
};
</script>

<style lang="scss">
.class_container {
  background: #e3f5fa;

  padding: 10px;
  margin-top: 20px;
  border-top: 3px solid #ffb677;

  // background: #ffb677;

  ul {
    margin-top: 5px;
    li {
      cursor: pointer;
    }
  }
}
</style>
