<template>
  <div class="header_container">
    <header class="header_top">
      <div class="left">
        <el-input
          class="input"
          v-model="search"
          placeholder="请输入搜索关键字"
          @keyup.enter.native="gosearch"
        ></el-input>
        <i class="el-icon-search search" @click="gosearch()"></i>
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

      <div class="header_nav">
        <ul>
          <li class="nav_item">
            <a href="/">随笔</a>
          </li>
          <li class="nav_item dropdown">
            <a class="dropbtn">
              随笔标签
              <i class="el-icon-arrow-down triangle"></i>
            </a>
            <div class="dropdown-content">
              <div
                class="ditem"
                v-for="item in myclass"
                :key="item.name"
                @click="go(item.name)"
              >{{item.name}}</div>
            </div>
          </li>
          <li class="nav_item">
            <a href="/editor">新随笔</a>
          </li>
          <li class="nav_item">
            <a href="/me">关于我</a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    location: String
  },
  data() {
    return {
      myclass: [],
      search: ""
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
    go(e) {
      window.location.href = `/tag?type=${e}`;
    },
    gosearch() {
      window.location.href = `/search?keyword=${this.search}`;
    }
  },
  async created() {
    const { status, data } = await this.$axios.get("/article/getclass");

    if (status == 200) {
      this.myclass = data.articleClassnum;
    }
  }
};
</script>

<style lang="scss">
.header_container {
  background: #fff;
  border-bottom: 1px solid #aaa;
  height: 60px;

  .header_top {
    a {
      text-decoration: none;
      font-size: 16px;
      line-height: 60px;
      color: #000000;
    }

    .left {
      position: absolute;
      left: 0;
      line-height: 60px;
      margin-left: 30px;
      transition: all 1s;

      .input {
        // width: 0px;
        // visibility: hidden;

        width: 0;
        opacity: 0;
        position: absolute;
        transition: all 1s;
        font-size: 16px;
        .el-input__inner {
          border-radius: 30px;
        }
      }
      .search {
        position: absolute;
        line-height: 60px;
        transition: all 1s;
        font-size: 20px;
        padding: 0 15px;
      }
      &:hover {
        .search {
          transform: translateX(200px);
        }
        .input {
          width: 200px;
          opacity: 1;
        }
      }
    }

    .header_user {
      position: absolute;
      right: 0;
      margin-right: 30px;
      display: flex;
      justify-content: flex-end;
      .register {
        margin-left: 10px;
      }
    }

    .header_nav {
      text-align: center;
      // /* 下拉按钮样式 */
      a:hover {
        color: #8eace4;
      }
      .ditem:hover {
        color: #8eace4;
        cursor: pointer;
        // background-color: #f3f3f3;
      }

      .dropbtn {
        // background-color: #4caf50;
        color: #000;
        padding: 16px;
        font-size: 18px;
        border: none;
        cursor: pointer;
      }

      // /* 容器 <div> - 需要定位下拉内容 */
      .dropdown {
        position: relative;
        transition: all 1s;
      }

      // /* 下拉内容 (默认隐藏) */
      .dropdown-content {
        height: 0;
        transform: translateY(-100%);
        transition: all 1s;
        overflow: hidden;
        position: absolute;
        background-color: #fff;
        width: 120px;
        z-index: -1;
        border-radius: 0 0 5px 5px;
      }

      // /* 下拉菜单的链接 */
      .dropdown-content .ditem {
        color: black;
        line-height: 35px;
        text-decoration: none;
        display: block;
        height: 34px;
      }
      .dropdown-content .ditem:last-child {
        height: 40px;
      }

      // /* 鼠标移上去后修改下拉菜单链接颜色 */
      .dropdown-content .ditem:hover {
        color: #8eace4;
        // background-color: #f3f3f3;
        // transition: all 0.5s;
      }

      // /* 在鼠标移上去后显示下拉菜单 */
      .dropdown:hover .dropdown-content {
        height: auto;
        transform: translateY(0%);
      }

      li {
        list-style: none;
        line-height: 60px;
        display: inline-block;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        a {
          text-decoration: none;
          font-size: 16px;
          color: #000000;
        }
      }
      .nav_item > a {
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
}
</style>
