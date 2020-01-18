<template>
  <div class="message_container">
    <Comment />
    <MessageCard />
  </div>
</template>

<script>
import MessageCard from "../components/article/reply";
import Comment from "../components/article/comment";
export default {
  components: {
    MessageCard,
    Comment
  }
};
</script>

<style lang="scss">
.message_container {
  margin: 0 50px;
}
</style>
