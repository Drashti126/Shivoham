# SHIVOHAM Brand Assets Guide

## 1. Logo Asset
Place your original SHIVOHAM logo file in this folder:
`public/images/logo/`

Recommended filenames:
- `shivoham-logo.png` (Transparent high-resolution PNG)
- `shivoham-logo.svg` (Vector format for optimal crispness)

Once you drop the logo file here, simply update `src/components/LogoPlaceholder.tsx` to display your file directly with Next.js `<Image />`.
Remember: Per project rules, we do not redesign, regenerate, recolor, or distort your logo.

## 2. Product Images
Organize your real product photography into:
`public/images/products/`
Examples:
- `public/images/products/saree-banarasi-royal.jpg`
- `public/images/products/suit-anarkali-chanderi.jpg`
- `public/images/products/kurti-embroidered-ivory.jpg`

Then reference them directly in `src/data/sampleProducts.ts`.
