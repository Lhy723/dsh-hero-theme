// dsh-hero-theme — browser half (client plugin bundle). GENERATED FILE:
// run `node scripts/build.mjs` to regenerate lib/client.js from
// src/client.tpl.js + src/hero.css + src/palette.js.
//
// Loaded by dsh-client-modules at /plugins/dsh-hero-theme/client.js and
// executed through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
window.__ModuleLoader__.load({
	id: "dsh-hero-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let react_dom = require("react-dom");
		let _store = require("@deepseek-ai/dsh-client-store");

		//#region dsh-hero-theme: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.hero";
		/** Profile entry id owning the visual config. */
		const SKIN_SETTINGS_ENTRY_ID = "dsh-hero-theme";
		/** Entry id of the built-in theme service's settings form. */
		const BASE_THEME_ENTRY_ID = "ui-theme";
		/** Source identity of this plugin's token-override layer. */
		const SKIN_OVERRIDE_SOURCE = "dsh-hero-theme";
		/** Config fields written by the theme builder. */
		const CONFIG_FIELDS = ["theme", "accentHue", "accentChroma", "accentLightness", "baseChroma", "vibrant", "fontFamily", "radius", "fieldRadius"];

		// The palette generator is injected verbatim. It defines
		// DEFAULT_CONFIG, FONT_OPTIONS, buildAllTokens, normalizeConfig and
		// accentColor.
		__PALETTE_SOURCE__

		/**
		 * HeroUI component stylesheet, injected while the plugin is active.
		 * Tokens carry color, radius, shadow and timing; this layer carries the
		 * shape/motion language that a token swap cannot express.
		 */
		const HERO_CSS = __THEME_CSS__;

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"builder.title": "HeroUI 主题",
			"builder.caption": "实时调整 Accent、Base、字体、圆角与明暗",
			"builder.accent": "Accent",
			"builder.base": "Base",
			"builder.font": "Font Family",
			"builder.radius": "Radius",
			"builder.radiusForm": "Radius Form",
			"builder.theme": "Theme",
			"builder.light": "浅色",
			"builder.dark": "深色",
			"builder.system": "跟随系统",
			"builder.reset": "重置",
			"builder.preview": "实时预览",
			"builder.fontHint": "字体需系统已安装，未安装时回退系统字体",
			"builder.appearance": "明暗",
			"builder.radiusDesc": "影响整体界面，如菜单与弹窗",
			"builder.radiusFormDesc": "影响表单元素，如输入框与选择器",
			"builder.vibrant": "鲜艳调色板",
			"builder.vibrantDesc": "更高饱和度，更低对比度",
			"builder.random": "按 T 随机挑选",
			"builder.custom": "自定义",
			"builder.none": "无",
			"builder.extraSmall": "极小",
			"builder.small": "小",
			"builder.medium": "中",
			"builder.large": "大",
			"builder.extraLarge": "极大"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"builder.title": "HeroUI theme",
			"builder.caption": "Live accent, base, font, radius and appearance controls",
			"builder.accent": "Accent",
			"builder.base": "Base",
			"builder.font": "Font Family",
			"builder.radius": "Radius",
			"builder.radiusForm": "Radius Form",
			"builder.theme": "Theme",
			"builder.light": "Light",
			"builder.dark": "Dark",
			"builder.system": "System",
			"builder.reset": "Reset",
			"builder.preview": "Live preview",
			"builder.fontHint": "Fonts must be installed locally; the system stack is the fallback",
			"builder.appearance": "Appearance",
			"builder.radiusDesc": "Affects the overall UI, like menus and modals",
			"builder.radiusFormDesc": "Affects form elements, like inputs and selects",
			"builder.vibrant": "Vibrant palette",
			"builder.vibrantDesc": "More saturated, less contrast",
			"builder.random": "Press T to pick random",
			"builder.custom": "Custom",
			"builder.none": "None",
			"builder.extraSmall": "Extra Small",
			"builder.small": "Small",
			"builder.medium": "Medium",
			"builder.large": "Large",
			"builder.extraLarge": "Extra Large"
		};

		/** Merge one ConfigForms section into a complete visual config. */
		function readConfig(section) {
			const value = section !== null && section !== undefined ? section.value : undefined;
			return normalizeConfig(value ?? {});
		}

		/** Whether two normalized configs describe the same visuals. */
		function sameConfig(a, b) {
			return a.theme === b.theme
				&& a.accentHue === b.accentHue
				&& a.accentChroma === b.accentChroma
				&& a.accentLightness === b.accentLightness
				&& a.baseChroma === b.baseChroma
				&& a.vibrant === b.vibrant
				&& a.fontFamily === b.fontFamily
				&& a.radius === b.radius
				&& a.fieldRadius === b.fieldRadius;
		}
		//#endregion

		//#region dsh-hero-theme: settings row store
		/** Builder state projected into the settings row. */
		function createConfigStore() {
			return (0, _store.defineStore)({
				init: () => ({ config: DEFAULT_CONFIG }),
				actions: {
					sync: (d, config) => {
						d.config = config;
					}
				}
			});
		}
		//#endregion

		//#region dsh-hero-theme: settings row
		/** Inline style sheet for the builder row (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				padding: "16px 0",
				maxWidth: "560px"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 500,
				lineHeight: "22px"
			},
			caption: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			row: {
				display: "grid",
				gridTemplateColumns: "104px minmax(0, 1fr) 64px 28px",
				alignItems: "center",
				gap: "10px"
			},
			rowWide: {
				display: "grid",
				gridTemplateColumns: "104px minmax(0, 1fr)",
				alignItems: "center",
				gap: "10px"
			},
			label: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			value: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "11px",
				lineHeight: "18px",
				fontVariantNumeric: "tabular-nums",
				textAlign: "right"
			},
			swatch: {
				width: "24px",
				height: "24px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				boxSizing: "border-box"
			},
			reset: {
				alignSelf: "flex-start"
			},
			preview: {
				display: "flex",
				alignItems: "center",
				justifySelf: "start",
				gap: "6px",
				padding: "10px",
				borderRadius: "var(--dsh-hero-radius-card)",
				background: "var(--dsw-alias-bg-layer-1)",
				border: "1px solid var(--dsw-alias-border-l1)",
				boxShadow: "var(--dsw-shadow-lv1)"
			},
			previewChip: {
				width: "22px",
				height: "22px",
				borderRadius: "7px",
				flex: "none"
			},
			hint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "11px",
				lineHeight: "16px"
			},
			rowAccent: {
				display: "grid",
				gridTemplateColumns: "104px minmax(0, 1fr)",
				alignItems: "center",
				gap: "10px"
			},
			accentControls: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				minWidth: 0
			}
		};

		/** One label + control + value row. */
		function ControlRow({ label, value, children, swatch }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.row,
				children: [
					(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: label }),
					children,
					(0, react_jsx_runtime.jsx)("span", { style: styles.value, children: value }),
					swatch ?? (0, react_jsx_runtime.jsx)("span", {})
				]
			});
		}

		/** Radius preview square. */
		function RadiusChip({ radius }) {
			return (0, react_jsx_runtime.jsx)("span", {
				style: {
					...styles.swatch,
					borderRadius: radius,
					background: "var(--dsw-alias-interactive-bg-hover-accent)"
				}
			});
		}

		//#region dsh-hero-theme: color math
		/** sRGB transfer helpers for the OKLCH <-> hex bridge. */
		function srgbToLinear(value) {
			return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
		}
		function linearToSrgb(value) {
			return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
		}
		const clampUnit = (value) => Math.min(1, Math.max(0, value));

		/** OKLCH -> sRGB (0..1 each). Out-of-gamut channels clamp. */
		function oklchToRgb(l, c, hue) {
			const rad = (hue * Math.PI) / 180;
			const a = c * Math.cos(rad);
			const b = c * Math.sin(rad);
			const lp = l + 0.3963377774 * a + 0.2158037573 * b;
			const mp = l - 0.1055613458 * a - 0.0638541728 * b;
			const sp = l - 0.0894841775 * a - 1.291485548 * b;
			const l3 = lp * lp * lp;
			const m3 = mp * mp * mp;
			const s3 = sp * sp * sp;
			return [
				clampUnit(linearToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3)),
				clampUnit(linearToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3)),
				clampUnit(linearToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3))
			];
		}

		/** sRGB (0..1) -> OKLCH. */
		function rgbToOklch(r, g, b) {
			const lr = srgbToLinear(r);
			const lg = srgbToLinear(g);
			const lb = srgbToLinear(b);
			const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
			const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
			const s = Math.cbrt(0.0883024319 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
			const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
			const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
			const c1 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
			const chroma = Math.sqrt(a * a + c1 * c1);
			let hue = (Math.atan2(c1, a) * 180) / Math.PI;
			if (hue < 0) hue += 360;
			return { l: clampUnit(lightness), c: Math.max(0, chroma), h: hue };
		}

		/** sRGB (0..1) -> HSL (h 0..360, s/l 0..100). */
		function rgbToHsl(r, g, b) {
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;
			if (max === min) return { h: 0, s: 0, l: l * 100 };
			const d = max - min;
			const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			let h;
			if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
			else if (max === g) h = ((b - r) / d + 2) / 6;
			else h = ((r - g) / d + 4) / 6;
			return { h: h * 360, s: s * 100, l: l * 100 };
		}

		/** HSL -> sRGB (0..1). */
		function hslToRgb(h, s, l) {
			const sn = s / 100;
			const ln = l / 100;
			const c = (1 - Math.abs(2 * ln - 1)) * sn;
			const hp = (((h % 360) + 360) % 360) / 60;
			const x = c * (1 - Math.abs((hp % 2) - 1));
			let rgb;
			if (hp < 1) rgb = [c, x, 0];
			else if (hp < 2) rgb = [x, c, 0];
			else if (hp < 3) rgb = [0, c, x];
			else if (hp < 4) rgb = [0, x, c];
			else if (hp < 5) rgb = [x, 0, c];
			else rgb = [c, 0, x];
			const m = ln - c / 2;
			return [clampUnit(rgb[0] + m), clampUnit(rgb[1] + m), clampUnit(rgb[2] + m)];
		}

		const to255 = (value) => Math.round(clampUnit(value) * 255);
		/** Format an OKLCH triple as a lowercase #rrggbb string. */
		function oklchToHex(l, c, hue) {
			const [r, g, b] = oklchToRgb(l, c, hue);
			return "#" + [r, g, b].map((v) => to255(v).toString(16).padStart(2, "0")).join("");
		}
		/** Parse #rgb / #rrggbb into OKLCH; null when the string is not a hex color. */
		function hexToOklch(text) {
			const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(text || "").trim());
			if (match === null) return null;
			let raw = match[1];
			if (raw.length === 3) raw = raw.split("").map((ch) => ch + ch).join("");
			const r = parseInt(raw.slice(0, 2), 16) / 255;
			const g = parseInt(raw.slice(2, 4), 16) / 255;
			const b = parseInt(raw.slice(4, 6), 16) / 255;
			return rgbToOklch(r, g, b);
		}

		/** The hue stop list the HeroUI builder uses for its rainbow tracks. */
		const HUE_STOPS = [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360, 24];
		function rainbowTrack(lightness, chromaValue) {
			return "linear-gradient(to right, " +
				HUE_STOPS.map((h) => "oklch(" + lightness + " " + chromaValue + " " + h + ")").join(", ") + ")";
		}

		/** The builder's fixed color swatches (two pages of eight). */
		const SWATCHES = [
			"hsla(338, 77%, 78%, 1)", "hsla(309, 23%, 55%, 1)", "hsla(355, 85%, 66%, 1)", "hsla(16, 100%, 67%, 1)",
			"hsla(47, 92%, 66%, 1)", "hsla(152, 80%, 56%, 1)", "hsla(197, 59%, 64%, 1)", "hsla(220, 13%, 18%, 1)",
			"hsla(220, 70%, 50%, 1)", "hsla(210, 100%, 56%, 1)", "hsla(180, 100%, 25%, 1)", "hsla(170, 50%, 65%, 1)",
			"hsla(150, 60%, 75%, 1)", "hsla(280, 60%, 60%, 1)", "hsla(270, 50%, 70%, 1)", "hsla(350, 100%, 88%, 1)"
		];

		/** Radius options for the popover cards. */
		const RADIUS_OPTIONS = [
			{ id: "none", letter: "-", name: "builder.none", value: 0 },
			{ id: "xs", letter: "XS", name: "builder.extraSmall", value: 0.125 },
			{ id: "s", letter: "S", name: "builder.small", value: 0.25 },
			{ id: "m", letter: "M", name: "builder.medium", value: 0.5 },
			{ id: "l", letter: "L", name: "builder.large", value: 0.75 }
		];
		const FORM_RADIUS_OPTIONS = RADIUS_OPTIONS.concat([
			{ id: "xl", letter: "XL", name: "builder.extraLarge", value: 1 }
		]);

		/** The eleven HeroUI theme presets, with their builder values. */
		const THEME_PRESETS = [
			{ id: "default", label: "Default", l: 0.6204, c: 0.195, h: 253.83, base: 0.0015, radius: 0.5, field: 0.75, from: "#67a7e7", to: "#181dfb" },
			{ id: "sky", label: "Sky", l: 0.78, c: 0.16, h: 225, base: 0.0015, radius: 0.5, field: 0.75, from: "#68d9e6", to: "#137afa" },
			{ id: "lavender", label: "Lavender", l: 0.77, c: 0.13, h: 305, base: 0.0015, radius: 0.5, field: 0.75, from: "#e788f5", to: "#921afe" },
			{ id: "mint", label: "Mint", l: 0.82, c: 0.12, h: 155, base: 0.0015, radius: 0.5, field: 0.75, from: "#5ee0c0", to: "#2a9983" },
			{ id: "netflix", label: "Netflix", l: 0.5814, c: 0.2349, h: 27.99, base: 0, radius: 0.125, field: 0.125, from: "#fa7a83", to: "#ff1823" },
			{ id: "uber", label: "Uber", l: 0, c: 0, h: 0, base: 0, radius: 0.25, field: 0.25, from: "#7f7f7f", to: "#323232" },
			{ id: "spotify", label: "Spotify", l: 0.7697, c: 0.2124, h: 148.67, base: 0.002, radius: 0.5, field: 0.125, from: "#5de0b3", to: "#1b775b" },
			{ id: "coinbase", label: "Coinbase", l: 0.5282, c: 0.2628, h: 262.87, base: 0.002, radius: 0.5, field: 0.125, from: "#568ff5", to: "#2e36a3" },
			{ id: "airbnb", label: "Airbnb", l: 0.6579, c: 0.2309, h: 17.07, base: 0, radius: 0.5, field: 0.75, from: "#f1959e", to: "#e5333b" },
			{ id: "discord", label: "Discord", l: 0.5774, c: 0.2091, h: 273.85, base: 0.01, radius: 0.25, field: 0.75, from: "#7072ef", to: "#4c19ce" },
			{ id: "rabbit", label: "Rabbit", l: 0.6678, c: 0.2232, h: 36.66, base: 0.01, radius: 0.5, field: 1, from: "#e8c275", to: "#fb3c12" }
		];

		/** Which preset the current config matches, or null for a custom palette. */
		function matchPreset(config) {
			const near = (a, b) => Math.abs(a - b) < 0.002;
			return THEME_PRESETS.find((preset) =>
				near(preset.l, config.accentLightness)
				&& near(preset.c, config.accentChroma)
				&& Math.abs(preset.h - config.accentHue) < 0.75
				&& near(preset.base, config.baseChroma)
				&& near(preset.radius, config.radius)
				&& near(preset.field, config.fieldRadius)
			) ?? null;
		}
		//#endregion

		/**
		 * Anchored popover shared by the color, radius and theme panels. Opens
		 * upward when the trigger sits low in the viewport, with HeroUI's
		 * 150ms scale-90 enter and 100ms scale-95 exit.
		 */
		function HeroPopover({ open, rect, width, label, triggerRef, onDismiss, panelKind, children }) {
			const [mounted, setMounted] = react.useState(open);
			const [phase, setPhase] = react.useState("enter");
			const timer = react.useRef(null);
			react.useEffect(() => {
				if (open) {
					clearTimeout(timer.current);
					setMounted(true);
					setPhase("enter");
				} else if (mounted) {
					setPhase("exit");
					clearTimeout(timer.current);
					timer.current = setTimeout(() => setMounted(false), 100);
				}
				return () => clearTimeout(timer.current);
			}, [open]);
			react.useEffect(() => {
				if (!open) return undefined;
				const onDown = (event) => {
					if (triggerRef.current?.contains(event.target)) return;
					if (event.target.closest?.(".hero-popover") !== null && event.target.closest?.(".hero-popover") !== undefined) return;
					onDismiss();
				};
				document.addEventListener("pointerdown", onDown, true);
				return () => document.removeEventListener("pointerdown", onDown, true);
			}, [open, onDismiss]);
			if (!mounted || rect === null) return null;
			const estimatedHeight = { color: 380, radius: 240, form: 240, theme: 320 }[panelKind] ?? 300;
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;
			const openUp = spaceBelow < estimatedHeight + 16 && spaceAbove > spaceBelow;
			const left = Math.min(Math.max(8, rect.left + rect.width / 2 - width / 2), window.innerWidth - width - 8);
			const style = openUp
				? { position: "fixed", left, width, bottom: window.innerHeight - rect.top + 8, maxHeight: Math.max(160, rect.top - 16) }
				: { position: "fixed", left, width, top: rect.bottom + 8, maxHeight: Math.max(160, window.innerHeight - rect.bottom - 16) };
			return (0, react_dom.createPortal)(
				(0, react_jsx_runtime.jsxs)("div", {
					className: "hero-popover",
					role: "dialog",
					"aria-label": label,
					"data-phase": phase,
					"data-placement": openUp ? "top" : "bottom",
					style,
					onPointerDown: (event) => event.stopPropagation(),
					children: [children]
				}),
				document.body
			);
		}

		/** 160x24 gradient slider with a 16px circular thumb (HeroUI ColorSlider). */
		function HeroColorSlider({ value, min, max, step, track, thumbColor, onChange, label }) {
			const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "hero-color-slider",
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "hero-color-slider__track",
						"aria-hidden": "true",
						style: { background: track },
						children: (0, react_jsx_runtime.jsx)("div", {
							className: "hero-color-slider__thumb",
							style: { left: percent + "%", background: thumbColor }
						})
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						onChange,
						className: "hero-color-slider__input",
						"aria-label": label
					})
				]
			});
		}

		/** 24px conic disc that expands into the color panel. */
		function HeroColorDisc({ onClick, expanded, label }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "hero-disc",
				"aria-haspopup": "dialog",
				"aria-expanded": expanded,
				"aria-label": label,
				onClick,
				children: [
					(0, react_jsx_runtime.jsx)("span", { className: "hero-disc__ring", style: { background: accentColor(DEFAULT_CONFIG.accentHue) } }),
					(0, react_jsx_runtime.jsx)("span", { className: "hero-disc__rim" })
				]
			});
		}

		/**
		 * The HeroUI color picker: swatch carousel, saturation/lightness area,
		 * hue slider with shuffle, and a hex field.
		 */
		function HeroColorPanel({ config, update, t, label }) {
			const [page, setPage] = react.useState(0);
			const [draft, setDraft] = react.useState(null);
			const areaRef = react.useRef(null);
			const dragging = react.useRef(false);
			const [r, g, b] = oklchToRgb(config.accentLightness, config.accentChroma, config.accentHue);
			const hsl = rgbToHsl(r, g, b);
			const hex = oklchToHex(config.accentLightness, config.accentChroma, config.accentHue);
			const pages = Math.ceil(SWATCHES.length / 8);

			const applyHsl = (hue, saturation, lightness) => {
				const [rr, gg, bb] = hslToRgb(hue, saturation, lightness);
				const next = rgbToOklch(rr, gg, bb);
				update("accentLightness", Math.round(next.l * 10000) / 10000);
				update("accentChroma", Math.round(next.c * 10000) / 10000);
			};

			const areaMove = (event) => {
				const area = areaRef.current;
				if (area === null) return;
				const box = area.getBoundingClientRect();
				const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
				const y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
				applyHsl(hsl.h, x * 100, (1 - y) * 100);
			};

			react.useEffect(() => {
				if (!dragging.current) return undefined;
				const onMove = (event) => areaMove(event);
				const onUp = () => { dragging.current = false; };
				window.addEventListener("pointermove", onMove);
				window.addEventListener("pointerup", onUp);
				return () => {
					window.removeEventListener("pointermove", onMove);
					window.removeEventListener("pointerup", onUp);
				};
			});

			const pickSwatch = (value) => {
				const computed = (() => {
					const probe = document.createElement("span");
					probe.style.color = value;
					document.body.appendChild(probe);
					const resolved = getComputedStyle(probe).color;
					probe.remove();
					const match = /rgba?\(([^)]+)\)/.exec(resolved);
					if (match === null) return null;
					const parts = match[1].split(",").map((part) => Number(part.trim()));
					return rgbToOklch(parts[0] / 255, parts[1] / 255, parts[2] / 255);
				})();
				if (computed === null) return;
				update("accentLightness", Math.round(computed.l * 10000) / 10000);
				update("accentChroma", Math.round(computed.c * 10000) / 10000);
				update("accentHue", Math.round(computed.h * 100) / 100);
			};

			const shuffle = () => {
				const entropy = new Uint32Array(3);
				globalThis.crypto.getRandomValues(entropy);
				const hue = entropy[0] % 360;
				const saturation = 50 + (entropy[1] % 50);
				const lightness = 40 + (entropy[2] % 30);
				applyHsl(hue, saturation, lightness);
				const [rr, gg, bb] = hslToRgb(hue, saturation, lightness);
				const next = rgbToOklch(rr, gg, bb);
				update("accentHue", Math.round(next.h * 100) / 100);
			};

			const commitHex = (event) => {
				const next = hexToOklch(event.target.value);
				setDraft(null);
				if (next === null) return;
				update("accentLightness", Math.round(next.l * 10000) / 10000);
				update("accentChroma", Math.round(next.c * 10000) / 10000);
				update("accentHue", Math.round(next.h * 100) / 100);
			};

			return (0, react_jsx_runtime.jsxs)("div", {
				className: "hero-color-panel",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "hero-color-panel__carousel",
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hero-color-panel__arrow",
								"aria-label": "previous",
								disabled: page === 0,
								onClick: () => setPage((value) => Math.max(0, value - 1)),
								children: "‹"
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: "hero-color-panel__window",
								children: (0, react_jsx_runtime.jsx)("div", {
									className: "hero-color-panel__strip",
									style: { transform: "translateX(-" + page * 100 + "%)" },
									children: Array.from({ length: pages }, (_, pageIndex) =>
										(0, react_jsx_runtime.jsx)("div", {
											className: "hero-color-panel__page",
											children: SWATCHES.slice(pageIndex * 8, pageIndex * 8 + 8).map((swatch, index) =>
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "hero-color-panel__swatch",
													style: { background: swatch },
													"aria-label": swatch,
													onClick: () => pickSwatch(swatch)
												}, pageIndex + "-" + index)
											)
										}, pageIndex)
									)
								})
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hero-color-panel__arrow",
								"aria-label": "next",
								disabled: page >= pages - 1,
								onClick: () => setPage((value) => Math.min(pages - 1, value + 1)),
								children: "›"
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						ref: areaRef,
						className: "hero-color-panel__area",
						role: "slider",
						tabIndex: 0,
						"aria-label": label,
						"aria-valuetext": hex,
						style: {
							background:
								"linear-gradient(to top, black, transparent, white), " +
								"linear-gradient(to right, hsl(" + hsl.h + ", 0%, 50%), transparent), " +
								"hsl(" + hsl.h + ", 100%, 50%)"
						},
						onPointerDown: (event) => {
							dragging.current = true;
							areaMove(event);
						},
						children: (0, react_jsx_runtime.jsx)("span", {
							className: "hero-color-panel__area-thumb",
							style: { left: hsl.s + "%", top: (100 - hsl.l) + "%", background: hex }
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "hero-color-panel__hue-row",
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: "hero-color-panel__hue",
								children: (0, react_jsx_runtime.jsx)(HeroColorSlider, {
									min: 0,
									max: 360,
									step: 1,
									value: config.accentHue,
									track: "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))",
									thumbColor: hex,
									onChange: (event) => update("accentHue", Number(event.target.value)),
									label: label
								})
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hero-color-panel__shuffle",
								"aria-label": "shuffle",
								onClick: shuffle,
								children: (0, react_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 16 16",
									"aria-hidden": "true",
									children: (0, react_jsx_runtime.jsx)("path", {
										d: "M2 5h2.5l7 6H14M2 11h2.5l2.2-1.9M9.6 5.9 11.5 5H14M12 3l2 2-2 2M12 9l2 2-2 2",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: 1.3,
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "hero-color-panel__field",
						children: (0, react_jsx_runtime.jsx)("input", {
							className: "hero-color-panel__hex",
							value: draft ?? hex,
							spellCheck: false,
							"aria-label": "hex",
							onChange: (event) => setDraft(event.target.value),
							onBlur: commitHex,
							onKeyDown: (event) => {
								if (event.key === "Enter") commitHex(event);
							}
						})
					})
				]
			});
		}

		/** Select-like trigger row (InputGroup) used by Radius and Theme. */
		function HeroFieldTrigger({ prefix, value, label, expanded, onClick, triggerRef }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				ref: triggerRef,
				type: "button",
				className: "hero-field-trigger",
				"aria-haspopup": "dialog",
				"aria-expanded": expanded,
				"aria-label": label,
				onClick,
				children: [
					(0, react_jsx_runtime.jsx)("span", { className: "hero-field-trigger__prefix", children: prefix }),
					(0, react_jsx_runtime.jsx)("span", { className: "hero-field-trigger__value", children: value }),
					(0, react_jsx_runtime.jsx)("span", {
						className: "hero-field-trigger__suffix",
						"aria-hidden": "true",
						children: (0, react_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 12 16",
							children: (0, react_jsx_runtime.jsx)("path", {
								d: "M3 6l3-3 3 3M3 10l3 3 3-3",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: 1.2,
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})
				]
			});
		}

		/** Radius option grid (None/XS/S/M/L[/XL]) inside a popover. */
		function HeroRadiusPanel({ value, form, onChange, t }) {
			const options = form ? FORM_RADIUS_OPTIONS : RADIUS_OPTIONS;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "hero-radius-panel",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "hero-radius-panel__head",
						children: [
							(0, react_jsx_runtime.jsx)("span", { className: "hero-radius-panel__title", children: t(form ? "builder.radiusForm" : "builder.radius") }),
							(0, react_jsx_runtime.jsx)("span", {
								className: "hero-radius-panel__desc",
								children: t(form ? "builder.radiusFormDesc" : "builder.radiusDesc")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "hero-radius-panel__grid",
						children: options.map((option) =>
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "hero-radius-card",
								"data-selected": option.value === value,
								onClick: () => onChange(option.value),
								children: [
									(0, react_jsx_runtime.jsx)("span", { className: "hero-radius-card__letter", children: option.letter }),
									(0, react_jsx_runtime.jsx)("span", { className: "hero-radius-card__name", children: t(option.name) })
								]
							}, option.id)
						)
					})
				]
			});
		}

		/** Preset grid + vibrant switch + random hint (HeroUI Theme popover). */
		function HeroThemePanel({ config, update, t }) {
			const current = matchPreset(config);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "hero-theme-panel",
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "hero-theme-panel__grid",
						children: THEME_PRESETS.map((preset) =>
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "hero-theme-item",
								"data-selected": current !== null && current.id === preset.id,
								onClick: () => {
									update("accentLightness", preset.l);
									update("accentChroma", preset.c);
									update("accentHue", preset.h);
									update("baseChroma", preset.base);
									update("radius", preset.radius);
									update("fieldRadius", preset.field);
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: "hero-theme-item__dot",
										style: { background: "linear-gradient(135deg, " + preset.from + ", " + preset.to + ")" }
									}),
									(0, react_jsx_runtime.jsx)("span", { className: "hero-theme-item__label", children: preset.label })
								]
							}, preset.id)
						)
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "hero-theme-panel__footer",
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: "hero-theme-panel__switch-row",
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: "hero-theme-panel__switch-copy",
										children: [
											(0, react_jsx_runtime.jsx)("span", { className: "hero-theme-panel__switch-title", children: t("builder.vibrant") }),
											(0, react_jsx_runtime.jsx)("span", { className: "hero-theme-panel__switch-desc", children: t("builder.vibrantDesc") })
										]
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										role: "switch",
										"aria-checked": config.vibrant === true,
										className: "hero-switch",
										onClick: () => update("vibrant", config.vibrant !== true),
										children: (0, react_jsx_runtime.jsx)("span", { className: "hero-switch__thumb" })
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("p", {
								className: "hero-theme-panel__hint",
								children: [
									t("builder.random").split("T")[0].trim() + " ",
									(0, react_jsx_runtime.jsx)("kbd", { className: "hero-kbd", children: "T" }),
									" " + t("builder.random").split("T")[1].trim()
								]
							})
						]
					})
				]
			});
		}

		/** HeroUI Tabs with a measured sliding indicator. */
		function HeroTabs({ value, options, onChange, label }) {
			const listRef = react.useRef(null);
			const [indicator, setIndicator] = react.useState({ left: 0, width: 0, ready: false });
			const measure = () => {
				const list = listRef.current;
				if (list === null) return;
				const selected = list.querySelector("[data-hero-tab][aria-selected='true']");
				if (selected === null) return;
				setIndicator({
					left: selected.offsetLeft,
					width: selected.offsetWidth,
					ready: true
				});
			};
			react.useLayoutEffect(measure, [value]);
			react.useEffect(() => {
				if (typeof ResizeObserver === "undefined") return undefined;
				const list = listRef.current;
				if (list === null) return undefined;
				const observer = new ResizeObserver(measure);
				observer.observe(list);
				return () => observer.disconnect();
			}, []);
			const onKeyDown = (event) => {
				const index = options.findIndex((option) => option.id === value);
				let next = -1;
				if (event.key === "ArrowRight") next = (index + 1) % options.length;
				else if (event.key === "ArrowLeft") next = (index - 1 + options.length) % options.length;
				if (next < 0) return;
				event.preventDefault();
				const buttons = listRef.current?.querySelectorAll("[data-hero-tab]");
				buttons?.[next]?.focus();
				onChange(options[next].id);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: listRef,
				className: "hero-tabs",
				role: "tablist",
				"aria-label": label,
				onKeyDown,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "hero-tabs__indicator",
						"aria-hidden": "true",
						style: {
							transform: `translateX(${indicator.left}px)`,
							width: indicator.width + "px",
							opacity: indicator.ready ? 1 : 0,
							borderRadius: "9999px",
							cornerShape: "round"
						}
					}),
					options.map((option) => (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"data-hero-tab": "",
						"aria-selected": value === option.id,
						tabIndex: value === option.id ? 0 : -1,
						className: "hero-tabs__tab",
						style: { borderRadius: "9999px", cornerShape: "round" },
						onClick: () => onChange(option.id),
						children: option.label
					}, option.id))
				]
			});
		}

		/** HeroUI Select: field trigger, animated popover and animated check. */
		function HeroSelect({ value, options, onChange, label }) {
			const rootRef = react.useRef(null);
			const triggerRef = react.useRef(null);
			const listRef = react.useRef(null);
			const popoverRef = react.useRef(null);
			const closeTimer = react.useRef(null);
			const [open, setOpen] = react.useState(false);
			const [phase, setPhase] = react.useState("enter");
			const [rect, setRect] = react.useState(null);
			const selectedIndex = Math.max(0, options.findIndex((option) => option.id === value));
			const [active, setActive] = react.useState(selectedIndex);
			const baseId = react.useId();
			const selected = options.find((option) => option.id === value) ?? options[0];

			const updateRect = () => {
				const trigger = triggerRef.current;
				if (trigger === null) return;
				const box = trigger.getBoundingClientRect();
				setRect({ top: box.top, bottom: box.bottom, left: box.left, width: box.width });
			};

			const openSelect = () => {
				clearTimeout(closeTimer.current);
				updateRect();
				setActive(selectedIndex);
				setPhase("enter");
				setOpen(true);
			};

			const closeSelect = (restoreFocus = true) => {
				if (!open) return;
				setPhase("exit");
				clearTimeout(closeTimer.current);
				closeTimer.current = setTimeout(() => {
					setOpen(false);
					setPhase("enter");
					if (restoreFocus) triggerRef.current?.focus();
				}, 100);
			};

			react.useEffect(() => () => clearTimeout(closeTimer.current), []);
			react.useEffect(() => {
				if (!open) setActive(selectedIndex);
			}, [open, selectedIndex]);
			react.useEffect(() => {
				if (!open) return undefined;
				const onPointerDown = (event) => {
					if (rootRef.current?.contains(event.target)) return;
					if (popoverRef.current?.contains(event.target)) return;
					closeSelect(false);
				};
				const onScroll = () => updateRect();
				document.addEventListener("pointerdown", onPointerDown, true);
				window.addEventListener("resize", onScroll);
				window.addEventListener("scroll", onScroll, true);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown, true);
					window.removeEventListener("resize", onScroll);
					window.removeEventListener("scroll", onScroll, true);
				};
			}, [open]);
			react.useEffect(() => {
				if (!open) return;
				listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
			}, [active, open]);

			const choose = (option) => {
				onChange(option.id);
				closeSelect();
			};
			const onTriggerKeyDown = (event) => {
				if (!open) {
					if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						event.stopPropagation();
						openSelect();
					}
					return;
				}
				if (event.key === "ArrowDown") {
					event.preventDefault();
					event.stopPropagation();
					setActive((index) => Math.min(options.length - 1, index + 1));
				} else if (event.key === "ArrowUp") {
					event.preventDefault();
					event.stopPropagation();
					setActive((index) => Math.max(0, index - 1));
				} else if (event.key === "Home") {
					event.preventDefault();
					event.stopPropagation();
					setActive(0);
				} else if (event.key === "End") {
					event.preventDefault();
					event.stopPropagation();
					setActive(options.length - 1);
				} else if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					event.stopPropagation();
					choose(options[active]);
				} else if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					closeSelect();
				} else if (event.key === "Tab") {
					closeSelect(false);
				}
			};
			const onListKeyDown = (event) => {
				if (event.key === "ArrowDown") {
					event.preventDefault();
					event.stopPropagation();
					setActive((index) => Math.min(options.length - 1, index + 1));
				} else if (event.key === "ArrowUp") {
					event.preventDefault();
					event.stopPropagation();
					setActive((index) => Math.max(0, index - 1));
				} else if (event.key === "Home") {
					event.preventDefault();
					event.stopPropagation();
					setActive(0);
				} else if (event.key === "End") {
					event.preventDefault();
					event.stopPropagation();
					setActive(options.length - 1);
				} else if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					event.stopPropagation();
					choose(options[active]);
				} else if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					closeSelect();
				} else if (event.key === "Tab") {
					closeSelect(false);
				}
			};

			const below = rect === null ? 0 : window.innerHeight - rect.bottom;
			const above = rect === null ? 0 : rect.top;
			const preferred = Math.min(260, options.length * 34 + 8);
			const openUp = rect !== null && below < preferred && above > below;
			const popoverStyle = rect === null
				? { display: "none" }
				: openUp
					? {
						position: "fixed",
						left: rect.left,
						width: rect.width,
						bottom: window.innerHeight - rect.top + 4,
						maxHeight: Math.max(120, rect.top - 12)
					}
					: {
						position: "fixed",
						left: rect.left,
						width: rect.width,
						top: rect.bottom + 4,
						maxHeight: Math.max(120, window.innerHeight - rect.bottom - 12)
					};

			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: "hero-select",
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						ref: triggerRef,
						type: "button",
						className: "hero-select__trigger",
						"data-hero-select-trigger": "",
						"aria-haspopup": "listbox",
						"aria-expanded": open,
						"aria-controls": open ? `${baseId}-listbox` : undefined,
						"aria-activedescendant": open ? `${baseId}-${active}` : undefined,
						"aria-label": label,
						onClick: () => open ? closeSelect() : openSelect(),
						onKeyDown: onTriggerKeyDown,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: "hero-select__value",
								children: selected === undefined ? value : selected.label
							}),
							(0, react_jsx_runtime.jsx)("svg", {
								className: "hero-select__chevron",
								viewBox: "0 0 16 16",
								"aria-hidden": "true",
								children: (0, react_jsx_runtime.jsx)("path", {
									d: "M4 6l4 4 4-4",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 1.5,
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						]
					}),
					open ? (0, react_dom.createPortal)((0, react_jsx_runtime.jsx)("div", {
						ref: (node) => {
							listRef.current = node;
							popoverRef.current = node;
						},
						id: `${baseId}-listbox`,
						className: "hero-select__popover",
						role: "listbox",
						tabIndex: -1,
						"aria-label": label,
						"aria-activedescendant": `${baseId}-${active}`,
						"data-phase": phase,
						"data-placement": openUp ? "top" : "bottom",
						style: popoverStyle,
						onKeyDown: onListKeyDown,
						onPointerDown: (event) => event.stopPropagation(),
						children: options.map((option, index) => (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "option",
							id: `${baseId}-${index}`,
							tabIndex: -1,
							"data-index": index,
							"data-hero-select-option": "",
							"aria-selected": option.id === value,
							"data-active": index === active,
							className: "hero-select__option",
							onPointerEnter: () => setActive(index),
							onPointerDown: (event) => event.stopPropagation(),
							onClick: (event) => {
								event.stopPropagation();
								choose(option);
							},
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: "hero-select__option-label",
									children: option.label
								}),
								(0, react_jsx_runtime.jsx)("svg", {
									className: "hero-select__check",
									viewBox: "0 0 16 16",
									"aria-hidden": "true",
									children: (0, react_jsx_runtime.jsx)("path", {
										d: "M4 8.5 6.5 11 12 5.5",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: 2,
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})
							]
						}, option.id))
					}), document.body) : null
				]
			});
		}

		/**
		 * HeroUI theme builder row registered into Settings → General:
		 * accent hue, neutral tint, font family, radius, field radius, theme.
		 */
		function HeroThemeRow({ t, config: configProp, setField, reset, useStore }) {
			const stored = useStore((s) => s.config);
			const config = stored ?? configProp ?? DEFAULT_CONFIG;
			const update = typeof setField === "function" ? setField : () => {};
			const accent = accentColor(config.accentHue, config.accentLightness, config.accentChroma);
			const accentHex = oklchToHex(config.accentLightness, config.accentChroma, config.accentHue);
			const neutralLow = `oklch(21.03% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const neutral = `oklch(94.00% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const neutralHigh = `oklch(97.02% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const setNumber = (field) => (event) => update(field, Number(event.target.value));
			const themes = [
				{ id: "light", label: t("builder.light") },
				{ id: "dark", label: t("builder.dark") },
				{ id: "system", label: t("builder.system") }
			];

			const colorRef = react.useRef(null);
			const radiusRef = react.useRef(null);
			const formRef = react.useRef(null);
			const themeRef = react.useRef(null);

			const [openPanel, setOpenPanel] = react.useState(null);
			const [rect, setRect] = react.useState(null);
			const panelWidths = { color: 248, radius: 304, form: 304, theme: 228 };

			const toggle = (name, ref) => (event) => {
				event.stopPropagation();
				if (openPanel === name) {
					setOpenPanel(null);
					return;
				}
				const box = ref.current?.getBoundingClientRect();
				if (box === undefined || box === null) return;
				setRect({ top: box.top, bottom: box.bottom, left: box.left, width: box.width });
				setOpenPanel(name);
			};

			const preset = matchPreset(config);
			const radiusOption = RADIUS_OPTIONS.find((option) => Math.abs(option.value - config.radius) < 0.01) ?? RADIUS_OPTIONS[3];
			const formOption = FORM_RADIUS_OPTIONS.find((option) => Math.abs(option.value - config.fieldRadius) < 0.01) ?? FORM_RADIUS_OPTIONS[5];

			react.useEffect(() => {
				if (openPanel !== "theme") return undefined;
				const onKey = (event) => {
					const target = event.target;
					const tag = target?.tagName;
					if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;
					if (event.key !== "t" && event.key !== "T") return;
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					const entropy = new Uint32Array(1);
					globalThis.crypto.getRandomValues(entropy);
					const pick = THEME_PRESETS[entropy[0] % THEME_PRESETS.length];
					update("accentLightness", pick.l);
					update("accentChroma", pick.c);
					update("accentHue", pick.h);
					update("baseChroma", pick.base);
					update("radius", pick.radius);
					update("fieldRadius", pick.field);
				};
				document.addEventListener("keydown", onKey);
				return () => document.removeEventListener("keydown", onKey);
			}, [openPanel, update]);

			const panel = openPanel === "color"
				? (0, react_jsx_runtime.jsx)(HeroColorPanel, { config, update, t, label: t("builder.accent") })
				: openPanel === "radius"
					? (0, react_jsx_runtime.jsx)(HeroRadiusPanel, { value: config.radius, form: false, onChange: (value) => update("radius", value), t })
					: openPanel === "form"
						? (0, react_jsx_runtime.jsx)(HeroRadiusPanel, { value: config.fieldRadius, form: true, onChange: (value) => update("fieldRadius", value), t })
						: openPanel === "theme"
							? (0, react_jsx_runtime.jsx)(HeroThemePanel, { config, update, t })
							: null;

			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: styles.title, children: t("builder.title") }),
					(0, react_jsx_runtime.jsx)("div", { style: styles.caption, children: t("builder.caption") }),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowAccent,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.accent") }),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.accentControls,
								children: [
									(0, react_jsx_runtime.jsx)(HeroColorSlider, {
										min: 0,
										max: 360,
										step: 1,
										value: config.accentHue,
										track: rainbowTrack(DEFAULT_CONFIG.accentLightness, DEFAULT_CONFIG.accentChroma),
										thumbColor: accent,
										onChange: setNumber("accentHue"),
										label: t("builder.accent")
									}),
									(0, react_jsx_runtime.jsx)("div", {
										ref: colorRef,
										children: (0, react_jsx_runtime.jsx)(HeroColorDisc, {
											onClick: toggle("color", colorRef),
											expanded: openPanel === "color",
											label: t("builder.accent")
										})
									}),
									(0, react_jsx_runtime.jsx)("span", { style: styles.value, children: accentHex })
								]
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowAccent,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.base") }),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.accentControls,
								children: [
									(0, react_jsx_runtime.jsx)(HeroColorSlider, {
										min: 0,
										max: 0.02,
										step: 0.0005,
										value: config.baseChroma,
										track: `linear-gradient(to right, oklch(0.7 0 ${config.accentHue}), oklch(0.7 0.02 ${config.accentHue}))`,
										thumbColor: `oklch(0.7 ${config.baseChroma.toFixed(4)} ${config.accentHue})`,
										onChange: setNumber("baseChroma"),
										label: t("builder.base")
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: styles.swatch,
										children: (0, react_jsx_runtime.jsx)("span", {
											style: {
												display: "block",
												width: "100%",
												height: "100%",
												borderRadius: "inherit",
												background: `linear-gradient(90deg, ${neutralLow}, ${neutral}, ${neutralHigh})`
											}
										})
									}),
									(0, react_jsx_runtime.jsx)("span", { style: styles.value, children: config.baseChroma.toFixed(4) })
								]
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.font") }),
							(0, react_jsx_runtime.jsx)(HeroSelect, {
								value: config.fontFamily,
								options: FONT_OPTIONS,
								onChange: (value) => update("fontFamily", value),
								label: t("builder.font")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", { style: styles.hint, children: t("builder.fontHint") }),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.radius") }),
							(0, react_jsx_runtime.jsx)(HeroFieldTrigger, {
								triggerRef: radiusRef,
								prefix: radiusOption.letter,
								value: t(radiusOption.name),
								label: t("builder.radius"),
								expanded: openPanel === "radius",
								onClick: toggle("radius", radiusRef)
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.radiusForm") }),
							(0, react_jsx_runtime.jsx)(HeroFieldTrigger, {
								triggerRef: formRef,
								prefix: formOption.letter,
								value: t(formOption.name),
								label: t("builder.radiusForm"),
								expanded: openPanel === "form",
								onClick: toggle("form", formRef)
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.theme") }),
							(0, react_jsx_runtime.jsx)(HeroFieldTrigger, {
								triggerRef: themeRef,
								prefix: (0, react_jsx_runtime.jsx)("span", {
									className: "hero-field-trigger__paint",
									"aria-hidden": "true",
									children: (0, react_jsx_runtime.jsx)("svg", {
										viewBox: "0 0 16 16",
										children: (0, react_jsx_runtime.jsx)("path", {
											d: "M8 1.5 2.5 7a1 1 0 0 0 0 1.4l4.1 4.1a1 1 0 0 0 1.4 0l5.5-5.5L8 1.5ZM3 9h10M13.5 11c0 1-1 1.6-1 2.5a1 1 0 0 0 2 0c0-.9-1-1.5-1-2.5Z",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: 1.1,
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								}),
								value: preset === null ? t("builder.custom") : preset.label,
								label: t("builder.theme"),
								expanded: openPanel === "theme",
								onClick: toggle("theme", themeRef)
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.appearance") }),
							(0, react_jsx_runtime.jsx)(HeroTabs, {
								value: config.theme,
								options: themes,
								onChange: (value) => update("theme", value),
								label: t("builder.appearance")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.preview") }),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.preview,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-alias-bg-base)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-specific-sidebar-fill)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-alias-brand-primary)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-alias-state-success-primary)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-alias-state-warn-primary)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: { ...styles.previewChip, background: "var(--dsw-alias-state-error-primary)" }
									}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.previewChip,
											width: "auto",
											padding: "0 10px",
											color: "var(--dsw-alias-label-primary)",
											background: "linear-gradient(135deg, var(--dsw-alias-brand-primary), var(--dsh-hero-accent-2))",
											fontSize: "11px",
											fontWeight: 600,
											display: "inline-flex",
											alignItems: "center"
										},
										children: "HeroUI"
									})
								]
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hero-button",
						onClick: (event) => {
							reset();
							event.currentTarget.blur();
						},
						style: styles.reset,
						children: t("builder.reset")
					}),
					(0, react_jsx_runtime.jsx)(HeroPopover, {
						open: openPanel !== null && panel !== null,
						rect,
						width: openPanel === null ? 248 : panelWidths[openPanel],
						panelKind: openPanel,
						label: openPanel === null ? "" : t(openPanel === "form" ? "builder.radiusForm" : openPanel === "radius" ? "builder.radius" : openPanel === "color" ? "builder.accent" : "builder.theme"),
						triggerRef: openPanel === "color" ? colorRef : openPanel === "radius" ? radiusRef : openPanel === "form" ? formRef : themeRef,
						onDismiss: () => setOpenPanel(null),
						children: panel
					})
				]
			});
		}
		//#endregion

		//#region dsh-hero-theme: client plugin body
		/**
		 * Required services: theme runtime, ConfigForms and remote settings
		 * transport, plus slots/locale for the builder row.
		 */
		const inject = [
			"slots",
			"locale",
			"theme",
			"remote",
			"configForms"
		];

		/**
		 * Client plugin body: project the profile Config into one token-override
		 * layer, generate both color schemes from the builder config, and keep
		 * the stylesheet in lockstep with the active state.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const heroSettings = ctx.configForms.get(SKIN_SETTINGS_ENTRY_ID);
			const baseSettings = ctx.configForms.get(BASE_THEME_ENTRY_ID);

			let styleNode = null;
			const ensureShadow = () => {
				if (styleNode !== null) return;
				styleNode = document.createElement("style");
				styleNode.dataset.plugin = "dsh-hero-theme";
				styleNode.dataset.skinOwner = "dsh-hero-theme";
				styleNode.textContent = HERO_CSS;
				document.head.append(styleNode);
			};
			const removeShadow = () => {
				if (styleNode !== null) {
					styleNode.remove();
					styleNode = null;
				}
			};

			const store = createConfigStore();
			let bound;
			let current = readConfig(heroSettings.getSnapshot());
			let overrideDispose = null;
			let applying = false;
			let baseReady = false;
			const writeTimers = new Map();
			// Fields we wrote ourselves, held until the settings echo confirms
			// them. The transport commits writes one by one, so an echo read
			// mid-cascade still carries stale values for the fields that have
			// not landed yet; re-applying those is what makes the tabs
			// indicator and theme trigger bounce old → new → old.
			const selfWrites = new Map();

			const publish = () => bound?.sync(current);

			const reportWriteFailure = (error) => {
				ctx.logger?.warn("dsh-hero-theme: could not persist the theme config", error);
			};

			const removeOverride = () => {
				if (overrideDispose === null) return;
				const dispose = overrideDispose;
				overrideDispose = null;
				// A theme/change listener can dispose this layer while the runtime is
				// already notifying that event; re-emitting inside the dispatch can
				// leave the presenter holding the stale token list.
				queueMicrotask(dispose);
			};

			const applyConfig = (config, setTheme) => {
				const all = buildAllTokens(config);
				const pairs = {};
				for (const name of Object.keys(all.light)) {
					pairs[name] = { light: all.light[name], dark: all.dark[name] };
				}
				applying = true;
				try {
					removeOverride();
					overrideDispose = ctx.theme.overrideTokens(SKIN_OVERRIDE_SOURCE, pairs);
					if (setTheme) ctx.theme.setTheme(config.theme);
				} finally {
					applying = false;
				}
				current = config;
				ensureShadow();
				document.body.dataset.dshHero = "";
				publish();
			};

			const clear = () => {
				for (const timer of writeTimers.values()) clearTimeout(timer);
				writeTimers.clear();
				removeOverride();
				removeShadow();
				delete document.body.dataset.dshHero;
			};

			const writeField = (field, value) => {
				selfWrites.set(field, value);
				const write = value === DEFAULT_CONFIG[field]
					? heroSettings.unset(field)
					: heroSettings.set(field, value);
				void Promise.resolve(write)
					.then(() => {
						// Safety valve: drop the guard even if the echo never arrives.
						setTimeout(() => {
							if (selfWrites.get(field) === value) selfWrites.delete(field);
						}, 400);
					})
					.catch((error) => {
						selfWrites.delete(field);
						reportWriteFailure(error);
					});
			};

			const scheduleWrite = (field, value, immediate) => {
				clearTimeout(writeTimers.get(field));
				writeTimers.delete(field);
				if (immediate) {
					writeField(field, value);
					return;
				}
				writeTimers.set(field, setTimeout(() => {
					writeTimers.delete(field);
					writeField(field, value);
				}, 180));
			};

			const setField = (field, value) => {
				if (!CONFIG_FIELDS.includes(field)) return;
				const next = normalizeConfig({ ...current, [field]: value });
				if (next[field] === current[field]) return;
				applyConfig(next, field === "theme");
				scheduleWrite(field, next[field], field === "theme");
			};

			const reset = () => {
				for (const timer of writeTimers.values()) clearTimeout(timer);
				writeTimers.clear();
				const next = normalizeConfig(DEFAULT_CONFIG);
				applyConfig(next, true);
				for (const field of CONFIG_FIELDS) writeField(field, DEFAULT_CONFIG[field]);
			};

			const onConfigChange = () => {
				const next = readConfig(heroSettings.getSnapshot());
				let unsettled = false;
				for (const [field, written] of selfWrites) {
					if (next[field] === written) selfWrites.delete(field);
					else unsettled = true;
				}
				// A snapshot that still disagrees with one of our pending writes
				// is the stale echo of that write, not a real external change.
				if (unsettled) return;
				if (!sameConfig(next, current)) applyConfig(next, false);
			};

			const onThemeChange = (snapshot) => {
				if (applying) return;
				// Disposing the override layer re-emits theme/change while our
				// own scheme write is still in flight, and the presenter can
				// briefly report the old preference; adopting it flips the
				// appearance tabs back before the echo restores the new one.
				if (selfWrites.has("theme")) return;
				const preference = snapshot.preference;
				if (preference !== "light" && preference !== "dark" && preference !== "system") return;
				if (preference === current.theme) return;
				// The built-in Appearance row changed the scheme; adopt it into the
				// builder config so reloads keep the same appearance.
				current = { ...current, theme: preference };
				publish();
				scheduleWrite("theme", preference, true);
			};

			// Base palette adoption is asynchronous. Apply tokens immediately, but
			// only force the built-in preference once the ui-theme section settled.
			const baseSnapshot = baseSettings.getSnapshot();
			baseReady = baseSnapshot.status === "ready";
			applyConfig(current, baseReady);

			ctx.effect(() => {
				const offConfig = heroSettings.subscribe(onConfigChange);
				const offBase = baseSettings.subscribe(() => {
					if (baseReady) return;
					if (baseSettings.getSnapshot().status !== "ready") return;
					baseReady = true;
					applying = true;
					try {
						ctx.theme.setTheme(current.theme);
					} finally {
						applying = false;
					}
				});
				const offTheme = ctx.on("theme/change", onThemeChange);
				return () => {
					offConfig();
					offBase();
					offTheme();
				};
			}, "dsh-hero-theme: config adoption");

			ctx.effect(() => () => {
				clear();
			}, "dsh-hero-theme: stylesheet");

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-hero-theme: settings row dictionaries");

			const injected = (actions) => {
				bound = actions;
				bound.sync(current);
				return { setField, reset };
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "hero-theme",
				order: 19,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, HeroThemeRow));
		}
		//#endregion

		exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
		exports.FONT_OPTIONS = FONT_OPTIONS;
		exports.buildAllTokens = buildAllTokens;
		exports.normalizeConfig = normalizeConfig;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
