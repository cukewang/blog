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
      >
      </el-input>
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
        >
        </el-option>
      </el-select>
    </div>
    <div class="editor_control">
      <el-button plain size="small">发布</el-button>
      <el-button plain size="small">保存</el-button>
      <el-button plain size="small">取消</el-button>
      <el-button plain size="small" @click="message">显示信息</el-button>
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
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      value: []
    };
  },
  methods: {
    change(val) {
      // console.log(val);
    },
    send() {
      alert(this.detail);
    },
    change2(e) {
      console.log(e);
    },
    message() {
      this.$axios
        .post("/article/upload", {
          header: this.article.header,
          class: this.article.class,
          context: this.article.context,
          abstract: this.article.abstract,
          date: new Date(),
          comment: "",
          pageview: 1
        })
        .then(res => {
          console.log(res);
        });
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
