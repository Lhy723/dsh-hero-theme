import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DEFAULT_CONFIG, buildAllTokens, normalizeConfig } from '../src/palette.js'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const manifest = JSON.parse(read('package.json'))
const host = read('src/index.js')
const client = read('src/client.tpl.js')
const built = read('lib/client.js')
const patch = read('cordis.patch.yml')
const heroCss = read('src/hero.css')
const supportedDshRange = '^0.2.2-rc.1'

assert.equal(manifest.engines?.dsh, supportedDshRange, 'the engine range must match the runtime API')
assert.equal(manifest.dsh?.client?.platform, 'web', 'Desktop loads the embedded DSH Web client')
for (const [name, range] of Object.entries(manifest.peerDependencies ?? {})) {
  if (name.startsWith('@deepseek-ai/dsh-')) {
    assert.equal(range, supportedDshRange, `${name} must target the DSH 0.2 API`)
  }
}
assert.ok(manifest.peerDependencies['@deepseek-ai/dsh-client-store'],
  'the client-store platform module must be declared')
assert.ok(manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-store'))
assert.ok(manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-ui-settings'))
assert.ok(!manifest.dsh.client.inject.includes('@deepseek-ai/dsh-client-runtime'),
  'the removed DSH 0.1 module id must not remain in the client graph')

for (const field of ['theme', 'accentHue', 'baseChroma', 'fontFamily', 'radius', 'fieldRadius']) {
  assert.match(host, new RegExp(`${field}: z\\.`), `Host Config must declare ${field}`)
}
assert.equal((host.match(/\.volatile\(\)/g) ?? []).length, 6,
  'all six builder fields must be volatile')
assert.doesNotMatch(host, /preference:/, 'the single-skin preference field must be gone')
assert.match(host, /settings\.configure\(\{ auto: false \}, ctx\.fiber\)/,
  'the custom settings row must disable automatic form generation')
assert.doesNotMatch(host, /settings\.register\(/,
  'the removed DSH 0.1 Host settings API must not remain in the Host entry')
assert.match(host, /SETTINGS_ENTRY_ID = 'dsh-hero-theme'/)
assert.match(host, /accentHue: 253\.83/)
assert.match(host, /baseChroma: 0\.0015/)
assert.match(host, /radius: 0\.5/)
assert.match(host, /fieldRadius: 0\.75/)

assert.match(client, /BASE_THEME_ENTRY_ID = "ui-theme"/)
assert.match(client, /SKIN_OVERRIDE_SOURCE = "dsh-hero-theme"/)
assert.match(client, /__PALETTE_SOURCE__/)
assert.match(client, /__THEME_CSS__/)
assert.match(client, /ctx\.theme\.overrideTokens\(SKIN_OVERRIDE_SOURCE, pairs\)/,
  'the builder must apply one token-override layer')
assert.match(client, /ctx\.theme\.setTheme\(config\.theme\)/,
  'the Theme control must switch the built-in base scheme')
assert.match(client, /queueMicrotask\(dispose\)/,
  'override removal must not re-enter the theme/change dispatch')
assert.match(client, /heroSettings\.set\(field, value\)/)
assert.match(client, /heroSettings\.unset\(field\)/)
assert.match(client, /heroSettings\.subscribe\(onConfigChange\)/)
assert.doesNotMatch(client, /ctx\.theme\.register\(/,
  'DSH cannot persist a third-party theme id, so the plugin must not register and select one')
assert.doesNotMatch(client, /settingsScope|dsh-client-runtime/,
  'the removed DSH 0.1 settings API must not remain in the browser bundle source')
assert.match(client, /body\.dataset\.dshHero = ""/)
assert.match(client, /delete document\.body\.dataset\.dshHero/)
assert.match(client, /"builder\.accent"/)
assert.match(client, /"builder\.base"/)
assert.match(client, /"builder\.font"/)
assert.match(client, /"builder\.radius"/)
assert.match(client, /"builder\.radiusForm"/)
assert.match(client, /"builder\.theme"/)

assert.match(patch, /id: dsh-hero-theme/)
assert.match(client, /SKIN_SETTINGS_ENTRY_ID = "dsh-hero-theme"/)

assert.ok(built.includes('buildAllTokens'), 'lib/client.js must carry the palette generator')
assert.ok(built.includes('DEFAULT_CONFIG'), 'lib/client.js must carry the default config')
assert.ok(built.includes('FONT_OPTIONS'), 'lib/client.js must carry the font catalog')
assert.ok(!built.includes('__PALETTE_SOURCE__') && !built.includes('__THEME_CSS__'),
  'build placeholders must be resolved')

const light = buildAllTokens(DEFAULT_CONFIG)
const dark = light.dark
const defaultLight = light.light
assert.ok(Object.keys(defaultLight).length >= 160, 'the generator must expose the complete token surface')
assert.deepEqual(Object.keys(defaultLight).sort(), Object.keys(dark).sort(),
  'both schemes must expose the same token set')
for (const [name, value] of Object.entries(defaultLight)) {
  assert.equal(typeof value, 'string', `light ${name} must be a string`)
  assert.ok(value.length > 0, `light ${name} must not be empty`)
}
for (const [name, value] of Object.entries(dark)) {
  assert.equal(typeof value, 'string', `dark ${name} must be a string`)
  assert.ok(value.length > 0, `dark ${name} must not be empty`)
}

assert.match(defaultLight['--dsw-alias-brand-primary'], /253\.83\)$/,
  'the default accent hue must be the HeroUI blue')
assert.equal(oklchToHex(defaultLight['--dsw-alias-brand-primary']), '#0485f7',
  'the default accent must resolve to HeroUI #0485F7')
assert.equal(defaultLight['--dsw-menu-surface-fill'], defaultLight['--dsw-alias-bg-overlay'],
  'the menu material must be opaque and match the overlay surface')
assert.doesNotMatch(defaultLight['--dsw-specific-bubble'], /transparent/,
  'chat bubbles must not be translucent')
assert.doesNotMatch(dark['--dsw-specific-bubble'], /transparent/,
  'chat bubbles must not be translucent')
assert.equal(defaultLight['--dsh-hero-radius-card'], '24px')
assert.equal(defaultLight['--dsh-hero-radius-field'], '12px')
assert.equal(defaultLight['--dsw-radius-xs'], '4px')
assert.equal(defaultLight['--dsw-radius-sm'], '8px')
assert.equal(defaultLight['--dsw-radius-md'], '12px')
assert.equal(defaultLight['--dsw-radius-lg'], '16px')
assert.equal(defaultLight['--dsw-radius-xl'], '24px')
assert.match(defaultLight['--dsw-font-family'], /^"Inter"/)

const warm = buildAllTokens({ ...DEFAULT_CONFIG, accentHue: 30 })
assert.notEqual(warm.light['--dsw-alias-brand-primary'], defaultLight['--dsw-alias-brand-primary'],
  'the accent slider must change the accent token')
assert.match(warm.light['--dsw-alias-brand-primary'], /30\.00\)$/)
const round = buildAllTokens({ ...DEFAULT_CONFIG, radius: 0.75, fieldRadius: 1 })
assert.equal(round.light['--dsh-hero-radius-card'], '36px')
assert.equal(round.light['--dsh-hero-radius-field'], '16px')
assert.equal(round.light['--dsw-radius-lg'], '24px')
const geist = buildAllTokens({ ...DEFAULT_CONFIG, fontFamily: 'Geist' })
assert.match(geist.light['--dsw-font-family'], /^"Geist"/)
assert.equal(normalizeConfig({ accentHue: 999 }).accentHue, 279,
  'hue values must wrap around the color wheel')
assert.equal(normalizeConfig({ baseChroma: 1 }).baseChroma, 0.02,
  'neutral chroma must clamp to the builder range')

/** Linear-sRGB luminance of an `oklch(L C H)` string, or null. */
function oklchLuminance(value) {
  const match = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(value)
  if (match === null) return null
  const lightness = Number(match[1]) / 100
  const chroma = Number(match[2])
  const hue = Number(match[3]) * Math.PI / 180
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)
  const l_ = lightness + 0.3963377774 * a + 0.2158037573 * b
  const m_ = lightness - 0.1055613458 * a - 0.0638541728 * b
  const s_ = lightness - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  const r = Math.min(1, Math.max(0, 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s))
  const g = Math.min(1, Math.max(0, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s))
  const bl = Math.min(1, Math.max(0, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s))
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl
}

/** sRGB hex of an `oklch(L C H)` string, or null. */
function oklchToHex(value) {
  const match = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(value)
  if (match === null) return null
  const lightness = Number(match[1]) / 100
  const chroma = Number(match[2])
  const hue = Number(match[3]) * Math.PI / 180
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)
  const l_ = lightness + 0.3963377774 * a + 0.2158037573 * b
  const m_ = lightness - 0.1055613458 * a - 0.0638541728 * b
  const s_ = lightness - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  const channels = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  ].map((channel) => {
    const linear = Math.min(1, Math.max(0, channel))
    const gamma = linear <= 0.0031308 ? 12.92 * linear : 1.055 * linear ** (1 / 2.4) - 0.055
    return Math.round(gamma * 255).toString(16).padStart(2, '0')
  })
  return '#' + channels.join('')
}

