# Dark Knight Unisex Fitness Centre

Next.js (App Router) + TypeScript + Tailwind v4, GSAP/ScrollTrigger, Framer Motion, Lenis, Lucide.
Fonts: Space Grotesk and Inter (self-hosted via Fontsource, no network needed at build).

## Run locally
```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## Edit content (all in `src/config`)
| File | What it controls |
| --- | --- |
| `site.ts` | Phone, WhatsApp (digits with country code), email, address, hours, social links, exact Google Maps URL, public site URL |
| `content.ts` | Headlines, hero sample stats, features, programs, membership plans and prices |
| `images.ts` | Every photo. Drop files in `public/images` and change the paths |

Membership prices and contact information currently use clearly identified demo values. Replace them with verified centre details in `src/config/content.ts` and `src/config/site.ts` before launch. The contact form opens WhatsApp with a prefilled message, and the contact section includes a compact square map based on the configured address.

## Logo
`public/brand/logo.svg` is a vector trace of the supplied logo, so it stays sharp at any size. `public/brand/logo-8k.png` is the same logo rendered at 8192 px for print or large displays. The site red (`#dc2c1d`) is sampled from the logo.

## Location
Set `locality`, `city` and/or `address` in `src/config/site.ts` to replace the demo location; the area appears in the About section, footer, page title and contact section.

## Hero athlete
`public/images/runner.jpg` is shown through a screen blend, a red colour grade and a soft mask so it merges into the page. Replace it with a licensed photo on a dark background for best results. The red trails, floating stat cards and loader are code, not part of the image.

## Deploy to Vercel
1. Push the project to a GitHub repo (`git init && git add . && git commit -m "Dark Knight site"` then push).
2. Go to vercel.com, choose **Add New > Project** and import the repo. Framework is detected as Next.js. No environment variables are needed.
3. Click **Deploy**. Add the studio's domain under **Settings > Domains** when ready.
4. Set `url` in `src/config/site.ts` to the final domain and redeploy so link previews and SEO use it.

CLI alternative: `npm i -g vercel && vercel --prod`.
