# Potentia Clinics: Landing Page

Built by **37 Consult**. Astro static site, hosted on Vercel. Content managed by 37 Consult on the client's behalf.

## Edit content (Dario / Hamza)

All content lives in this repo. Edit via GitHub's web editor, no terminal needed:

**Text changes:**
1. Open `src/lib/site-content.ts` in the GitHub web UI
2. Click the pencil (✏️) → edit → "Commit changes"
3. Live within ~30 to 60 seconds (Vercel auto-rebuilds)

**Image changes:**
1. Navigate to `public/images/` → **Add file → Upload files** → drag and drop → commit
2. To replace: delete the old image, upload with the same name (or a new name and update the path in `site-content.ts`)
3. Live within ~30 to 60 seconds

## Routes

| Route | Content file | Purpose |
|---|---|---|
| `/` | `src/lib/site-content.ts` | Main landing page |
| `/intake` | `src/lib/site-content-intake.ts` | Intake-session funnel for ad traffic |
| `/thank-you` | n/a | Post-submit page, both forms redirect here |

Both routes share the trust strip, proof, about and footer sections, so a change to
those shows up on both pages. Page-specific copy lives in the two content files above.

## Develop locally (for bigger changes)

```bash
npm install
npm run dev
# open http://localhost:4321
```

## Deploy

Pushing to `main` on this repo triggers an automatic Vercel deploy (`37consult/potentia-landing`). No manual step.

## Stack

- **Framework:** Astro 5
- **Styling:** Tailwind 3.4
- **Hosting:** Vercel (`37consult` team)
- **Domains:** `potentiaclinics.com` (main page) and `book.potentiaclinics.com` (intake funnel at `/intake`).
  Both point at this one Vercel project. DNS managed by the client's registrar.
- **CMS:** none by default. The `@storyblok/astro` integration ships in the template but stays dormant unless `STORYBLOK_TOKEN` is set in Vercel env (opt-in per client).

## Contact

`hamza.javed@37consult.com` (37 Consult)