function contrast(a, b) {
  const [high, low] = [a, b].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

const CONTRAST_PAIRS = [
  ['--dsw-alias-label-primary', '--dsw-alias-bg-base', 7],
  ['--dsw-alias-label-secondary', '--dsw-alias-bg-layer-1', 4.5],
  ['--dsw-alias-brand-text', '--dsw-alias-brand-primary', 2.5],
  ['--dsw-alias-link', '--dsw-alias-bg-layer-1', 4.5],
]
for (const [scheme, tokens] of [['light', defaultLight], ['dark', dark]]) {
  for (const [foreground, background, minimum] of CONTRAST_PAIRS) {
    const fg = oklchLuminance(tokens[foreground])
    const bg = oklchLuminance(tokens[background])
    if (fg === null || bg === null) continue
    const ratio = contrast(fg, bg)
    assert.ok(ratio >= minimum,
      `${scheme}: ${foreground} on ${background} is ${ratio.toFixed(2)}:1, below ${minimum}:1`)
  }
}

assert.match(heroCss, /scale\(0\.97\)/,
  'the HeroUI button press scale must be present')
assert.doesNotMatch(heroCss, /button:not\(\[role='treeitem'\]\)/,
  'the blanket pill selector must not override segmented component radii')
assert.match(heroCss, /\.hero-button[\s\S]*?border-radius: 9999px/,
  'standalone action buttons must still be pills')
assert.match(heroCss, /hero-dialog-in/,
  'overlay enter motion must be present')
assert.match(heroCss, /hero-shimmer/,
  'the HeroUI skeleton shimmer must be present')
assert.match(heroCss, /linear-gradient\(135deg, var\(--dsw-alias-brand-primary\)/,
  'primary actions must carry the HeroUI brand gradient')
assert.match(heroCss, /\.hero-slider__track/,
  'the settings sliders must use the HeroUI track')
assert.match(heroCss, /\.hero-slider__thumb-inner/,
  'the settings sliders must use the HeroUI inner thumb')
assert.match(heroCss, /border-left: 12px solid transparent/,
  'the HeroUI track must reserve the 12px end caps')
assert.match(client, /className: "hero-slider__input"/,
  'the builder row must render the native input overlay')
assert.match(client, /className: "hero-slider__thumb"/,
  'the builder row must render the HeroUI thumb')
assert.match(client, /function HeroTabs\(/,
  'the theme switch must use the HeroUI Tabs structure')
assert.match(client, /function HeroSelect\(/,
  'the font picker must use the HeroUI Select structure')
assert.match(client, /className: "hero-select__trigger"/,
  'the select must render the HeroUI field trigger')
assert.match(client, /className: "hero-select__popover"/,
  'the select must render the animated popover')
assert.match(client, /react_dom\.createPortal[\s\S]*?document\.body\)/,
  'the select popover must portal to the body so modal transforms cannot clip it')
assert.match(client, /"aria-activedescendant": open \?/,
  'the trigger must expose the active option while open')
assert.match(client, /className: "hero-tabs__indicator"/,
  'the tabs must render the sliding indicator')
assert.match(heroCss, /\.hero-select__popover[\s\S]*?box-sizing: border-box/,
  'the select popover width must include its padding')
assert.match(heroCss, /\.hero-tabs__indicator/,
  'the tabs indicator must be styled')
assert.match(heroCss, /\.hero-select__trigger/,
  'the select trigger must be styled')
assert.match(heroCss, /@keyframes hero-select-in-bottom/,
  'the select popover must have enter motion')
assert.match(heroCss, /@keyframes hero-select-out-bottom/,
  'the select popover must have exit motion')
assert.match(heroCss, /\[data-menu-material\][\s\S]*?border-radius: var\(--dsh-hero-radius-popover\)/,
  'MenuSurface dropdowns must use the 22px popover radius, not the modal radius')
assert.match(heroCss, /\[role='tooltip'\][\s\S]*?color: var\(--dsw-alias-label-primary\)/,
  'tooltips must not inherit the hardcoded white DSH label color')
assert.match(heroCss, /\[role='tooltip'\] kbd/,
  'tooltip shortcut keycaps must use the themed foreground')
assert.match(heroCss, /html\[data-platform='darwin'\] body\[data-dsh-hero\] \[class\*='frame'\]:not\(\[data-sidebar-drawer\]\) \[class\*='sidebarCol'\]/,
  'data-platform lives on <html>; the sidebar override must outrank the macOS gradient')

console.log('DSH 0.2 Web/Desktop builder contract is complete')
