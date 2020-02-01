<template>
  <div class="art_container" @click="godetails()">
    <article>
      <h3>{{ context.header }}</h3>
      <p>{{ context.abstract }}</p>
      <div class="info">
        <ul>
          <li v-for="item in context.class" :key="item.name" class="small">
            <i class="el-icon-paperclip"></i>
            {{item}}
          </li>
        </ul>
        <ul>
          <li class="date">{{ date }}</li>
          <li class="browse_volume">阅读量({{ context.pageview }})</li>
          <li class="comment">评论({{ context.commoent.length }})</li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    context: {
      type: Object
    }
  },
  mounted() {
    // console.log(this.context);
  },
  computed: {
    date() {
      return moment(this.context.date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    godetails() {
      window.location.href = "/article?id=" + this.context._id;
    }
  }
};
</script>

<style lang="scss">
.art_container {
  &:first-child {
    margin-top: 0px;
  }

  margin-top: 20px;
  overflow: hidden;
  padding: 10px;
  border-top: 3px solid #ffb677;

  background: #e3f5fa;
  cursor: pointer;
  //   border-radius: 20px;
  //   background: yellowgreen;
  article {
    .info {
      // text-align: right;
      display: flex;
      justify-content: space-between;
      .small {
        font-size: 15px;
        vertical-align: center;
        // margin-top: 2px;
        margin-right: 10px;
      }
      ul,
      li {
        margin-top: 2px;
        list-style: none;
        display: inline-block;
        // margin-left: 10px;
      }
    }
  }
}
</style>
