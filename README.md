# VibeKit

Convert visual inspiration into production-ready design systems.

VibeKit is a design analysis and generation platform built with Next.js, TypeScript, Tailwind CSS, and modern image-processing pipelines. It extracts structured design primitives from screenshots and transforms them into reusable assets including color systems, design tokens, gradients, accessibility reports, and implementation-ready exports.

The goal is simple:

> Move from visual reference → implementation faster.

Instead of manually reverse engineering colors, gradients, and visual patterns from existing designs, VibeKit generates a structured design system that can be immediately integrated into modern frontend workflows.

---

# Overview

A screenshot contains significantly more information than a color palette.

Most extraction tools stop after identifying a handful of dominant colors.

VibeKit treats a screenshot as a design artifact and attempts to derive:

* Color systems
* Palette hierarchy
* Scale generation
* Gradient structures
* Accessibility characteristics
* UI previews
* Design tokens
* Frontend implementation assets

The result is a system that bridges the gap between visual inspiration and production code.

---

# Core Capabilities

## Screenshot Analysis

Upload screenshots from:

* Web applications
* Landing pages
* Mobile applications
* Dashboards
* Marketing websites
* Ecommerce stores
* Editorial layouts
* Product designs

The analysis pipeline performs image preprocessing, palette extraction, normalization, and token generation.

### Image Processing Pipeline

1. Upload image
2. Resize and optimize
3. Extract dominant colors
4. Extract accent colors
5. Remove noise
6. Deduplicate colors
7. Generate scales
8. Produce exports

Current implementation uses:

* Sharp
* Extract Colors
* Node Vibrant

to balance dominant-color accuracy with visual diversity.

---

## Palette Extraction

VibeKit combines multiple extraction approaches.

### Dominant Color Extraction

Used for identifying the primary visual colors occupying the largest portions of the design.

Useful for:

* Background colors
* Brand colors
* Surface colors

### Accent Color Extraction

Used for identifying:

* Buttons
* Highlights
* Call-to-actions
* Interactive elements

### Palette Normalization

Raw extracted colors are:

* deduplicated
* ranked
* filtered
* normalized

before being surfaced to users.

This prevents common extraction issues such as:

* multiple nearly-identical colors
* excessive grayscale values
* unusable near-black colors
* unusable near-white colors

---

# Design System Generation

After extraction, VibeKit generates structured color systems.

Example:

```ts
{
  primary: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617"
  }
}
```

Generated scales follow the same conventions used by:

* Tailwind CSS
* Radix Colors
* shadcn/ui
* modern design systems

---

# Gradient Engine

The gradient engine supports generation, editing, previewing, and exporting.

Supported gradient types:

## Linear

```css
linear-gradient(135deg, #8B5CF6, #EC4899)
```

## Radial

```css
radial-gradient(circle, #8B5CF6, #EC4899)
```

## Conic

```css
conic-gradient(from 180deg, #8B5CF6, #EC4899)
```

## Mesh

Animated multi-point mesh gradients built using:

* GSAP
* layered blur fields
* animated color nodes
* compositing effects

The mesh implementation is designed to emulate modern branding systems commonly seen across:

* Vercel
* Linear
* Stripe
* Raycast
* Arc Browser

---

# Color Exploration Toolkit

The color exploration engine provides tooling beyond extraction.

## Color Formats

Supported formats:

* HEX
* RGB
* HSL
* HSV

## Color Harmonies

Generated harmonies include:

### Complementary

180° hue shift.

### Analogous

±30° hue offsets.

### Triadic

120° hue spacing.

### Split Complementary

150° / 210° hue offsets.

## Color History

Recent color tracking allows quick iteration and comparison.

---

# Accessibility Analysis

VibeKit includes a WCAG contrast analysis engine.

For any foreground/background combination it calculates:

* Contrast ratio
* AA compliance
* AAA compliance
* Large-text compliance
* Small-text compliance

### Example

```txt
Foreground: #FFFFFF
Background: #2563EB

Contrast Ratio: 8.59:1

AA Normal: Pass
AAA Normal: Pass
AA Large: Pass
AAA Large: Pass
```

---

# UI Simulation Engine

Colors are significantly easier to evaluate in context.

VibeKit generates interactive previews across multiple interface types.

## Dashboard

Analytics-oriented layouts.

## Landing Page

Marketing-oriented layouts.

## Mobile Application

Mobile-first interfaces.

## Ecommerce

Product-oriented layouts.

These previews help validate whether extracted colors function correctly across real UI surfaces.

---

# Export System

Generated assets can be exported into multiple formats.

## CSS Variables

```css
:root {
  --primary-50: #f8fafc;
  --primary-100: #f1f5f9;
}
```

## Tailwind Theme

```ts
colors: {
  primary: {
    50: "#f8fafc",
    100: "#f1f5f9"
  }
}
```

## JSON Tokens

```json
{
  "primary": {
    "500": "#6366F1"
  }
}
```

The export layer is designed around implementation rather than visualization.

---

# Architecture

## Frontend

* Next.js App Router
* React
* TypeScript
* Tailwind CSS v4

## Animation

* GSAP

## Image Processing

* Sharp
* Extract Colors
* Node Vibrant

## UI Components

* shadcn/ui
* Radix UI
* Lucide Icons

## Export Utilities

* html-to-image
* Color

---

# Project Structure

```txt
app/
├── create/
├── tools/
│   ├── color-picker/
│   ├── contrast-checker/
│   ├── gradient-generator/
│   └── screenshot-analyzer/
│
├── api/
│   └── extract-palette/

components/
├── hero/
├── gallery/
├── exports/
├── tools/
│   ├── color-picker/
│   ├── contrast-checker/
│   └── gradient-generator/

lib/
constants/
types/
```

---

# Performance Considerations

Images are resized before processing to reduce extraction cost and improve response times.

Current extraction pipeline:

* Resizes large uploads
* Removes redundant pixel analysis
* Limits color sampling regions
* Performs palette deduplication

This allows fast analysis while preserving visual accuracy.

---

# Future Development

## URL-Based Analysis

Analyze live websites directly from URLs.

### Pipeline

1. Capture page screenshot
2. Extract design primitives
3. Generate design system
4. Produce exports

---

## Design Token Expansion

Planned token categories:

* Typography
* Spacing
* Border radius
* Shadows
* Layout primitives
* Component tokens

---

## Figma Integration

Direct export into:

* Figma Variables
* Tokens Studio
* Design Tokens Community Group specification

---

## Theme Marketplace

A searchable library of generated design systems.

Users will be able to:

* Publish themes
* Fork themes
* Remix themes
* Share exports

---

# Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

---

# License

MIT

---

Built by Sarvajith Karun.
