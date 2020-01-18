<template>
  <div class="article_container">
    <h1>老铁你在干嘛</h1>
    <div class="info">
      <span class="item">发布时间:2019-2-23</span>
      <span class="item">浏览量:223</span>
      <span class="item">评论量:12</span>
    </div>
    <article>
      引入 Element 你可以引入整个
      Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。
      ¶完整引入 在 main.js 中写入以下内容： import Vue from 'vue'; import
      ElementUI from 'element-ui'; import
      'element-ui/lib/theme-chalk/index.css'; import App from './App.vue';
      Vue.use(ElementUI); new Vue({ el: '#app', render: h => h(App) });
      以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
      ¶按需引入 借助
      babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
      首先，安装 babel-plugin-component： npm install babel-plugin-component -D
      然后，将 .babelrc 修改为： { "presets": [["es2015", { "modules": false
      }]], "plugins": [ [ "component", { "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk" } ] ] }
      接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在
      main.js 中写入以下内容： 引入 Element 你可以引入整个
      Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。
      ¶完整引入 在 main.js 中写入以下内容： import Vue from 'vue'; import
      ElementUI from 'element-ui'; import
      'element-ui/lib/theme-chalk/index.css'; import App from './App.vue';
      Vue.use(ElementUI); new Vue({ el: '#app', render: h => h(App) });
      以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
      ¶按需引入 借助
      babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
      首先，安装 babel-plugin-component： npm install babel-plugin-component -D
      然后，将 .babelrc 修改为： { "presets": [["es2015", { "modules": false
      }]], "plugins": [ [ "component", { "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk" } ] ] }
      接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在
      main.js 中写入以下内容：引入 Element 你可以引入整个
      Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。
      ¶完整引入 在 main.js 中写入以下内容： import Vue from 'vue'; import
      ElementUI from 'element-ui'; import
      'element-ui/lib/theme-chalk/index.css'; import App from './App.vue';
      Vue.use(ElementUI); new Vue({ el: '#app', render: h => h(App) });
      以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
      ¶按需引入 借助
      babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
      首先，安装 babel-plugin-component： npm install babel-plugin-component -D
      然后，将 .babelrc 修改为： { "presets": [["es2015", { "modules": false
      }]], "plugins": [ [ "component", { "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk" } ] ] }
      接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在
      main.js 中写入以下内容：引入 Element 你可以引入整个
      Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element。
      ¶完整引入 在 main.js 中写入以下内容： import Vue from 'vue'; import
      ElementUI from 'element-ui'; import
      'element-ui/lib/theme-chalk/index.css'; import App from './App.vue';
      Vue.use(ElementUI); new Vue({ el: '#app', render: h => h(App) });
      以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
      ¶按需引入 借助
      babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
      首先，安装 babel-plugin-component： npm install babel-plugin-component -D
      然后，将 .babelrc 修改为： { "presets": [["es2015", { "modules": false
      }]], "plugins": [ [ "component", { "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk" } ] ] }
      接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在
      main.js 中写入以下内容：
      babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
      首先，安装 babel-plugin-component： npm install babel-plugin-component -D
      然后，将 .babelrc 修改为： { "presets": [["es2015", { "modules": false
      }]], "plugins": [ [ "component", { "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk" } ] ] }
      接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在
      main.js 中写入以下内容：
    </article>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.article_container {
  h1 {
    margin: 10px 0 5px;
  }
  .info {
    .item {
      margin-right: 5px;
      line-height: 35px;
    }
  }
}
</style>
