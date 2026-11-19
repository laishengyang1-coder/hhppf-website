# H&H Automotive Films

Official website for H&H Automotive Films brand.

## Structure
- `index.html` - English version
- `index-zh.html` - Chinese version
- `styles.css` - Stylesheet
- `scroll-animations.js` - Scroll animation system
- `assets/` - Images and media files
- `color-studio/` - Interactive film swatches and vehicle visualization in English and Simplified Chinese
- [Color Studio handoff](docs/color-studio.md) - Range, localization, 3D assets, release and verification
- `warranty/` - H&H Warranty & Partner Points System V1 preview
- `docs/warranty-system-design.md` - Cloudflare production implementation plan

## Deployment
- Domain: hhppf.com
- Production: Cloudflare Pages direct upload. Both `hhppf.com` and `www.hhppf.com` are assigned to the `hhppf-website` project. GitHub Pages also builds on pushes to `main`.
- Cloudflare Pages project: `hhppf-website`
- Cloudflare Pages project URL: https://hhppf-website.pages.dev/
- Cloudflare deploy: commit the intended build, then use `npm run deploy:cloudflare`. Deploy the original GLB files. Cloudflare Pages applies the gzip response headers in `_headers`.
- Future warranty system target: warranty.hhppf.com
