<template>
  <div class="header_container">
    <header class="header_top">
      <div class="title">
        <a href="/">王梓瑞的博客</a>
      </div>
      <div class="header_user" v-if="log_reg">
        <div class="nolog" v-if="hasloged == ''">
          <a href="/login">登录</a>
          <a href="/register" class="register">注册</a>
        </div>
        <div class="log" v-else>
          <a href="#">欢迎您 {{ hasloged.username }}</a>
          <a href="#" @click="logout()">退出登录</a>
        </div>
      </div>
    </header>
    <nav class="header_nav" v-if="log_reg">
      <ul>
        <li class="nav_item">
          <a href="/">随笔</a>
        </li>
        <li class="nav_item"><a href="/editor">新随笔</a></li>
        <!-- <li class="nav_item">
          <el-dropdown>
            <span class="el-dropdown-link">
              标签
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in myclass" :key="item.name">
                <div @click="getclass(item.name)">{{item.name}}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>-->
        <li class="nav_item">
          <a href="/me">关于我</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    location: String
  },
  data() {
    return {
      myclass: []
    };
  },
  computed: {
    // 判断现在是不是在登录状态或者是注册状态，如果是就把登录注册隐藏
    log_reg() {
      return this.location != "login" && this.location != "register";
    },
    hasloged() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    logout() {
      this.$axios.get("/users/exit").then(res => {
        if (res.status == 200 && res.data.code == 0) {
          alert("退出成功");
          window.location.href = "/";
        }
      });
    },
    aoligei() {
      console.log(666);
    }
    // getclass(e) {
    //   console.log("header触发");
    //   this.$emit("getClassArticle", e);
    // }
  },
  async created() {
    // const { status, data } = await this.$axios.get("/article/getclass");
    // if (status == 200 && data) {
    //   this.myclass = data.articleClassnum;
    // }
  }
};
</script>

<style lang="scss">
.header_container {
  .header_top {
    display: flex;
    background: #ffb677;
    justify-content: space-between;
    a {
      text-decoration: none;
      font-size: 16px;
      line-height: 50px;
      color: #000000;
    }
    .title {
      line-height: 50px;
      margin-left: 30px;
    }
    .header_user {
      // float: right;
      margin-right: 30px;
      display: flex;
      justify-content: flex-end;
      // background: blue;
      .register {
        margin-left: 10px;
      }
    }
  }
  .header_nav {
    ul,
    li {
      list-style: none;
      display: inline-block;
      margin-left: 5px;
      line-height: 40px;
      margin-top: 10px;
      a {
        text-decoration: none;
        font-size: 16px;
        color: #000000;
      }
    }
    li:first-child {
      margin-left: 45px;
    }
    .nav_item > a {
      font-size: 18px;
      line-height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
