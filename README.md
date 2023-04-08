# Alpha_Frontend

本项目架构由 MashishiLn 参考`Fast-vue3`和`vue-element-admin`构建。

考虑大家的 coding 习惯和工具链实用性（~~指轮子的易用程度~~），架构用 ts 写，开发**以 js 为主**，支持混用。

混用的范围目前包括`api`,`store`,`router`目录和所有`.vue`文件。

### 1. 运行

本项目包管理工具使用`npm`

运行命令：

```shell
    npm install
    npm run dev
```

### 2. 目录结构说明

`./src`:

```
    - api                   // 根据功能模块封装成js文件
        - user.js
    - assets                // 静态资源
    - components            // 组件
    - router                // 路由
    - store                 // pinia状态管理
        - module            // 功能模块
    - style                 // 全局样式表
    - utils                 // 全局工具类
        - http              // axios封装
    - view                  // 页面视图
        - login
            - {components)  // 可选:局部组件
            - index.vue     // 页面本体
    - App.vue
    - main.ts
```

### 3. 开发建议

- 使用 WebStorm
- 安装 prettier 插件，打开：文件 | 设置 | 语言和框架 | JavaScript | Prettier

  以下两项勾选，提升 coding 体验：

  <img src="https://gitee.com/chen-canyu/pictures/raw/master/imgs/image-20230408171816306.png"/>
