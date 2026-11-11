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
		const CONFIG_FIELDS = ["theme", "accentHue", "baseChroma", "fontFamily", "radius", "fieldRadius"];

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
			"builder.fontHint": "字体需系统已安装，未安装时回退系统字体"
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
			"builder.fontHint": "Fonts must be installed locally; the system stack is the fallback"
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
				&& a.baseChroma === b.baseChroma
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

		/** HeroUI Slider structure with a native range input overlay. */
		function HeroSlider({ value, min, max, step, onChange, label }) {
			const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
			const accent = "var(--dsw-alias-brand-primary)";
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "hero-slider",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "hero-slider__track",
						"aria-hidden": "true",
						style: {
							borderLeftColor: value > min ? accent : "transparent",
							borderRightColor: value >= max ? accent : "transparent"
						},
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: "hero-slider__fill",
								style: { width: percent + "%" }
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: "hero-slider__thumb",
								style: { left: percent + "%" },
								children: (0, react_jsx_runtime.jsx)("div", {
									className: "hero-slider__thumb-inner"
								})
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						onChange,
						className: "hero-slider__input",
						"aria-label": label
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
							opacity: indicator.ready ? 1 : 0
						}
					}),
					options.map((option) => (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"data-hero-tab": "",
						"aria-selected": value === option.id,
						tabIndex: value === option.id ? 0 : -1,
						className: "hero-tabs__tab",
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
			const accent = accentColor(config.accentHue);
			const neutral = `oklch(94.00% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const neutralLow = `oklch(21.03% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const neutralHigh = `oklch(97.02% ${config.baseChroma.toFixed(4)} ${config.accentHue})`;
			const setNumber = (field) => (event) => update(field, Number(event.target.value));
			const themes = [
				{ id: "light", label: t("builder.light") },
				{ id: "dark", label: t("builder.dark") },
				{ id: "system", label: t("builder.system") }
			];
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: styles.title, children: t("builder.title") }),
					(0, react_jsx_runtime.jsx)("div", { style: styles.caption, children: t("builder.caption") }),
					(0, react_jsx_runtime.jsxs)(ControlRow, {
						label: t("builder.accent"),
						value: Math.round(config.accentHue) + "°",
						swatch: (0, react_jsx_runtime.jsx)("span", { style: { ...styles.swatch, background: accent } }),
						children: (0, react_jsx_runtime.jsx)(HeroSlider, {
							min: 0,
							max: 360,
							step: 1,
							value: config.accentHue,
							onChange: setNumber("accentHue"),
							label: t("builder.accent")
						})
					}),
					(0, react_jsx_runtime.jsxs)(ControlRow, {
						label: t("builder.base"),
						value: config.baseChroma.toFixed(4),
						swatch: (0, react_jsx_runtime.jsx)("span", {
							style: {
								...styles.swatch,
								background: `linear-gradient(90deg, ${neutralLow}, ${neutral}, ${neutralHigh})`
							}
						}),
						children: (0, react_jsx_runtime.jsx)(HeroSlider, {
							min: 0,
							max: 0.02,
							step: 0.0005,
							value: config.baseChroma,
							onChange: setNumber("baseChroma"),
							label: t("builder.base")
						})
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
					(0, react_jsx_runtime.jsxs)(ControlRow, {
						label: t("builder.radius"),
						value: Math.round(config.radius * 16) + "px",
						swatch: (0, react_jsx_runtime.jsx)(RadiusChip, { radius: config.radius * 48 + "px" }),
						children: (0, react_jsx_runtime.jsx)(HeroSlider, {
							min: 0,
							max: 1.25,
							step: 0.0625,
							value: config.radius,
							onChange: setNumber("radius"),
							label: t("builder.radius")
						})
					}),
					(0, react_jsx_runtime.jsxs)(ControlRow, {
						label: t("builder.radiusForm"),
						value: Math.round(config.fieldRadius * 16) + "px",
						swatch: (0, react_jsx_runtime.jsx)(RadiusChip, { radius: config.fieldRadius * 16 + "px" }),
						children: (0, react_jsx_runtime.jsx)(HeroSlider, {
							min: 0,
							max: 1.5,
							step: 0.0625,
							value: config.fieldRadius,
							onChange: setNumber("fieldRadius"),
							label: t("builder.radiusForm")
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.rowWide,
						children: [
							(0, react_jsx_runtime.jsx)("span", { style: styles.label, children: t("builder.theme") }),
							(0, react_jsx_runtime.jsx)(HeroTabs, {
								value: config.theme,
								options: themes,
								onChange: (value) => update("theme", value),
								label: t("builder.theme")
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
				const write = value === DEFAULT_CONFIG[field]
					? heroSettings.unset(field)
					: heroSettings.set(field, value);
				void Promise.resolve(write).catch(reportWriteFailure);
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
				for (const field of CONFIG_FIELDS) {
					void Promise.resolve(heroSettings.unset(field)).catch(reportWriteFailure);
				}
			};

			const onConfigChange = () => {
				const next = readConfig(heroSettings.getSnapshot());
				if (!sameConfig(next, current)) applyConfig(next, false);
			};

			const onThemeChange = (snapshot) => {
				if (applying) return;
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
