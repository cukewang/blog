// 导出相应的配置，然后可以方便的用下面的数据，改的话也比较方便修改。
export default {
  //dbs 表示需要连接的服务器
  dbs: "mongodb://127.0.0.1:27017/myblog2",
  //redis对象是提供redis的信息
  redis: {
    get host() {
      return "127.0.0.1";
    },
    get port() {
      return 6379;
    }
  },
  // smtp对象是利用邮箱来
  smtp: {
    get host() {
      return "stmp.qq.com";
    },
    get user() {
      return "470557449@qq.com";
    },
    // 这个pass码是qq邮箱给提供的。下面是随机打的不是真实的。
    get pass() {
      return "pfpeqwdkgcybbiif";
    },
    // 制造一个随机的验证码
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    // 创建一个时间，时间就是发送邮箱的时间。
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
