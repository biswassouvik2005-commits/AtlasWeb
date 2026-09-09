/**
 * Centralized Design System & Color Palette Tokens
 *
 * Update colors here and in `src/index.css` to instantly change the entire application's
 * theme without modifying individual components.
 */

export const THEME = {
  // Canvas & Backgrounds
  canvas: 'var(--color-canvas)',
  surface: 'var(--color-surface)',
  surfaceSubtle: 'var(--color-surface-subtle)',
  surfaceElevated: 'var(--color-surface-elevated)',

  // Borders & Dividers
  borderSubtle: 'var(--color-border-subtle)',
  borderStrong: 'var(--color-border-strong)',

  // Typography
  textMain: 'var(--color-text-main)',
  textMuted: 'var(--color-text-muted)',
  textDim: 'var(--color-text-dim)',

  // Primary Accent: Sage / Mint Unaligned Reasoning Green
  accentPri: 'var(--color-accent-pri)',
  accentPriHover: 'var(--color-accent-pri-hover)',
  accentPriRaw: '#91C9A8',
  accentPriHoverRaw: '#7EB896',

  // Secondary Accent: Lavender / Violet Proof & Mathematical Intelligence Accent
  accentSec: 'var(--color-accent-sec)',
  accentSecHover: 'var(--color-accent-sec-hover)',
  accentSecRaw: '#A99BD6',
  accentSecHoverRaw: '#9686C7',

  // Raw hex codes for motion / canvas / SVG fallback if CSS variables aren't evaluated
  raw: {
    canvas: '#1a1a1a',
    surface: '#1a1a1a',
    surfaceSubtle: '#16171A',
    borderSubtle: '#262830',
    borderStrong: '#363945',
    textMain: '#C1E5CF',
    accentPri: '#91C9A8',
    accentSec: '#A99BD6',
  }
} as const;

export type ThemeTokens = typeof THEME;
