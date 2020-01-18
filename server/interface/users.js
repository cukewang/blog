// koa-router必引的，不多解释
import Router from "koa-router";
// 发送验证码用redis，因为可能需求量会很大。redis效率较高
import Redis from "koa-redis";
// 用nodeMailer插件来发送邮件。
import nodeMailer from "nodemailer";
// USer模型，来操作mongodb
import User from "../dbs/modules/users";
// 用来发邮件的配置参数
import Email from "../dbs/config";
// axios来请求数据
import axios from "./utils/axios";
//来引入passprot中间件
import Passport from "./utils/passport";

// 创建一个路由，他的最开始用/users
let router = new Router({ prefix: "/users" });

// 创建一个redis的仓库。
let Store = new Redis().client;

// 发送验证码
router.post("/verify", async ctx => {
  //获取username
  let username = ctx.request.body.username;

  //这段先可以不看，看完这个verify路由结尾再回来看。
  //获得验证码的有效时间
  const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
  //如果验证码的有效时间太短，就不能再发次发送。
  //   if (saveExpire && new Date().getTime() - saveExpire < 0) {
  //     ctx.body = {
  //       code: -1,
  //       msg: "验证请求过于频繁，1分钟内1次"
  //     };
  //     return false;
  //   }
  //然后用nodeMailer创建一个transport
  let transporter = nodeMailer.createTransport({
    // server名称
    service: "qq",
    // user的名称和他的pass
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });
  //获取到验证码和时间，还有用户输入的邮箱和用户名
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  };
  // 邮件的配置文件
  let mailOptions = {
    from: `" 博客注册认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: "王梓瑞的博客注册验证码",
    html: `验证码是${ko.code}，请尽快完成注册，奥利给！`
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      // 当邮件发送成功了，就将数据保存起来，以后可以拿来用。
      Store.hmset(
        `nodemail:${ko.user}`,
        "code",
        ko.code,
        "expire",
        ko.expire,
        "email",
        ko.email
      );
    }
  });
  ctx.body = {
    code: 0,
    msg: "验证码已发送，可能会有延时，有效期1分钟"
  };
});

// 注册的逻辑;
router.post("/signup", async ctx => {
  // 先获取表单里的信息,这么写是es6的解构赋值语法
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = Store.hget(`nodemail:${username}`, "code");
    const saveExpire = Store.hget(`nodemail:${username}`, "expire");

    if (saveCode == code) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: "验证码已过期，请重新尝试"
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "请填写正确的验证码"
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "未输入验证码"
    };
  }
  let user = await User.find({ username });
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: "已被注册"
    };
    return;
  }
  let nuser = await User.create({ username, password, email });
  console.log(nuser);
  if (nuser) {
    // let res = await that.$axios.post("/users/signin", {
    //   username,
    //   password
    // });

    // if (res.code === 0) {
    ctx.body = {
      code: 0,
      msg: "注册成功"
    };
    // } else {
    //   ctx.body = {
    //     code: -1,
    //     msg: "注册失败",
    //     user: res.data.user
    //   };
    // }
  } else {
    ctx.body = {
      code: -1,
      msg: "注册失败"
    };
  }
});

router.post("/signin", async (ctx, next) => {
  return Passport.authenticate("local", (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: "登录成功",
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info
        };
      }
    }
  })(ctx, next);
});

router.get("/exit", async (ctx, next) => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

router.get("/getUser", async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    };
  } else {
    ctx.body = {
      user: "",
      email: ""
    };
  }
});

export default router;
