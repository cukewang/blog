// 导出相应的配置，然后可以方便的用下面的数据，改的话也比较方便修改。
export default {
  dbs: "mongodb://127.0.0.1:27017/myblog2",
  redis: {
    get host() {
      return "127.0.0.1";
    },
    get port() {
      return 6379;
    }
  },
  smtp: {
    get host() {
      return "stmp.qq.com";
    },
    get user() {
      return "470557449@qq.com";
    },
    get pass() {
      return "pfpeqwdkgcybbiif";
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
