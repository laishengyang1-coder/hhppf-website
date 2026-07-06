# H&H Automotive Films

Official website for H&H Automotive Films brand.

## Structure
- `index.html` - English version
- `index-zh.html` - Chinese version
- `index-ru.html` - Russian version
- `site-language.js` - Russian homepage localization
- `styles.css` - Stylesheet
- `scroll-animations.js` - Scroll animation system
- `assets/` - Images and media files
- `warranty/` - H&H Warranty & Partner Points System V1 preview
- `docs/warranty-system-design.md` - Cloudflare production implementation plan

## Deployment
- Domain: hhppf.com
- Current GitHub deployment: GitHub Pages + Cloudflare DNS
- Cloudflare Pages project: `hhppf-website`
- Cloudflare preview URL: https://hhppf-website.pages.dev/
- Manual Cloudflare deploy: `npm run deploy:cloudflare`
- Future warranty system target: warranty.hhppf.com
