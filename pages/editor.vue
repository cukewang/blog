<template>
  <div class="editor_cotainer">
    <div class="editor_header">
      <p>标题：</p>
      <el-input v-model="article.header" placeholder="请输入内容"></el-input>
    </div>
    <div class="editor_context">
      <p>内容：</p>
      <editor-bar
        v-model="article.context"
        :isClear="isClear"
        @change="change"
      ></editor-bar>
      <p>摘要：</p>
      <el-input
        type="textarea"
        :rows="2"
        maxlength="100"
        show-word-limit
        placeholder="请输入摘要"
        resize="none"
        v-model="article.abstract"
      ></el-input>
    </div>
    <div class="editor_class">
      <span>文章标签:</span>
      <el-select
        v-model="article.class"
        @change="change2"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="editor_control">
      <el-button plain size="small" @click="message" v-if="!iseditor"
        >发布</el-button
      >
      <el-button plain size="small" @click="save" v-else>保存</el-button>
      <el-button plain size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import EditorBar from "../components/public/editor";

export default {
  components: { EditorBar },
  data() {
    return {
      isClear: false,
      article: {
        header: "",
        context: "",
        class: [],
        abstract: "",
        date: ""
      },
      // 多选选项
      options: [
        // {
        //   value: "HTML",
        //   label: "HTML"
        // },
        // {
        //   value: "CSS",
        //   label: "CSS"
        // },
        // {
        //   value: "JavaScript",
        //   label: "JavaScript"
        // }
      ]
    };
  },
  async mounted() {
    if (this.$store.state.user.user != "") {
      if (this.$store.state.user.user.manger == 1) {
        const { status: status0, data: data0 } = await this.$axios.get(
          "/article/getclass"
        );
        data0.articleClassnum.forEach(element => {
          element.value = element.name;
          element.label = element.name;
        });
        this.options = data0.articleClassnum;
        if (this.$route.query.article) {
          const { status, data } = await this.$axios.get(
            `/article/getcontext?id=${this.$route.query.article}`
          );
          if (status == 200 && data) {
            this.article = data.article;
          } else {
            alert("获取数据失败");
          }
        }
      } else {
        alert("登录也不让你写");
        window.location.href = "/";
      }
    } else {
      alert("没登录呢，快回去");
      window.location.href = "/";
    }
  },
  computed: {
    iseditor() {
      return this.$route.query.article ? true : false;
    }
  },
  methods: {
    async save() {
      const { status, data } = await this.$axios.post("article/update", {
        id: this.$route.query.article,
        header: this.article.header,
        class: this.article.class,
        context: this.article.context,
        abstract: this.article.abstract,
        date: new Date()
      });

      if (status == 200 && data) {
        alert("更新成功");
        // // console(this.$route.query);
        window.location.href = `article?id=${this.$route.query.article}`;
      } else {
        alert("更新失败");
      }
    },
    change(val) {
      // // console(val);
    },
    send() {
      alert(this.detail);
    },
    change2(e) {
      // console(e);
    },
    async message() {
      const { status, data } = await this.$axios.post("/article/upload", {
        header: this.article.header,
        class: this.article.class,
        context: this.article.context,
        abstract: this.article.abstract,
        date: new Date(),
        comment: "",
        pageview: 1
      });
      if (status == 200 && data.code == 0) {
        alert("发布成功");
        // console(data.id);
        window.location.href = `article?id=${data.id}`;
      }
    }
  }
};
</script>

<style lang="scss">
.editor_cotainer {
  margin: 10px 50px;
  p {
    margin: 10px auto;
  }
  .editor_class {
    margin: 10px auto;
  }
}
</style>
