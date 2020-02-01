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
  const res = await articleModel
    .find({}, "_id date pageview header abstract commoent class")
    .sort({ _id: -1 });
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

// 获取分类文章列表
router.get("/getclassarticle", async ctx => {
  const artclass = ctx.query.artclass;
  console.log(artclass);
  const res = await articleModel
    .find({
      class: { $elemMatch: { $eq: artclass } }
    })
    .sort({ _id: -1 });
  console.log(res);
  if (res) {
    ctx.body = {
      code: 0,
      list: res
    };
  } else {
    ctx.body = {
      code: -1,
      list: ""
    };
  }
});

//  获取文章分类
router.get("/getclass", async ctx => {
  const res = await articleModel.find({}, "class");
  const res2 = [];
  const res3 = {};
  const res4 = [];
  // 把类别不去重都拿下来
  res.forEach(element => {
    element.class.forEach(element => {
      res2.push(element);
    });
  });

  // 把类别计数
  res2.forEach(element => {
    res3[element] = res3[element] + 1 || 1;
  });

  // 将类别分类为对象
  for (const key in res3) {
    if (res3.hasOwnProperty(key)) {
      res4.push({
        name: key,
        num: res3[key]
      });
    }
  }

  // 排序类别
  res4.sort((a, b) => a - b);

  ctx.body = {
    code: 0,
    msg: "成功了兄弟！",
    articleClassnum: res4
  };
});

// 获取文章信息
router.get("/articleclass", async ctx => {
  const num = await articleModel.find({}).count();
  const res = await articleModel.find({}, "commoent pageview");
  let commentcount = 0;
  let pageview = 0;
  res.forEach(element => {
    element.commoent.forEach(ele => {
      commentcount++;
    });
    pageview += element.pageview;
  });
  if (num) {
    ctx.body = {
      code: 0,
      articlenum: num,
      comment: commentcount,
      pageview: pageview
    };
  } else {
    ctx.body = {
      code: -1,
      articlenum: "",
      comment: "",
      pageview: ""
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
    ctx.body = {
      code: 0,
      msg: "成功了兄弟！"
    };
  } else {
    ctx.body = {
      code: -1,
      msg: "出现未知错误"
    };
  }
});
// 删除文章
router.get("/delete", async ctx => {
  const id = ctx.query.id;
  const sid = mongoose.Types.ObjectId(id);

  let state = await articleModel.remove({ _id: sid });

  if (state) {
    ctx.body = {
      code: 0,
      msg: "操作成功！"
    };
  }
});
// 发表评论
router.post("/commit", async ctx => {
  const { id, username, context, date } = ctx.request.body;
  const sid = mongoose.Types.ObjectId(id);

  let state = await articleModel.findByIdAndUpdate(
    sid,
    {
      $push: { commoent: { username, context, date } }
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
