/**
 * dsh-hero-theme build script (zero dependencies, plain Node).
 *
 * Reads src/palette.js + src/hero.css, injects the palette generator and CSS
 * into src/client.tpl.js at the __PALETTE_SOURCE__ / __THEME_CSS__ placeholders,
 * and writes lib/client.js. Also copies the host half src/index.js → lib/index.js.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_CONFIG, buildAllTokens } from '../src/palette.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path) => readFileSync(join(root, path), 'utf8')

const REQUIRED_TOKENS = [
  '--dsw-alias-bg-base',
  '--dsw-alias-bg-layer-1',
  '--dsw-alias-brand-primary',
  '--dsw-alias-brand-text',
  '--dsw-alias-label-primary',
  '--dsw-alias-label-secondary',
  '--dsw-alias-border-l2',
  '--dsw-alias-state-error-primary',
  '--dsw-alias-state-success-primary',
  '--dsw-specific-bubble',
  '--dsw-specific-input-major',
  '--dsw-specific-sidebar-fill',
  '--dsw-menu-surface-fill',
  '--dsw-font-family',
  '--dsh-hero-radius-card',
  '--dsh-hero-radius-field',
]

const generated = buildAllTokens(DEFAULT_CONFIG)
const lightKeys = Object.keys(generated.light)
const darkKeys = Object.keys(generated.dark)
if (lightKeys.length < 160) throw new Error('palette generator returned too few tokens')
if (lightKeys.join('\n') !== darkKeys.join('\n')) {
  throw new Error('light and dark palettes must expose the same token set')
}
for (const token of REQUIRED_TOKENS) {
  if (!(token in generated.light)) throw new Error(`palette is missing ${token}`)
}
for (const mode of ['light', 'dark']) {
  for (const [name, value] of Object.entries(generated[mode])) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error(`${mode} token ${name} must be a non-empty string`)
    }
    if (!name.startsWith('--')) throw new Error(`unexpected token name ${name}`)
  }
}

const template = read('src/client.tpl.js')
for (const placeholder of ['__PALETTE_SOURCE__', '__THEME_CSS__']) {
  if (!template.includes(placeholder)) {
    throw new Error(`src/client.tpl.js is missing the ${placeholder} placeholder`)
  }
}

const paletteSource = read('src/palette.js').replace(/^export /gm, '')
const css = read('src/hero.css').trim()
if (!css.includes('body[data-dsh-hero]')) {
  throw new Error('src/hero.css must scope its rules under body[data-dsh-hero]')
}

const client = template
  .replace('__PALETTE_SOURCE__', paletteSource)
  .replace('__THEME_CSS__', JSON.stringify(css))

mkdirSync(join(root, 'lib'), { recursive: true })
writeFileSync(join(root, 'lib', 'client.js'), client)
copyFileSync(join(root, 'src', 'index.js'), join(root, 'lib', 'index.js'))

console.log(
  `built lib/client.js (${lightKeys.length} tokens × 2 schemes, ${css.length} CSS bytes) and lib/index.js`,
)
