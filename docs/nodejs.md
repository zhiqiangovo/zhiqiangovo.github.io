## NodeJs

## 一：概述

### 1：白话 node

1. Nodejs 不属于**JavaScript**应用，也不是编程语言，指的是跨平台的**JavaScript**运行时环境。
2. Nodejs 是构建在 V8 引擎之上，而 V8 引擎是由**C/C++**编写，所以，本质上我们的 JavaScript 需由**C/C++**转化后执行。
3. Nodejs 使用异步 I/O 和事件驱动的设计理念，（所谓 I/O，就是指 input 和 output），可以高效处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，异步 I/O 最终都是由**libuv**事件循环库去实现的。
4. Nodejs 使用**npm**作为包管理工具，相当于 python 的 pip，java 的 Maven。
5. Nodejs 适用于一些 IO 密集应用，不适合 CPU 密集型应用，（所谓 CPU 密集，指图像的处理，或者音频处理需要大量数据结构和算法），nodejsIO 依靠 libuv 有较强的处理能力，而由于 nodejs 是单线程的原因，会造成 CPU 占用率高的问题。若有此方面需求，可使用 C++插件编写，或使用 nodejs 提供的**cluster**。

### 2：应用场景

**前端**：Vue Angular React nuxtjs nextjs

**后端**：serverLess， epxress， Nestjs， koa ， gRPC 服务 ，爬虫 Puppeteer cheerio， BFF 层 网关层，及时性应用 socket.io

**桌面端**：electron，tauri，NWjs

**移动端**：weex，ionic，hybrid，React Native

**基建端**：webpack， vite， rollup， gulp，less，scss ，postCss，babel， swc，inquire， command ，shelljs

**嵌入式**：Ruff js

**单元测试**：jest， vitest， e2e

**CICD**：Jenkins， docker， Husky， miniprogram-ci

**反向代理**：http-proxy， Any-proxy

## 二：NPM

### 1：npm

npm（Node package Manger）是 nodejs 的包管理工具，是基于命令行的工具，用于帮助开发者在自己的项目中安装，升级，移除和管理依赖项。

- 类似于 PHP 的 Composer
- 类似于 Java 的 Maven
- 类似于 Python 的 pip
- 类似于 Rust 的 Cargo

### 2：npm 命令

- **npm init**：初始化一个新的 npm 的项目，创建 package.json 文件
- **npm install**：安装一个包或一组包，并且会在当前目录存放一个 mode_modules
- **npm install package-name** : 安装指定包
- **npm install package-name --save**：安装指定的包，并将添加到 package.json 文件的依赖列表中
- **npm install package-name --save-dev**：安装指定的包，并将其添加到 package.json 文件的开发依赖中
- **npm install -g package-name**：全局安装指定的包
- **npm update package-name**：更新指定的包
- **npm uninstall package-name**：卸载指定的包
- **npm run script-name**：执行 package.json 文件中定义的脚本命名
- **npm search keyword**：搜索 npm 库中包含指定关键字的包
- **npm info pageage-name**：查看指定包的详细信息
- **npm list**：列出当前项目中安装的所有包
- **npm outdated**：列出当前项目中需要更新的包
- **npm audit**：检查当前项目中的依赖是否存在安全漏洞
- **npm publish**：发布自己开发的包到 npm 库中
- **npm login**：登录到 npm 账户
- **npm logout**：注销当前 npm 账户
- **npm link**：将本地模块链接到全局 node_modules 目录下
- **npm config list**：用于列出所有 npm 的配置信息
- **npm get registry**：用于获取当前 npm 配置中的 registry 配置项的值。registry 配置用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址
- **npm set registry** 、**npm config set registry registry-url**命令，将 registry 配置项的值修改为指定的 registry-url 地址

### 3：package json

- **name**：项目名称，必须是唯一的字符串，通常使用小写字母和连字符的组合
- **version**：项目版本号，通常采用语义化版本规范
- **description**：项目描述
- **main**：项目的主入口文件路径，通常是一个 javascript 文件
- **keywords**：项目的关键字列表，方便他人搜索和发现项目
- **author**：项目作者的信息，包括姓名，邮箱，网址等
- **license**：项目的许可证类型，可以是自定义的许可类型或者常见的开源许可证（如 MIT,Apache 等）
- **dependencies**：项目所依赖的包的列表，这些包会在项目运行时自动安装
- **devDependencies**：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用
- **peerDependencies**：项目的同级依赖，即项目所需要的模块被其他模块依赖
- **scripts**：定义了一些脚本命名，比如启动项目，运行测试
- **repository**：项目代码仓库的信息，包含类型，网址
- **bugs**：项目 bug 报告地址
- **homepage**：项目的官方网站或者文档地址

**vession**三段式版本号，如 1.0.0 大版本号 次版本号 修订号，大版本号一般是有重大变化才会升级，次版本号一般是增加功能进行升级，修订号一般是修改 bug 进行升级

**npm Install** 安装模块是扁平化安装，但有时候会出现嵌套情况是因为版本不同。例如 A 依赖 C1.0，B 依赖 C1.0，D 依赖 C2.0，此时 C1.0 就会被放到 A B 的 node_modules 下，C2.0 就会被放到 D 模块下的 node_modules
