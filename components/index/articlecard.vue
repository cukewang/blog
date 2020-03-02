<template>
  <div class="art_container">
    <article>
      <h3>{{ context.header }}</h3>
      <p style="margin-top: 10px;">
        {{ context.abstract }}
        <span @click="godetails()" class="gocontent">阅读全文 ></span>
      </p>

      <div class="info">
        <ul>
          <i class="el-icon-collection-tag"></i>

          <li v-for="item in context.class" :key="item.name" class="small">{{ item }}</li>
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
    // // console(this.context);
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
@media only screen and (min-width: 600px) {
  .info {
    display: flex;
    justify-content: space-between;
  }
}
@media only screen and (max-width: 600px) {
  .info {
    display: block;
  }
}
.art_container {
  // border-radius: 10px;
  // background: #fff;
  // box-shadow: 0px 1px 2px #c4c4c4;
  // padding: 20px;
  h3 {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  &:first-child {
    margin-top: 0px;
  }
  .gocontent {
    cursor: pointer;
    color: rgb(142, 172, 228);

    border-bottom: 1px solid rgb(142, 172, 228);
  }

  // margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 10px;
  // border-top: 3px solid #ffb677;

  // background: #e3f5fa;

  //   border-radius: 20px;
  //   background: yellowgreen;
  article {
    .info {
      margin-top: 10px;
      // text-align: right;

      vertical-align: middle;
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
