/**
 * HeroUI v3 palette generator.
 *
 * The formulas below mirror the Heroui theme builder:
 *   accent  = oklch(62.04% 0.1950 hue)
 *   neutrals = oklch(<lightness> <baseChroma × factor> hue)
 *   semantic hues rotate by 12% of the accent-hue delta
 *   radius scale = 0.25 / 0.5 / 0.75 / 1 / 1.5 / 3 × base
 *
 * Every value is emitted as a CSS color string, so the override layer can
 * carry both schemes without resolving colors in JavaScript.
 */

export const DEFAULT_CONFIG = Object.freeze({
  theme: 'dark',
  accentHue: 253.83,
  accentChroma: 0.195,
  accentLightness: 0.6204,
  baseChroma: 0.0015,
  vibrant: false,
  fontFamily: 'Inter',
  radius: 0.5,
  fieldRadius: 0.75,
})

export const FONT_OPTIONS = [
  { id: 'Inter', label: 'Inter' },
  { id: 'system', label: 'System UI' },
  { id: 'Geist', label: 'Geist' },
  { id: 'Manrope', label: 'Manrope' },
  { id: 'IBM Plex Sans', label: 'IBM Plex Sans' },
  { id: 'JetBrains Mono', label: 'JetBrains Mono' },
]

const REF_ACCENT_HUE = 253.83
const SEMANTIC_SHIFT = 0.12
const LIGHT_WARNING_HUE = 72.33
const DARK_WARNING_HUE = 76.34
const LIGHT_DANGER_HUE = 25.74
const DARK_DANGER_HUE = 24.63
const SUCCESS_HUE = 150.81

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0))
const hueOf = (value) => ((value % 360) + 360) % 360
const pct = (value) => `${(value * 100).toFixed(2)}%`
const chroma = (value) => Math.max(0, value).toFixed(4)
const okl = (lightness, chromaValue, hue) =>
  `oklch(${pct(lightness)} ${chroma(chromaValue)} ${hueOf(hue).toFixed(2)})`
const mix = (a, b, percent) => `color-mix(in oklab, ${a} ${percent}%, ${b})`
const soft = (color, percent) => `color-mix(in oklab, ${color} ${percent}%, transparent)`
const px = (rem) => `${Math.round(rem * 16 * 100) / 100}px`

/** Accent swatch color for a raw hue, used by the settings preview. */
export function accentColor(hue, lightness, chromaValue) {
  const l = Number.isFinite(Number(lightness)) ? Number(lightness) : DEFAULT_CONFIG.accentLightness
  const c = Number.isFinite(Number(chromaValue)) ? Number(chromaValue) : DEFAULT_CONFIG.accentChroma
  return okl(clamp(l, 0, 1), clamp(c, 0, 0.4), Number(hue) || 0)
}

/** Resolve a stored config into the values the generator understands. */
export function normalizeConfig(input = {}) {
  const raw = input !== null && typeof input === 'object' ? input : {}
  const fontFamily =
    typeof raw.fontFamily === 'string' && raw.fontFamily.trim() !== ''
      ? raw.fontFamily.trim()
      : DEFAULT_CONFIG.fontFamily
  return {
    theme: raw.theme === 'light' ? 'light'
      : raw.theme === 'system' ? 'system'
        : 'dark',
    accentHue: Number.isFinite(Number(raw.accentHue))
      ? hueOf(Number(raw.accentHue))
      : DEFAULT_CONFIG.accentHue,
    accentChroma: Number.isFinite(Number(raw.accentChroma))
      ? clamp(Number(raw.accentChroma), 0, 0.4)
      : DEFAULT_CONFIG.accentChroma,
    accentLightness: Number.isFinite(Number(raw.accentLightness))
      ? clamp(Number(raw.accentLightness), 0, 1)
      : DEFAULT_CONFIG.accentLightness,
    baseChroma: Number.isFinite(Number(raw.baseChroma))
      ? clamp(Number(raw.baseChroma), 0, 0.02)
      : DEFAULT_CONFIG.baseChroma,
    vibrant: raw.vibrant === true,
    fontFamily,
    radius: Number.isFinite(Number(raw.radius))
      ? clamp(Number(raw.radius), 0, 2)
      : DEFAULT_CONFIG.radius,
    fieldRadius: Number.isFinite(Number(raw.fieldRadius))
      ? clamp(Number(raw.fieldRadius), 0, 3)
      : DEFAULT_CONFIG.fieldRadius,
  }
}

