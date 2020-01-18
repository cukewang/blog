const Koa = require("koa");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");

import bodyParser from "koa-bodyparser"; // 这个一开始就要加，不加的话解析不出来request.body。post请求就白给。
import json from "koa-json";
import mongoose from "mongoose";
import dbConfig from "./dbs/config";
import Redis from "koa-redis";
import session from "koa-generic-session";
import users from "./interface/users";
import passport from "./interface/utils/passport";

const app = new Koa();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = app.env !== "production";

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  //这个是加密用的
  app.keys = ["my", "keyskeys"];
  //是否设置代理
  app.proxy = true;
  //session的前缀
  app.use(session({ key: "my", prefix: "my:uid", store: new Redis() }));
  //mongoose链接Mongodb
  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  });
  //初始化passport
  app.use(passport.initialize());
  //让passport使用session
  app.use(passport.session());

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }
  //解析json用的中间件
  app.use(json());
  // bodyParser中的extendTypes必须要加，要不然passport就无法解析username和passport
  app.use(
    bodyParser({
      extendTypes: ["json", "form", "text"]
    })
  );
  // 加载路由中间件
  app.use(users.routes()).use(users.allowedMethods());

  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
