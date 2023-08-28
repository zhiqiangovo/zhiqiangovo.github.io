## 1：echarts 引入百度地图

1：首先注册百度地图开放平台，控制台中应用管理配置访问应用 AK。

2：进入项目中，在 index.html 中引入百度地图 JS API 脚本

```html
<script
  type="text/javascript"
  src="https://api.map.baidu.com/getscript?v=3.0&&ak=kc0ywMhSIG7HT4I8gB5L2DPaL3tFBoiQ"
></script>
```

3：在需要使用地图的文件中引入 echarts，extension

```vue
<template>
  <div id="map"></div>
</template>
<script lang="ts" setup>
 import * as echarts from 'echarts'     // echars5 引入方式
 import 'echarts/extension/bmap/bamp'
 const echart = echarts.init(document.querySelector("#map") as HTMLElement);
type EChartsOption = echarts.EChartsOption;
let option: EChartsOption;
 option = {
     ..... // 对应echarts配置
 }
 echart.setOption(option);
</script>
```

4：再根据需要的地图设置 option，进行对应配置，至此，地图加载完成

## 2：elemetui 问题

在使用 elementui 时，使用按需引入的方式引入 ui 组件时，或者使用 element-plus 中的 ts 的 types 时，会报错

**模块 ""element-plus"" 没有导出的成员 "ElMessage"。你是想改用 "import ElMessage from "element-plus"" 吗?ts(2614)**

解决问题：

1：在 ts.config.json 文件中对 auto-imports.d.ts 和 components.d.ts 进行配置

tsconfig.app.json(新版时会出现这个文件，ts5)

```json
{
    ”...“,
    "include": [
        "env.d.ts",
        "src/**/*",
        "src/**/*.vue",
        "*.vue",
        "auto-imports.d.ts",
        "components.d.ts"
  	],
	"..."
}
```
