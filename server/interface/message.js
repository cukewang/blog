import Router from "koa-router";
import messageModel from "../dbs/modules/message";
import mongoose from "mongoose";

const router = new Router({ prefix: "/message" });

// 获取留言
router.get("/getmessage", async ctx => {
  const state = await messageModel.find({}).sort({ _id: -1 });

  if (state) {
    ctx.body = {
      code: 0,
      message: state
    };
  } else {
    ctx.body = {
      code: -1,
      message: ""
    };
  }
});

// 添加新留言
router.post("/upload", async ctx => {
  const { username, date, content, email, web } = ctx.request.body;
  const state = await messageModel.create({
    username,
    date,
    content,
    email,
    web
  });

  if (state) {
    ctx.body = {
      code: 0,
      msg: "上传成功"
    };
  }
});

router.post("/reply", async ctx => {
  const { id, username, replyname, date, content } = ctx.request.body;
  const sid = mongoose.Types.ObjectId(id);
  const state = await messageModel.findByIdAndUpdate(sid, {
    $push: {
      comments: {
        username,
        replyname,
        date,
        content
      }
    }
  });

  if (state) {
    ctx.body = {
      code: 0,
      msg: "操作成功"
    };
  } else {
    ctx.body = {
      code: -1,
      msg
    };
  }
});

export default router;
