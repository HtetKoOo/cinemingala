# CineMingala

CineMingala is a movie and TV discovery app. Explore titles, watch trailers,
build a local watchlist, and check where a title is available by region.

It is built with Next.js, React, TypeScript, Tailwind CSS, and the TMDB API.

## Local development

Create `.env.local` in the project root:

```dotenv
TMDB_API_KEY=your_tmdb_api_key
```

The TMDB endpoint URLs are defined in `lib/tmdb-endpoints.ts`. The API key is
used only by server-side services. Do not commit `.env.local`.

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy on Vercel

Set `TMDB_API_KEY` in the Vercel project's Environment Variables for Production
and Preview deployments. No endpoint URL variables are required. Redeploy after
changing environment variables.

Next.js image optimization is disabled in `next.config.ts`. TMDB supplies
pre-sized image URLs, so images load directly from its CDN instead of using
Vercel Image Optimization quota.
