# Threshold Games

An Astro landing page for Threshold Games, an Orlando-based trading card and tabletop gaming company. Content lives in the repository and is edited with Pages CMS. Deployment is configured for Netlify.

## Local development

Use Node.js 22.12 or newer (Node 22 is configured for Netlify).

```sh
npm ci
npm run dev
```

- `npm run build` checks TypeScript and creates the static site in `dist/`.
- `npm run preview` serves the production build.
- `npm run test:browser` builds and tests desktop/mobile layouts, accessibility, links, and optional contact states. First run `npx playwright install chromium` to install the test browser. Alternatively set `PLAYWRIGHT_CHANNEL=chrome` to use an installed Chrome.
- `npm run test:content` verifies that the CMS schema covers the content file.

## Deploy with Netlify

1. Add a project in your Netlify account by importing `Threshold-Games-Orlando/website`.
2. Select the `main` branch. The root directory is the repository root.
3. Netlify reads `netlify.toml`: build command `npm run build`, publish directory `dist`, Node 22.
4. Deploy, then attach your chosen domain through Netlify.
5. Content edits committed to `main` trigger deployments when continuous deployment is enabled.

No API keys, database, or environment variables are required for the landing page.

## Set up your Pages CMS login

1. Open https://app.pagescms.org/ and sign in with your GitHub account.
2. Install/authorize the Pages CMS GitHub App for the Threshold-Games-Orlando organization, granting access to **this repository only**.
3. Open the `website` repository and the `main` branch.
4. Open **Website content**. The editor uses `.pages.yml` to expose headings, descriptions, principles, the TCGplayer link, socials, contact email, and the contact-form switch.
5. Save your edits, then wait for Netlify to deploy the resulting commit.

The admin experience is hosted by Pages CMS. There is no local password or public registration endpoint in this site. Keep repository write access and Pages CMS editor access restricted to your account; do not invite collaborators if you want to remain the only editor.

Content is stored in `src/content/site.json`. Required content, email addresses, and HTTPS links are validated during build. Invalid edits fail the new build rather than replacing the last successful Netlify deployment.

## Socials and contact

- Social URLs and the contact email start empty. The page displays a coming-soon message instead of broken links.
- Add social entries with a platform label and a complete HTTPS account URL.
- Add a public contact email when ready; it appears as an email link.
- The contact form starts **off** because receiving submissions has not been configured.

To enable the form:

1. In Netlify, open **Forms** and enable form detection.
2. In Pages CMS, turn on **Enable contact form**, save, and wait for a successful deployment.
3. Verify that Netlify has detected the `contact` form; configure its email notifications to your chosen address.
4. Send a test message on the deployed site and confirm both the stored submission and the notification.

The form uses Netlify's native POST handling with a honeypot, labeled fields, validation, and a custom thank-you page. Local preview does not process submissions. The thank-you route alone is not evidence of a stored submission.

## Design and assets

The temporary wordmark, portal, and crystal are code-based SVG/CSS. There are no generated raster images, stock artwork, third-party game assets, or remote font requests. Manrope and Cormorant Garamond fonts are bundled from Fontsource under their open font licenses. Replace the temporary mark and favicon when final brand assets are ready.

The TCGplayer button goes directly to the supplied seller URL; there is no inventory feed or in-site checkout. Reduced-motion preferences are respected.

## Before launch

- Connect Netlify and Pages CMS.
- Review the drafted copy.
- Add the final brand assets and domain when ready.
- Add social accounts and contact details (reminder requested for September 13, 2026).
- If enabling the contact form, complete the deployed submission check described above.
