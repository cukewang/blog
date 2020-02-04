<template>
  <div class="me_container">
    <header class="mine">
      <div class="avator">
        <img src="../static/image/avater.JPG" alt="王梓瑞" />
      </div>
      <div class="content">
        <div class="left">
          <p class="name">王梓瑞</p>
          <p class="content">前端爱好者</p>
          <p
            class="content2"
          >水平不高，但好在一直在学，博客供记录学习之用。博客项目长期更新，时不时也会根据需要添加新功能。博客前后端纯手撸，有bug或者不完善的地方，欢迎下方留言建议。</p>
        </div>
      </div>
    </header>
    <div class="comment">
      <h2>留言板(20)</h2>
      <div class="reply_container">
        <h3>发表你的留言:</h3>
        <div class="box">
          <el-input
            placeholder="请输入你的用户名"
            v-model="input.username"
            maxlength="20"
            class="input0"
            :disabled="islogin"
          ></el-input>
          <el-input placeholder="请输入您的邮箱" v-model="input.email" maxlength="20" class="input0"></el-input>
          <el-input placeholder="请输入您的个人网站" v-model="input.web" maxlength="20" class="input0"></el-input>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入内容"
          v-model="input.content"
          maxlength="200"
          resize="none"
          class="input1"
        ></el-input>
        <div v-if="issubmit">
          <el-button @click="submit" class="button">发表</el-button>
        </div>
        <div v-else>
          <el-button @click="reply" class="button">回复</el-button>
          <el-button @click="issubmit = true,replyid=''" class="button">取消</el-button>
        </div>
      </div>
      <div class="list" v-for="item in content" :key="item._id">
        <h3>{{item.username}}说:</h3>
        <p class="content">{{item.content}}</p>
        <p class="date">
          <!-- 2017-2-23 10:22 -->
          {{formdate(item.date)}}
          <span class="reply" @click="goreply(item._id,null)">回复</span>
        </p>
        <div class="comments" v-for="iitem in item.comments" :key="iitem.date">
          <p class="content" v-if="iitem.replyname">
            <strong>{{iitem.username}} 回复 {{iitem.replyname}}</strong>
            ：{{iitem.content}}
          </p>
          <p class="content" v-else>
            <strong>{{iitem.username}}</strong>
            ：{{iitem.content}}
          </p>
          <div class="date">
            {{formdate(iitem.date)}}
            <span class="reply" @click="goreply(item._id,iitem.username)">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      input: {
        username: "",
        date: new Date(),
        content: "",
        web: "",
        email: ""
      },
      content: [],
      islogin: false,
      issubmit: true,
      replyid: "",
      replyname: ""
    };
  },
  computed: {},
  async mounted() {
    if (this.$store.state.user.user.username) {
      this.islogin = true;
      this.input.username = this.$store.state.user.user.username;
    } else {
      this.input.username = "";
    }

    const { status, data } = await this.$axios.get("message/getmessage");
    if (status == 200 && data.code == 0) {
      this.content = data.message;
    } else {
      alert("发布失败");
    }
  },
  methods: {
    async submit() {
      const { status, data } = await this.$axios.post("/message/upload", {
        username: this.input.username,
        date: new Date(),
        web: this.input.web,
        email: this.input.email,
        content: this.input.content
      });
      if (status == 200 && data.code == 0) {
        alert("发布成功");
        location.reload(true);
      } else {
        alert("发布失败");
      }
    },
    goreply(id, name) {
      this.issubmit = false;
      this.replyid = id;
      this.replyname = name;
    },
    async reply() {
      const { status, data } = await this.$axios.post("/message/reply", {
        id: this.replyid,
        username: this.input.username,
        date: new Date(),
        replyname: this.replyname,
        content: this.input.content
      });
      if (status == 200 && data.code == 0) {
        alert("发布成功");
        location.reload(true);
      } else {
        alert("发布失败");
      }
    },
    formdate(e) {
      return moment(e).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss">
.me_container {
  margin: 60px 50px;
  .mine {
    display: flex;
    justify-content: space-between;
    img {
      width: 200px;
      height: auto;
      border-radius: 50%;
      border: 5px solid #fff;
    }
    .content {
      .left {
        flex: 1 1 0;
        margin: 20px 20px 20px;
        min-width: 150px;
        .name {
          font-size: 40px;
        }
        .content {
          font-size: 30px;
        }
      }
    }
    .content2 {
      margin-top: 5px;
    }
  }
  .comment {
    margin-top: 50px;
    h2 {
      text-align: center;
    }
    .reply_container {
      .box {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .el-input__inner {
          border-radius: 0px;
        }
        el-input {
          width: 33%;
          border-radius: 0px;
        }
      }
      textarea {
        border-radius: 0px;
      }
      button {
        border-radius: 0px;
        margin-top: 10px;
      }
    }
  }
  .list {
    margin-top: 30px;
    p {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .content {
      // padding: 10px 0px;
      // margin-top: 10px;
    }
    .comments {
      padding: 5px 0px;
      margin-left: 20px;
      background: #eee;
      .content {
        margin-top: 5px;
      }
    }
  }
}
</style>
