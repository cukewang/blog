// 引入 passprot ,然后引入本地策略，就是验证用户是否成立，最后引入操作模型。
import passport from "koa-passport";
import LocalStrategy from "passport-local";
import UserModel from "../../dbs/modules/users";

// passport 加载策略中间件，然后通过新建location对象在里面进行对用户的鉴定。
passport.use(
  //创建新的策略，然后三个参数分别是 用户名密码和回调
  new LocalStrategy(async function(username, password, done) {
    //此处用where是表示搜索的时候参数是一个对象
    let where = {
      username
    };
    // 用user的Mongoose的模型来搜索user在数据库中的记录，用res来接收
    const res = await UserModel.findOne(where);
    // 判断res是否存在， 不存在就用策略的回调函数done返回一个用户不存在的错误信息。
    if (res != null) {
      // 如果数据库里的Password和输入的password吻合，就返回一个res
      if (res.password === password) {
        return done(null, res);
      } else {
        // 不吻合就返回一个密码错误。
        return done(null, false, "密码错误");
      }
    } else {
      return done(null, false, "用户不存在");
    }
  })
);

// 序列化和反序列化，没什么大事。
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

// 导出passport集权控制中间件。
export default passport;
