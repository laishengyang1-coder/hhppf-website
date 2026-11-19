# H&H 官网电子色卡交接

## 页面来源和入口

H&H 选色工坊直接移植和膜官网的选色页。布局、动画、底部色轨、全系色谱、定制选色单及五个视图以和膜业务提交 [95028f4](https://github.com/laishengyang1-coder/hamorey-website/commit/95028f491a67af1c445816ed22acb621fdaf796e) 为基准。品牌使用 H&H 官方标志、橙色强调和 H&H 产品资料，支持英语、简体中文和俄语。

| 入口 | 操作 |
|---|---|
| [English](https://hhppf.com/color-studio/?lang=en) · [中文](https://hhppf.com/color-studio/?lang=zh) · [Русский](https://hhppf.com/color-studio/?lang=ru) | 从三个语言首页的 TPU 改色车衣卡片或表面工艺展示区进入。右上角可切换语言。 |
| [星云紫样板](https://hhppf.com/color-studio/?lang=zh&code=TPU-048P&mode=swatch) | 轮转时扇面微张再收拢。双击中央或侧卡拿起，拖动查看反光，双击或使用放回按钮归位。 |
| [同色 Model Y 整车](https://hhppf.com/color-studio/?lang=zh&code=TPU-048P&mode=car&car=modely) | 在工坊内原位切换样板、整车、腰线近景、微距和光影球。车型、灯光和色号随视图共享。 |

色号使用 `code`，语言使用 `lang=en|zh|ru`，视图为 `mode=swatch|car|closeup|macro|sphere`，车型为 `car=model3|modely`。复制当前浏览器地址可分享所选状态。初版 `/color-studio/vehicle.html` 的旧链接会把原 `view/model` 转为 `mode/car` 后进入同一工坊。

## 接手位置

| 文件（均相对仓库根目录） | 维护内容 |
|---|---|
| `tools/color-studio/src/pages/ColorStudioPage.tsx`、`ColorStudioFanLayout.css` | 桌面与手机布局、五视图、状态同步、语言切换、品牌标志与选色入口。 |
| `tools/color-studio/src/components/color-studio/` | 扇形卡片与拾取动画、漆膜外观、Three.js 场景、可搜索色谱、选色单与 PNG 导出。 |
| `tools/color-studio/src/config/colorStudio.ts` | 103 色名称与色号、三语表面工艺、材质参数、车型与灯光。中文、英文、俄文共用同一色号和物理参数。 |
| `color-studio/models/`、`paint/`、`finishes/` | 站内模型、七张漆面纹理及 103 张原册切片。源模型作者及许可说明见 [ATTRIBUTION.txt](../color-studio/models/ATTRIBUTION.txt)。 |
| `tools/color-studio/index.html`、`src/main.tsx`、`vite.config.js` | 独立页面入口及构建配置。生成的 `color-studio/index.html` 和 `color-studio/bundle/` 随源码一起提交。 |
| 根目录三份 `index*.html` | H&H 的三语产品入口。询盘、质保和其余官网内容继续使用原站页面。 |

产品参数按 H&H 官网 AIOC™ 资料维护，色号对应的五种表面效果分组用于找色，不等同于 H&H 商务产品页的四条系列。2D 样板首屏只加载选色界面与漆面素材，3D 场景在切换视图时加载。整车和近景另请求所选车型。

## 构建和正式发布

在 `tools/color-studio/` 运行 `npm ci` 与 `npm run build`，完成类型校验并生成静态页面和分包。构建前可清理上次的 `color-studio/bundle/`；同目录下的模型和材质须保留。部署前按色号、语言、两个屏幕尺寸验证五视图、拾取与放回、弹层、询盘去向及 PNG 导出。

H&H 正式域名 `hhppf.com` 和 `www.hhppf.com` 绑定 Cloudflare Pages 项目 `hhppf-website`，采用 Direct Upload。将业务提交推送到 GitHub 的 `main`，从同一提交导出生产文件，在含有 `wrangler.toml`、`functions/` 和现有质保资源的目录发布到该项目的 `main`。GitHub Pages 另外自动构建；以自定义域名实际加载的版本作最终验收。

## 发布沿革

2026-11-19 的 `45770d3` 是早期独立排版版，曾将装车拆为独立页面。用户随后确认采用和膜原页的布局与操作，现行版本恢复为单页面的五视图工坊。
