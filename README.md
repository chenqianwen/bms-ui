# ice-scaffold-cms

> 使用文档

命令行:

* 启动调试服务: `npm start`
* 构建 dist: `npm run build`

基础设施:

* react-router @3.x 默认采用 hashHistory 的单页应用
* 入口文件: `src/index.js`
* 导航配置: `src/navs.js`
* 路由配置: `src/routes.jsx`
* 页面文件: `src/pages`
* 组件: `src/components`

效果图:

![screenshot](https://img.alicdn.com/tfs/TB1NKRzdY9YBuNjy0FgXXcxcXXa-1920-1080.png)


menu:
mode="horizontal" 水平展示
mode="inline" 垂直展示


HeaderAsideFooterResponsiveLayout: 整个页面的布局。
  Header:  src/components/Header.jsx  头部布局
     Logo:  src/components/Logo.jsx   logo布局
       
