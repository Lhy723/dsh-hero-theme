/**
 * dsh-hero-theme — Host half.
 *
 * The HeroUI builder config is a live profile preference. DSH exposes volatile
 * plugin Config fields through the settings form service, which persists edits
 * into the active profile's Cordis patch.
 */
import z from '@deepseek-ai/schemastery'

/** Loader entry and ConfigForms key. */
export const SETTINGS_ENTRY_ID = 'dsh-hero-theme'

/** Default builder values, mirrored by src/palette.js. */
export const DEFAULT_CONFIG = Object.freeze({
  theme: 'dark',
  accentHue: 253.83,
  baseChroma: 0.0015,
  fontFamily: 'Inter',
  radius: 0.5,
  fieldRadius: 0.75,
})

/** Live builder config projected to the browser and editable in the profile. */
export const Config = z.object({
  theme: z.union(['light', 'dark', 'system']).default(DEFAULT_CONFIG.theme).volatile(),
  accentHue: z.number().min(0).max(360).default(DEFAULT_CONFIG.accentHue).volatile(),
  baseChroma: z.number().min(0).max(0.02).default(DEFAULT_CONFIG.baseChroma).volatile(),
  fontFamily: z.string().default(DEFAULT_CONFIG.fontFamily).volatile(),
  radius: z.number().min(0).max(2).default(DEFAULT_CONFIG.radius).volatile(),
  fieldRadius: z.number().min(0).max(3).default(DEFAULT_CONFIG.fieldRadius).volatile(),
})

/** Host loader entry for the browser implementation exported from `./client`. */
export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
  })
}
