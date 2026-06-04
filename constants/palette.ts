export const PALETTE = {
  primary: "#6D5DFE",
  secondary: "#8B5CF6",
  accent: "#EC4899",
  info: "#06B6D4",
  surface: "#F8FAFC",
} as const;

export const PALETTE_HEX = Object.values(PALETTE);

export const COLOR_SCALE = [
  "#f5f3ff",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
] as const;

export const EXPORT_TYPES = [
  { label: "Tailwind", description: "Config object with full color, spacing, and font tokens." },
  { label: "CSS Variables", description: "Drop-in :root custom properties for any stack." },
  { label: "JSON Tokens", description: "Style Dictionary–compatible token file." },
  { label: "Figma Tokens", description: "Import directly into the Tokens Studio plugin." },
  { label: "Dark Mode", description: "Separate token set with WCAG-compliant contrast pairs." },
  { label: "Gradients", description: "Named gradient presets extracted from your screenshot." },
] as const;