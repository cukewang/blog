import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  //标题
  header: {
    type: String,
    require: true
  },
  //类别
  class: {
    type: Array,
    require: false
  },
  //内容
  context: {
    type: String,
    require: true
  },
  // 描述
  abstract: {
    type: String,
    require: false
  },
  // 发帖日期
  date: { type: Date, default: Date.now },
  // 评论
  commoent: [
    {
      username: String,
      context: String,
      data: { type: Date, default: Date.now }
    }
  ],
  // 浏览量
  pageview: { type: Number, default: 1 }
});

export default mongoose.model("Article", ArticleSchema);
