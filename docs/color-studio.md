# H&H 官网电子色卡交接

## 访问与产品入口

正式页面支持英语、简体中文和俄语。三个语言首页都可以从 TPU 改色车衣产品卡和表面工艺展示区进入。产品卡原有的技术参数入口和询盘按钮继续可用。

| 入口 | 用途 |
|---|---|
| [English](https://hhppf.com/color-studio/?lang=en) · [中文](https://hhppf.com/color-studio/?lang=zh) · [Русский](https://hhppf.com/color-studio/?lang=ru) | 浏览电子色卡。分享地址可用 `code=TPU-048P` 指定色号。 |
| [中文星云紫装车](https://hhppf.com/color-studio/vehicle.html?lang=zh&code=TPU-048P&view=car&model=modely) | 预览选定色号。支持 Model 3、Model Y，以及整车、近景、微距、光影球四个视图。 |

## 样板与数据

- 样板可以自动轮转，卡片围绕同一转轴依次轻轻张开、收回。双击或双触一张色卡可将它拿起；拖动查看漆面反光，再放回。也可以使用界面按钮。色谱支持查找色名与色号、按表面效果筛选。
- `color-studio/catalog.js` 保存 103 个唯一色号，包括三语展示名、底色、偏色、四色带与物理材质。中文名称、色号和渲染参数以同次和膜色卡库为来源。英文和俄文为站内展示名，两站对照以产品色号为准。
- 色库里的五种效果分组用于找色。H&H 产品页的四条 AIOC™ 产品系列及其商务参数继续在原产品页维护，未按色号推断厚度、售价、供货或质保。三语页面都提醒最终选色以实物为准。
- `color-studio/studio.js`、`studio.css` 和 `paint/` 分别控制扇形动作、卡面叠层和七张漆面纹理，电子色卡首屏无需加载车模。三个语言首页通过 `?lang=en|zh|ru` 传入语言。
- 装车页沿用色卡的语言与选色，`vehicle.js` 管理页面控件，`vehicle-renderer.js` 负责 3D。可编辑渲染源码和锁定版本的构建依赖在 `tools/color-studio/`，修改源码后在该目录运行 `npm ci && npm run build`，将产物与源码一起提交。模型在 `color-studio/models/`，作者与来源见同目录 [ATTRIBUTION.txt](../color-studio/models/ATTRIBUTION.txt)。第三方渲染库声明随 [vehicle-licenses.txt](../color-studio/vehicle-licenses.txt) 提供。

## 发布

官网基线为 `7c484df`。先将本轮业务提交推送至 GitHub 的 `main`。Cloudflare Pages 项目 `hhppf-website` 为 Direct Upload，绑定 `hhppf.com` 和 `www.hhppf.com`。按项目的正式分支发布同一提交，保留 `functions/`、`wrangler.toml`、现有质保 D1 和照片 R2 绑定。GitHub Pages 构建和 Cloudflare 正式部署分别核对。

验收时从三个语言首页点入，检查切语和返回、按色号深链、色谱筛选、双击及双触拾取、装车后切换车型。随后在根域和 www 检查真实页面及 3D 资源。官网页面的业务变更不涉及质保数据库结构、表单字段或已有保修记录。
