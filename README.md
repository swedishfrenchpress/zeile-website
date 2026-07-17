# zeile-website

The marketing site for zeile —
a tiny two-person note & doodle app that lives on your Home Screen.

Built with Next.js (App Router) · Tailwind CSS v4 · framer-motion.
Structure borrowed from [cashu.me-website](https://github.com/swedishfrenchpress/cashu.me-website);
skin and soul from zeile's own design system ("the note on the mirror").

## Develop

```bash
npm install
npm run dev
```

## Before launch

- [ ] Set the real `APP_STORE_URL` in `src/lib/config.tsx`
- [ ] Confirm the production domain (`siteConfig.url`)
- [ ] Drop simulator screenshots into `public/images/screens/`
      (exact filenames are printed inside the on-page placeholders),
      then flip `ready: true` in `src/lib/config.tsx`

Deploys on Vercel with zero config.
