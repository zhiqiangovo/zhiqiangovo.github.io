import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "阿强ovo",
  lastUpdated: true,

  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "JavaScript", link: "/javascript" },
      { text: "TypeScript", link: "/typescript" },
      { text: "NodeJs", link: "/nodejs" },
      { text: "甜甜花酿坤", link: "/fontEnd" },
    ],

    sidebar: {
      "markdown-examples": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      typescript: [
        {
          text: "typescript",
        },
      ],
    },
    footer: {
      message: "本文档由阿强编写",
      copyright: "Copyright © 2019-shizhiqiang",
    },
  },
});
