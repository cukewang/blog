import Router from "koa-router";
import articleModel from "../dbs/modules/article";
import mongoose from "mongoose";
// import { ElStep } from "element-ui/types/step";

let router = new Router({ prefix: "/article" });

// 获取文章内容
router.get("/getcontext", async ctx => {
  const sid = mongoose.Types.ObjectId(ctx.query.id);
  // console.log(sid);
  const result = await articleModel.findById(sid);
  if (result) {
    ctx.body = {
      code: 0,
      article: result
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "查询失败"
    };
  }
});

// 获取文章列表
router.get("/getlist", async ctx => {
  // find()第一个参数是条件，如果是空的话就自动获取所有。 第二个参数是投影列表，投影表示只取下面有用的数据。
  const res = await articleModel.find(
    {},
    "_id date pageview header abstract commoent"
  );
  if (res) {
    ctx.body = {
      code: 0,
      msg: "成功了兄弟！",
      article: res
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "获取失败"
    };
  }
});

// 上传文章
router.post("/upload", async ctx => {
  const { header, class: myclass, context, abstract, date } = ctx.request.body;
  let state = await articleModel.create({
    header,
    class: myclass,
    context,
    abstract,
    date
  });
  if (state) {
    console.log(state);
    ctx.body = {
      code: 0,
      msg: "成功了兄弟！"
    };
  }
});

// 编辑文章
router.post("/update", async ctx => {
  const {
    id,
    header,
    class: myclass,
    context,
    abstract,
    date
  } = ctx.request.body;
  const sid = mongoose.Types.ObjectId(id);
  let state = await articleModel.findByIdAndUpdate(sid, {
    header,
    class: myclass,
    context,
    abstract,
    date
  });
  if (state) {
    console.log(state);
    ctx.body = {
      code: 0,
      msg: "成功了兄弟！"
    };
  }else{
    ctx.body={
      code=-1,
      msg:"出现未知错误"
    }
  }
});

// 发表评论
router.post("/commit", async ctx => {
  const { id, username, context,date } = ctx.request.body;
  const sid = mongoose.Types.ObjectId(id);

  let state = await articleModel.findByIdAndUpdate(
    sid,
    {
      $push: { commoent: { username, context,date } }
    },
    { new: true }
  );

  if (state) {
    console.log(state);
    ctx.body = {
      code: 0,
      msg: "操作成功！"
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "遇到问题了！"
    };
  }
});

// 增加浏览量
router.post("/pageview", async ctx => {
  const { id } = ctx.request.body;
  const sid = mongoose.Types.ObjectId(id);
  let state = await articleModel.findByIdAndUpdate(sid, {
    $inc: { pageview: 1 }
  });
  if (state) {
    console.log(state);
    ctx.body = {
      code: 0,
      msg: "操作成功！"
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "操作失败"
    };
  }
});

export default router;
