# dsh-hero-theme

**DeepSeek Harness Web 与内嵌桌面工作区**的 **HeroUI v3 主题构建器**。在 设置 → 通用 中实时调节 Accent、Base、字体、Radius、Radius Form 与明暗模式，插件会重新生成完整的 DSH 令牌层。

English docs: [README.md](README.md)。

## 可调项

| 控件 | 范围 | 默认值 | 作用 |
| --- | --- | --- | --- |
| Accent | 色相 `0–360` | `196.72` | Accent `oklch(62.04% 0.195 hue)`、焦点环、渐变起点 |
| Base | 彩度 `0–0.02` | `0.0015` | 所有中性色的彩度（背景、表面、文字、边框） |
| Font Family | Inter / System UI / Geist / Manrope / IBM Plex Sans / JetBrains Mono | Inter | `--dsw-font-family` 与品牌字体栈 |
| Radius | `0–1.25rem` | `0.5rem`（8px） | HeroUI 圆角比例与卡片圆角（`3×`） |
| Radius Form | `0–1.5rem` | `0.75rem`（12px） | 输入框与表单字段 |
| Theme | 浅色 / 深色 / 跟随系统 | 深色 | 基础明暗方案与 `ctx.theme.setTheme()` |

默认强调色是 HeroUI 构建器 hue `196.72` 的青绿色；渐变第二色自动取色轮 +88°。字体需系统已安装，否则回退 System UI。

## 调色板生成规则

生成器与 HeroUI v3 主题构建器一致：

| 令牌 | 浅色 | 深色 |
| --- | --- | --- |
| background | `oklch(97.02% base hue)` | `oklch(12.00% base hue)` |
| foreground | `oklch(21.03% base hue)` | `oklch(99.11% base hue)` |
| surface | `oklch(100% 0.53×base hue)` | `oklch(21.03% 2×base hue)` |
| surface-secondary | `oklch(95.24% 0.8×base hue)` | `oklch(25.70% 1.53×base hue)` |
| accent | `oklch(62.04% 0.195 hue)` | 相同 |
| success / warning / danger | HeroUI 语义色相，按 accent 色相差的 `12%` 旋转 | 相同 |

圆角：HeroUI 组件令牌使用 `3×`（卡片）、`2.5×`（Tabs）、`2× + 6px`（Popover），表单圆角独立。DSH 语义圆角映射为 `xs 0.5× / sm 1× / md 1.5× / lg 2× / xl-panel 3×`，这样原生行、菜单和卡片保持原本的比例，不会退化成 HeroUI 原始的 2/4/6px 小圆角。所有 DSH alias、specific、Shiki、圆角、阴影与时长令牌都由这份配置生成，不会留下未覆盖的组件。

## 品牌视觉层

在生成令牌之上，`src/hero.css` 补齐 HeroUI 的辨识度：

- **渐变主操作**：accent → accent+88°，带柔和光晕。
- **极光底色**：对话画布与侧栏叠加 accent/紫色渐变。
- **HeroUI 表面**：输入区与 Modal 使用卡片圆角；Dropdown/Select 菜单使用 22px 下拉圆角。气泡、选中会话、菜单、弹层都不会透出页面内容。
- **HeroUI 控件**：36px 次要按钮与 0.97 按压缩放；Theme 使用带滑动指示器的 Tabs；Font Family 使用 Select（旋转箭头、150ms 缩放淡入、100ms 退出、描边勾选动画）。
- **HeroUI 滑杆**：20px 轨道、两端 12px 透明端帽、28×20 accent 滑块与 24×16 内芯；底层覆盖一个不可见的原生 range，保留指针、键盘与 aria 语义。
- **动效**：按钮 `scale(0.97)`、弹层/弹窗/Tooltip 进入缩放、2s skeleton 扫光、用户消息入场；全部尊重 `prefers-reduced-motion`。

## 安装

```sh
# DSH Web
dsh plugin --profile web add dsh-hero-theme
# DSH Desktop
dsh plugin --profile desktop add dsh-hero-theme
```

或手动装入 Web profile：

```sh
cd ~/.dsh/profiles/web
pnpm add dsh-hero-theme
```

把 `"dsh-hero-theme"` 加入该 profile `package.json` 的 `dsh.profile.bundles`，重启 profile。

打开 **设置 → 通用 → HeroUI 主题**。拖动 Accent/Base/Radius/Radius Form，选择字体与明暗；每次修改立即生效并写入当前 profile 的 Cordis patch。**重置** 回到构建器默认值。

## 实现方式

1. Host 声明六个易失 Config 字段：`theme`、`accentHue`、`baseChroma`、`fontFamily`、`radius`、`fieldRadius`。
2. 浏览器端读取该配置，调用 `buildAllTokens()` 同时生成浅色与深色调色板。
3. 通过一次 `ctx.theme.overrideTokens()` 应用；`ctx.theme.setTheme(config.theme)` 切换内置基础明暗。
4. 设置行通过 ConfigForms 写回每个字段（滑杆写入做 180ms 防抖）。
5. 如果用户在内置“外观”行切换明暗，会同步写入 `theme`，刷新后保持一致。

覆盖层的释放函数用 `queueMicrotask` 延迟执行，避免在 `theme/change` 派发过程中重入。

## 平台兼容

`dsh-hero-theme` 是 Web 客户端插件（`dsh.client.platform: "web"`）。DSH Desktop 内嵌 Web 应用，因此主题通过 Web 客户端插件链路作用于桌面工作区；Desktop 使用独立 profile。本包只负责内嵌工作区外观，不添加原生菜单、托盘或窗口外壳 UI。

需要 DSH `^0.2.2-rc.1`。

## 开发

```sh
npm run build   # 重新生成 lib/client.js 与 lib/index.js
npm run check   # 构建、语法、API 契约、调色板与对比度检查
```

`src/palette.js` 是颜色、圆角与字体的唯一事实来源。构建时注入客户端 bundle；其默认输出受令牌集合与对比度检查保护。

## 目录结构

```
dsh-hero-theme/
├── package.json          # dsh.bundle.patch + dsh.client 清单
├── cordis.patch.yml      # loader 入口插入（id: dsh-hero-theme）
├── src/
│   ├── index.js          # Host Config schema（六个易失字段）
│   ├── palette.js        # HeroUI v3 调色板生成器
│   ├── client.tpl.js     # 浏览器端：构建器设置行 + 令牌应用
│   └── hero.css          # 品牌渐变、极光、不透明表面、动效
├── scripts/
│   ├── build.mjs         # 零依赖构建
│   └── check-compat.mjs  # DSH API、调色板、对比度与 CSS 契约
├── LICENSES/             # HeroUI 衍生内容使用的 Apache-2.0 文本
└── lib/                  # 生成产物（安装/打包时自动重建）
```

## 归属与许可

插件代码使用 MIT 许可（见 [LICENSE](LICENSE)）。设计令牌与交互数值取自 **HeroUI**（Apache-2.0），见 [NOTICE](NOTICE) 与 [LICENSES/Apache-2.0.txt](LICENSES/Apache-2.0.txt)。

本项目是独立主题，与 HeroUI 官方无隶属或背书关系。
