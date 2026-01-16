# Axiforma Font Files

Please place the following Axiforma font files in this directory:

- `Axiforma-Regular.woff2` (weight: 400)
- `Axiforma-Medium.woff2` (weight: 500)
- `Axiforma-Semibold.woff2` (weight: 600)
- `Axiforma-Bold.woff2` (weight: 700)

Once these files are added, the site will automatically use Axiforma for all headings (h1, h2, h3, h4, h5, h6).

The fonts are loaded via CSS @font-face, so the build will work even without these files (it will fall back to system fonts).
