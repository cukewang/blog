<template>
  <div class="articlepage_container">
    <Article :context="context" />
    <Comment :context="context.commoent" @upload="upload" />
    <Reply :content="quote" />
  </div>
</template>

<script>
import Article from "../components/article/article";
import Comment from "../components/article/comment";
import Reply from "../components/article/reply";
export default {
  data() {
    return {
      quote: ""
    };
  },
  async asyncData({ route, $axios }) {
    const msg = await $axios.get(`/article/getcontext?id=${route.query.id}`);
    return { context: msg.data.article };
  },
  async mounted() {
    const res = await this.$axios.post("/article/pageview", {
      id: this.$route.query.id
    });
    // console(res);
  },
  computed: {
    contentcard() {}
  },
  methods: {
    upload(e) {
      this.quote = `<blockquote>${e.num}楼的${e.username}说: ${e.context}  </blockquote>
`;
      // console(this.quote);
    }
  },
  components: {
    Article,
    Comment,
    Reply
  }
};
</script>

<style lang="scss">
.articlepage_container {
  margin: 0 10px;
  p {
    margin: 16px 0;
  }
}
</style>
