# H&H 官网电子色卡交接

## 页面来源和入口

H&H 选色工坊同步自和膜官网 [V8 选色页](https://github.com/laishengyang1-coder/hamorey-website/commit/22a8802087084b0176751d0d966d62e048806abc)。同一组 117 个色号可在扇形样板和四个 3D 视图中预览。页面、选色单和展车牌使用 H&H 品牌，支持英文和简体中文。

| 入口 | 操作 |
|---|---|
| [English](https://hhppf.com/color-studio/?lang=en) · [中文](https://hhppf.com/color-studio/?lang=zh) | 从中英文首页的 TPU 改色车衣卡片或表面工艺展示区进入。右上角可切换语言。 |
| [星云紫样板](https://hhppf.com/color-studio/?lang=zh&code=TPU-048P&mode=swatch) | 拖动跟手、松手后惯性滑动并回正，速度越快扇面张开越大，停稳后动画休眠。双击中央或侧卡拿起，拖动查看反光，双击或使用放回按钮归位。 |
| [同色 Model Y 整车](https://hhppf.com/color-studio/?lang=zh&code=TPU-048P&mode=car&car=modely) | 在工坊内原位切换样板、整车、腰线近景、微距和光影球。车型、灯光和色号随视图共享。 |

灯光参数为 `light=studio|gallery|sunset`。色号使用 `code`，语言使用 `lang=en|zh`，视图为 `mode=swatch|car|closeup|macro|sphere`，车型为 `car=model3|modely`。复制当前浏览器地址可分享所选状态。初版 `/color-studio/vehicle.html` 的旧链接会把原 `view/model` 转为 `mode/car` 后进入同一工坊。

## 接手位置

| 文件（均相对仓库根目录） | 维护内容 |
|---|---|
| `tools/color-studio/src/pages/ColorStudioPage.tsx`、同目录样式 | 桌面与手机布局、玻璃风格控件、五视图、语言和链接状态。 |
| `tools/color-studio/src/components/color-studio/` | 扇形卡片与拾取动画、漆膜外观、3D 展台、色谱和选色单 PNG。 |
| `tools/color-studio/src/components/color-studio/studioEnvironment.ts`、`ColorStudioCanvas.tsx` | 用 `/assets/hh-logo.png` 生成橙白 H&H 车牌，按两款车各自牌照位分别装在前后保险杠。换模型时应从车头、车尾分别检查。 |
| `tools/color-studio/src/config/colorStudio.ts`、`colorStudioVault.ts` | H&H AIOC™ 规格、车型、灯光与打包后的 117 色。中英文共用同一色号和外观参数。 |
| `color-studio/models/`、`color-studio/paint/`、`color-studio/scenes/` | 站内模型、碳纤维与锻碳纹理、落日全景。模型来源见 [ATTRIBUTION.txt](../color-studio/models/ATTRIBUTION.txt)。 |
| `tools/color-studio/index.html`、`src/main.tsx`、`vite.config.js` | 构建入口与配置。生成的 `color-studio/index.html` 和 `color-studio/bundle/` 随源码一起提交。 |
| 根目录 `index.html`、`index-zh.html` | 英中首页的产品与询盘入口。旧俄语首页跳转到英文。 |

产品规格采用 H&H 官网 AIOC™ 资料。色库含 42 款水晶、27 款金属、32 款珠光、7 款双色或变色龙、9 款特殊工艺。样板首屏使用二维界面。开启省流量、移动数据、慢速网络，或在无法确认 Wi-Fi 的触屏设备上，进入 3D 时才开始请求车型。模型加载失败时可选择重试或返回当前色卡。

## 构建和正式发布

颜色的可编辑源文件为 `tools/color-studio/catalog/swatches.json`。在 `tools/color-studio/` 运行 `npm run pack:swatches` 可单独生成 `src/config/colorStudioVault.ts`。正常构建执行 `npm ci`、`npm run build`，会自动打包颜色并检查类型。生成新版本时保留上次发布的分包供已打开的页面继续加载。部署前分别用中英文、桌面与手机尺寸验收色谱检索、拾取与放回、选色单 PNG、询盘入口，以及两个车型的前后牌照。

H&H 正式域名 `hhppf.com` 和 `www.hhppf.com` 绑定 Cloudflare Pages 项目 `hhppf-website`。先将业务提交推送到 GitHub 的 `main`，再从同一提交导出完整官网。在含 `wrangler.toml`、`_headers`、`_redirects`、`functions/`、质保和展厅资源的导出目录执行下列命令，导出时排除开发目录 `tools/`。

```sh
wrangler pages deploy . --project-name hhppf-website --branch main --commit-hash <发布提交>
```

新版车型使用 `.hmy` 文件。旧版两款 `.glb` 的 gzip 响应头继续单独配置，替换同名资源时应更新 URL 版本参数。发布后核对正式域名返回的新入口、分包、模型和纹理，并用真实入口操作选色页。

## 语言兼容

首页、色卡、选色单 PNG、质保门户与质保条款只提供英中两种语言。以前的俄语首页会打开英文首页；旧选色链接保留可用的色号、灯光、车型与视图。质保页接收 `?lang=en|zh`，旧语言选择回落到英文。

## 发布沿革

2026-11-19 的 `45770d3` 是早期独立排版版，曾将装车拆为独立页面。用户随后确认采用和膜原页的布局与操作，现行版本恢复为单页面的五视图工坊。

### 2026-11-27 V8 同步与 H&H 展车牌

新增 14 色，沿用 H&H 已有英中命名与产品规格。同步新版扇形色卡、玻璃控件、三套照明，以及金属、珠光、变色和碳纤维的漆面表现。Model 3、Model Y 的前后牌照均使用 H&H 官网标志。桌面可下载 900 × 1200 选色单，手机可打开图片后长按保存。

在本地生产构建检查了桌面英文和模拟手机中文的五视图切换、色谱搜索、拾取、PNG 生成与语言切换，分别从两款车的正面和背面检查了牌照。模拟模型请求失败后，验证了重试、返回原色卡以及旧俄语车型链接的英文回退。

### 2026-11-19 原版移植上线

- 业务提交 [fa1863a](https://github.com/laishengyang1-coder/hhppf-website/commit/fa1863a83b0608b43685f1ed02bc24b60d856897)。Cloudflare 正式部署 `0c4a2774-caf2-452b-a487-981b739a56e6` 指向相同提交。[发布快照](https://0c4a2774.hhppf-website.pages.dev/color-studio/?lang=zh) · [GitHub Pages 构建](https://github.com/laishengyang1-coder/hhppf-website/actions/runs/44495588854)。
- 北京时间 17:21–17:22，以同一星云紫色号、相同屏幕和停止轮转的状态对照两个正式域名。在 1440×900 桌面和 390×844 手机尺寸，顶部栏、色卡信息栏、样板台、扇面、中央色卡、底栏和色珠的位置及尺寸均一致。103 个色号与原版顺序相同。
- 在正式 H&H 页面用鼠标和模拟触屏实测双击侧卡、拖动与放回、三语色谱检索、定制选色单、对应语言的样品询盘、两款 GLB 车型和五视图页内切换。两端共保存六份带 H&H 标志的三语 PNG，均为 900×1200。额外检查 320 像素宽的布局。尚未在微信内置浏览器或物理手机上实测。
- 根域、www 的三语首页与深链均通过验证，115 个静态文件与提交逐字节一致。旧版俄语 Model Y 链接转入统一工坊后保留语言、色号、车型和视图。质保首页和只读探活正常。

### 2026-11-19 V4 同步与全站双语发布

- 本轮对应和膜 [f1ff80d](https://github.com/laishengyang1-coder/hamorey-website/commit/f1ff80df1af693f0edcd046d638172236cfe6d6e)。随后上游的 `bf2e3b3` 只补发布文档。H&H 业务提交 [a6b83aa](https://github.com/laishengyang1-coder/hhppf-website/commit/a6b83aab207e494f604931d5019106578f822ab2)，兼容旧入口的发布提交 [280e4fe](https://github.com/laishengyang1-coder/hhppf-website/commit/280e4feba04d1b45ff2f8889793777e693f072ac)，Cloudflare 生产部署 ID 为 `f348b881-494c-434a-9646-76c8797f4485`。
- 新色库涵盖 37 款水晶与 23 款金属的主色、偏色更新，103 款的完整色值和材质参数均与 V4 核对。上游纠正的 30 个英文名已对齐，其余沿用 H&H 已有命名。在官网将云山蓝、星云紫与 V4 同一画面取样，两种屏幕尺寸的中央漆面 RGB 一致。
- 正式站通过桌面和触屏仿真验收。色卡轮转停稳后相邻间距为 13.5°，停稳取样期间没有继续申请动画帧。彩虹条中性段筛出 32 款，269° 筛出 7 款，清除后恢复 103 款。两种语言的双击拾取、拖动、放回、搜索、900×1200 PNG、五种视图和两种车型均通过。省流量或 2G 时不会预取模型。
- 首页、色谱、PNG、询盘、质保门户及质保条款已切为英中两语。原俄语首页永久跳转到英文，保留查询参数和页内锚点；旧色卡分享链接转英文并保留色号、车型、灯光与视图。入口脚本和旧缓存地址使用兼容跳转。语言下线不涉及后台历史询盘或质保记录。
- 根域和 www 均核对了正式构建的九份脚本、样式、漆面纹理与 GLB。Model 3 和 Model Y 的 gzip 响应分别为 965,379 和 1,095,011 字节，解压后与仓库模型逐字节一致。正式门户检查仅浏览和预填表单，没有提交询盘、登录或登记。
