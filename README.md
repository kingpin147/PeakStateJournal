# Peak State Journal

Peak State Journal is a premium, scientific, and data-driven longevity blog built for high-income professionals. It delivers peer-reviewed, clinical-grade articles on longevity, preventive health, nutrigenomics, and executive performance.

---

## 🚀 Features & Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: Tailwind CSS & Tailwind Animate with custom premium components
- **Content**: Markdown-driven MDX articles compiled using `next-mdx-remote`
- **Analytics**: Vercel Analytics integration
- **SEO & Metadata**:
  - Automatically generated dynamic XML sitemaps
  - Custom `robots.txt` configuration
  - Rich Open Graph & Twitter Card metadata
  - Strict canonical tag alignment

---

## 🛠️ Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and define your public site URL:
```env
NEXT_PUBLIC_SITE_URL=https://peak-state-journal.vercel.app
```
*(Replace this with your custom production domain once configured).*

### 3. Running Locally
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 4. Production Build
Verify the static generation compiles correctly:
```bash
npm run build
```

---

## 🔍 Google Search Console (Sitemap Fetch Failed) Troubleshooting

If you encounter a **"Sitemap fetch failed"** or **"Could not fetch"** status in Google Search Console (GSC), please check the following:

### 1. Domain Mismatch (Most Common)
Sitemaps are statically generated during the build step using `NEXT_PUBLIC_SITE_URL`. 
* **The Issue**: If `NEXT_PUBLIC_SITE_URL` in your Vercel project environment variables is set to the default `.vercel.app` domain but you submitted the sitemap under a custom domain (e.g. `yourdomain.com`), Google Search Console will reject it because the sitemap URLs point to a different host.
* **The Solution**: 
  1. Go to your **Vercel Dashboard** > **Project Settings** > **Environment Variables**.
  2. Add or update `NEXT_PUBLIC_SITE_URL` to point to your actual custom production domain (e.g., `https://yourdomain.com`).
  3. Re-deploy the application on Vercel so the sitemap is regenerated with matching canonical URLs.

### 2. Google Search Console Pending Bug
* **The Issue**: GSC frequently displays "Could not fetch" instantly when a new sitemap is submitted, before actually attempting to fetch it.
* **The Solution**: Use the **URL Inspection Tool** in GSC to test `/sitemap.xml` directly, or wait 24–48 hours for GSC to update.

### 3. Non-Canonical URLs Removed
* **The Issue**: Sitemaps must only contain canonical URLs. Previously, our sitemap included category filtering query parameters (e.g., `/?category=longevity`), which canonicalized back to the homepage. 
* **The Solution**: We have updated `sitemap.ts` to output only canonical routes (homepage and individual blog posts) to prevent indexation warnings in GSC.

