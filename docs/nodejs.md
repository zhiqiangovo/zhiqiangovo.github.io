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