/** Build the full DSH token map for both schemes. */
export function buildAllTokens(input = {}) {
  const config = normalizeConfig(input)
  return {
    light: buildMode('light', config),
    dark: buildMode('dark', config),
  }
}

function fontStack(fontFamily) {
  if (fontFamily === 'system') {
    return 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
  }
  return `"${fontFamily}", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
}

function buildMode(mode, config) {
  const dark = mode === 'dark'
  const hue = config.accentHue
  /* Vibrant palette: more saturated neutrals and semantics, as in HeroUI. */
  const base = config.baseChroma * (config.vibrant ? 1.8 : 1)
  const chromaBoost = config.vibrant ? 1.15 : 1
  const shift = (hue - REF_ACCENT_HUE) * SEMANTIC_SHIFT
  const successHue = SUCCESS_HUE + shift
  const warningHue = (dark ? DARK_WARNING_HUE : LIGHT_WARNING_HUE) + shift
  const dangerHue = (dark ? DARK_DANGER_HUE : LIGHT_DANGER_HUE) + shift

  const accent = okl(config.accentLightness, config.accentChroma * (config.vibrant ? 1.1 : 1), hue)
  const accentFg = config.accentLightness > 0.72 ? okl(0.2103, 0.0059, hue) : okl(0.9911, 0, 0)
  const success = okl(0.7329, 0.1935 * chromaBoost, successHue)
  const successFg = okl(0.2103, 0.0059, successHue)
  const warning = okl(dark ? 0.8203 : 0.7819, (dark ? 0.1388 : 0.1585) * chromaBoost, warningHue)
  const warningFg = okl(0.2103, 0.0059, warningHue)
  const danger = okl(dark ? 0.594 : 0.6532, (dark ? 0.1967 : 0.2328) * chromaBoost, dangerHue)
  const dangerFg = accentFg

  const background = okl(dark ? 0.12 : 0.9702, base, hue)
  const foreground = okl(dark ? 0.9911 : 0.2103, base, hue)
  const muted = okl(dark ? 0.705 : 0.5517, base * 2, hue)
  const defaultColor = okl(dark ? 0.274 : 0.94, base, hue)
  const defaultFg = okl(dark ? 0.9911 : 0.2103, base * 4, hue)
  const surface = okl(dark ? 0.2103 : 1, base * (dark ? 2 : 0.5333), hue)
  const surfaceFg = okl(dark ? 0.9911 : 0.2103, base, hue)
  const surfaceSecondary = okl(dark ? 0.257 : 0.9524, base * (dark ? 1.5333 : 0.8), hue)
  const surfaceTertiary = okl(dark ? 0.2721 : 0.9373, base * (dark ? 1.5333 : 0.8), hue)
  const overlay = okl(dark ? 0.2103 : 1, base * (dark ? 2 : 0.2667), hue)
  const scrollbar = okl(dark ? 0.705 : 0.871, base, hue)
  const segment = okl(dark ? 0.3964 : 1, base, hue)
  const border = okl(dark ? 0.28 : 0.9, base, hue)
  const separator = okl(dark ? 0.25 : 0.92, base, hue)
  const fieldBackground = surface
  const fieldForeground = surfaceFg
  const fieldPlaceholder = muted

  const accentHover = mix(accent, accentFg, 90)
  const accentSoft = soft(accent, dark ? 12 : 15)
  const accentSoftHover = soft(accent, dark ? 16 : 20)
  const accentSoftForeground = mix(accent, foreground, dark ? 80 : 70)
  const defaultHover = mix(defaultColor, defaultFg, 96)
  const surfaceHover = mix(surface, surfaceFg, 92)
  const backgroundSecondary = mix(background, foreground, 96)
  const backgroundTertiary = mix(background, foreground, 92)
  const borderSecondary = mix(surface, surfaceFg, 78)
  const borderTertiary = mix(surface, surfaceFg, 66)
  const separatorSecondary = mix(surface, surfaceFg, 85)
  const separatorTertiary = mix(surface, surfaceFg, 81)
  const successHover = mix(success, successFg, 90)
  const successSoft = soft(success, dark ? 12 : 15)
  const successSoftHover = soft(success, dark ? 16 : 20)
  const successSoftForeground = mix(success, foreground, 80)
  const warningHover = mix(warning, warningFg, 90)
  const warningSoft = soft(warning, dark ? 12 : 15)
  const warningSoftHover = soft(warning, dark ? 16 : 20)
  const warningSoftForeground = mix(warning, foreground, 80)
  const dangerHover = mix(danger, dangerFg, 90)
  const dangerSoft = soft(danger, 15)
  const dangerSoftHover = soft(danger, 20)
  const dangerSoftForeground = mix(danger, foreground, dark ? 80 : 70)

  const bubble = mix(accent, dark ? surface : background, dark ? 18 : 12)
  const bubbleHighlight = mix(accent, dark ? surface : background, dark ? 26 : 20)
  const selectedFill = mix(accent, dark ? surface : background, dark ? 18 : 12)
  const selectedHover = mix(accent, dark ? surface : background, dark ? 24 : 18)

  const foregroundMix = (percent) => mix(foreground, 'transparent', percent)
  const violet = okl(0.585, 0.19, 285.5)

  const tokens = {
    '--dsw-static-deepseek-500': accent,
    '--dsw-static-deepseek-450': mix(accent, '#ffffff', 90),
    '--dsw-static-deepseek-400': mix(accent, '#ffffff', 75),
    '--dsw-static-deepseek-300': mix(accent, '#ffffff', 55),
    '--dsw-static-deepseek-200': mix(accent, '#ffffff', 35),
    '--dsw-static-deepseek-100': mix(accent, '#ffffff', 18),
    '--dsw-static-deepseek-50': mix(accent, '#ffffff', 8),

    '--dsw-alias-bg-base': background,
    '--dsw-alias-bg-document-preview': surfaceSecondary,
    '--dsw-alias-bg-document-selection': accentSoft,
    '--dsw-alias-label-document-preview': muted,
    '--dsw-alias-bg-layer-1': surface,
    '--dsw-alias-bg-layer-2': surfaceSecondary,
    '--dsw-alias-bg-layer-3': surfaceTertiary,
    '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.5)',
    '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.3)',
    '--dsw-alias-bg-mask-3': dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.7)',
    '--dsw-alias-bg-mask-photo': 'rgba(0, 0, 0, 0.88)',
    '--dsw-alias-bg-mask-drop': mix(surface, 'transparent', 70),
    '--dsw-alias-bg-module-platform': surfaceSecondary,
    '--dsw-alias-bg-multi-select': defaultColor,
    '--dsw-alias-bg-overlay': overlay,
    '--dsw-alias-bg-skeleton': mix(surfaceTertiary, 'transparent', 70),
    '--dsw-alias-border-inverted2': soft(accentFg, 20),
    '--dsw-alias-border-inverted': soft(accentFg, 12),
    '--dsw-alias-border-l1': border,
    '--dsw-alias-border-l2-darkmode-thin': border,
    '--dsw-alias-border-l2': borderSecondary,
    '--dsw-alias-border-l3': borderTertiary,
    '--dsw-alias-border-l4': mix(surface, foreground, 55),
    '--dsw-alias-brand-primary-invert': foreground,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': accent,
    '--dsw-alias-brand-primary': accent,
    '--dsw-alias-brand-text': accentFg,
    '--dsw-alias-button-contrast-fill': foreground,
    '--dsw-alias-button-elevated-fill': surface,
    '--dsw-alias-button-floating-fill': overlay,
    '--dsw-alias-button-floating-hover': defaultHover,
    '--dsw-alias-button-ghost-active-border': borderTertiary,
    '--dsw-alias-button-ghost-active-fill': defaultColor,
    '--dsw-alias-button-ghost-active-hover': defaultHover,
    '--dsw-alias-button-info-fill': accent,
    '--dsw-alias-button-info-hover': accentHover,
    '--dsw-alias-button-primary-dimmed': accentSoft,
    '--dsw-alias-button-primary-fill': accent,
    '--dsw-alias-button-primary-hover': accentHover,
    '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(24, 24, 27, 0.36)',
    '--dsw-alias-button-tool-bar-fill': 'rgba(24, 24, 27, 0.5)',
    '--dsw-alias-button-tool-bar-hover': 'rgba(24, 24, 27, 0.62)',
    '--dsw-alias-illustration-background': surfaceSecondary,
    '--dsw-alias-illustration-backing': surfaceTertiary,
    '--dsw-alias-illustration-detail': borderTertiary,
    '--dsw-alias-illustration-inset': surfaceSecondary,
    '--dsw-alias-illustration-shadow': surfaceTertiary,
    '--dsw-alias-illustration-surface': surfaceTertiary,
    '--dsw-alias-interactive-bg-active': defaultHover,
    '--dsw-alias-interactive-bg-hover-accent': selectedHover,
    '--dsw-alias-interactive-bg-hover-danger': dangerSoft,
    '--dsw-alias-interactive-bg-hover-solid': surfaceHover,
    '--dsw-alias-interactive-bg-hover': defaultColor,
    '--dsw-alias-label-caption': mix(muted, background, 55),
    '--dsw-alias-label-deep-diving': accentSoftForeground,
    '--dsw-alias-label-deep-diving-shimmer': mix(accent, foreground, 80),
    '--dsw-alias-label-dimmed': border,
    '--dsw-alias-label-primary-bluish': foreground,
    '--dsw-alias-label-primary-dimmed': foreground,
    '--dsw-alias-label-primary-foreground': accentFg,
    '--dsw-alias-label-primary-inverted': dark ? eclipse() : accentFg,
    '--dsw-alias-label-primary': foreground,
    '--dsw-alias-label-secondary': muted,
    '--dsw-alias-label-shimmer': soft(foreground, 30),
    '--dsw-alias-label-tertiary': mix(muted, background, dark ? 70 : 75),
    '--dsw-alias-menu-icon': foreground,
    '--dsw-alias-link': foreground,
    '--dsw-alias-markdown-citation': defaultColor,
    '--dsw-alias-markdown-code-block-banner': surfaceSecondary,
    '--dsw-alias-markdown-code-block': defaultColor,
    '--dsw-alias-markdown-code-segment-selected': surface,
    '--dsw-alias-markdown-code-segment-unselected': surfaceSecondary,
    '--dsw-alias-markdown-inline-code': defaultColor,
    '--dsw-alias-markdown-placeholder': defaultColor,
    '--dsw-alias-markdown-tag': defaultColor,
    '--dsw-alias-scrollbar-bg-l1': foregroundMix(15),
    '--dsw-alias-scrollbar-bg-l2': foregroundMix(18),
    '--dsw-alias-scrollbar-hover-l1': foregroundMix(25),
    '--dsw-alias-scrollbar-hover-l2': foregroundMix(30),
    '--dsw-alias-state-business-primary': accent,
    '--dsw-alias-state-business-tertiary': accentSoft,
    '--dsw-alias-code-diff-added': successSoft,
    '--dsw-alias-code-diff-deleted': dangerSoft,
    '--dsw-alias-file-diff-added-bg': successSoft,
    '--dsw-alias-file-diff-added-gutter': soft(success, 8),
    '--dsw-alias-file-diff-added-marker': success,
    '--dsw-alias-file-diff-deleted-bg': dangerSoft,
    '--dsw-alias-file-diff-deleted-gutter': soft(danger, 8),
    '--dsw-alias-file-diff-deleted-marker': danger,
    '--dsw-alias-state-done-primary': success,
    '--dsw-alias-state-error-primary': danger,
    '--dsw-alias-state-error-secondary': dangerHover,
    '--dsw-alias-state-idle-primary': defaultColor,
    '--dsw-alias-state-success-primary': success,
    '--dsw-alias-state-success-secondary': successHover,
    '--dsw-alias-state-success-tertiary': successSoft,
    '--dsw-alias-state-warn-label': warningSoftForeground,
    '--dsw-alias-state-warn-primary': warning,
    '--dsw-alias-state-warn-secondary': warningHover,
    '--dsw-alias-state-warn-tertiary': warningSoft,
    '--dsw-alias-switch-thumb': accentFg,
    '--dsw-alias-toast-bg': overlay,
    '--dsw-alias-toast-label': foreground,
    '--dsw-alias-tooltip-bg': overlay,
    '--dsw-alias-tooltip-key-bg': defaultColor,
    '--dsw-alias-turn-trigger-bg': defaultColor,
    '--dsw-alias-turn-trigger-bg-hover': defaultHover,
    '--dsw-alias-menu-group-header-fill': mix(overlay, 'transparent', 95),

    '--dsw-menu-surface-fill': overlay,
    '--dsw-specific-bubble': bubble,
    '--dsw-specific-bubble-highlight': bubbleHighlight,
    '--dsw-specific-input-major': fieldBackground,
    '--dsw-specific-login-input': fieldBackground,
    '--dsw-specific-menu': overlay,
    '--dsw-specific-selector': defaultColor,
    '--dsw-specific-sidebar-fill': surface,
    '--dsw-specific-sidebar-nav-item-active': selectedFill,
    '--dsw-specific-sidebar-nav-item-active-accent': selectedFill,
    '--dsw-specific-tip': defaultColor,

    '--dsw-radius-xs': px(config.radius * 0.5),
    '--dsw-radius-sm': px(config.radius),
    '--dsw-radius-md': px(config.radius * 1.5),
    '--dsw-radius-lg': px(config.radius * 2),
    '--dsw-radius-xl': px(config.radius * 3),
    '--dsw-radius-panel': px(config.radius * 3),
    '--dsh-hero-radius-card': px(config.radius * 3),
    '--dsh-hero-radius-field': px(config.fieldRadius),
    '--dsh-hero-radius-tooltip': px(config.radius * 1.5),
    '--dsh-hero-radius-popover': px(config.radius * 2 + 0.375),
    '--dsh-hero-radius-tabs': px(config.radius * 2.5),
    '--dsh-hero-segment': segment,
    '--dsh-hero-button-secondary-fg': accentSoftForeground,
    '--dsh-hero-accent-2': okl(0.585, 0.19, hue + 31.67),

    '--dsw-shadow-lv1': dark
      ? '0 0 0 0 transparent inset'
      : '0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.06)',
    '--dsw-shadow-lv1-blur': dark ? '0 0 0 0 transparent inset' : '0 4px 12px 0 rgba(0, 0, 0, 0.02)',
    '--dsw-shadow-lv2': dark
      ? '0 0 0 0 transparent inset'
      : '0 4px 12px 0 rgba(0, 0, 0, 0.02), 0 2px 8px 0 rgba(0, 0, 0, 0.04)',
    '--dsw-shadow-lv3': dark
      ? '0 0 1px 0 rgba(255, 255, 255, 0.3) inset'
      : '0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03), 0 14px 28px 0 rgba(0, 0, 0, 0.08)',
    '--dsw-elevation-prominent': dark
      ? 'var(--dsw-elevation-stroke)'
      : 'var(--dsw-elevation-stroke), 0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 -6px 12px 0 rgba(0, 0, 0, 0.03), 0 14px 28px 0 rgba(0, 0, 0, 0.08)',
    '--dsw-elevation-panel': dark
      ? 'var(--dsw-elevation-stroke)'
      : 'var(--dsw-elevation-stroke), 0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '--dsw-elevation-soft': dark
      ? 'var(--dsw-elevation-stroke)'
      : 'var(--dsw-elevation-stroke), 0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '--dsw-elevation-stroke-color': border,
    '--dsw-menu-backdrop-filter': 'none',
    '--dsw-mask-blur': 'none',
    '--ds-ease-in-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '--ds-transition-duration': '150ms',
    '--ds-transition-duration-fast': '100ms',
    '--ds-transition-duration-slow': '250ms',

    '--dsw-font-family': fontStack(config.fontFamily),
    '--dsw-font-family-brand': fontStack(config.fontFamily),

    '--shiki-foreground': foreground,
    '--shiki-background': defaultColor,
    '--shiki-token-constant': mix(warning, foreground, 80),
    '--shiki-token-string': mix(success, foreground, 80),
    '--shiki-token-comment': muted,
    '--shiki-token-keyword': mix(accent, foreground, 85),
    '--shiki-token-parameter': mix(danger, foreground, 80),
    '--shiki-token-function': mix(violet, foreground, 80),
    '--shiki-token-string-expression': mix(success, foreground, 80),
    '--shiki-token-punctuation': mix(muted, foreground, 80),
    '--shiki-token-link': mix(accent, foreground, 85),
  }

  return tokens
}

function eclipse() {
  return okl(0.2103, 0.0059, 285.89)
}
