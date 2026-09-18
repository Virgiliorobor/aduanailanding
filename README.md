# AduanAI Landing Page

Production-quality marketing landing page for AduanAI — AI tools for customs professionals.

## Tech Stack

- **Vite** — Fast build tool
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Custom design system with brand tokens

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Build Output

The production build generates static files in the `dist/` directory:

```bash
npm run build
```

### Deploy to aduanai.com.mx

**Option 1: GitHub Pages**

1. Build the project: `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch
3. Configure GitHub Pages to serve from that branch

**Option 2: Static Host (Vercel, Netlify, etc.)**

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure custom domain: `aduanai.com.mx`

**Option 3: Self-Hosted Server**

1. Build: `npm run build`
2. Copy `dist/` contents to your web server
3. Configure server to serve `index.html` for all routes
4. Point `aduanai.com.mx` DNS to your server

### Custom Domain Setup

Configure DNS A/CNAME records for `aduanai.com.mx` to point to your hosting provider's servers.

## Design Principles

- **Bold typography** — Large, confident type hierarchy
- **Minimal text** — Visual design carries the brand edge
- **High contrast** — Dark theme with precise color palette
- **Lots of whitespace** — Breathing room between sections
- **No generic AI gradients** — Custom brand tokens

## Brand Positioning

- AI **augmentation**, not automation
- Empowers customs professionals
- 20+ years Mexico manufacturing customs expertise
- Spanish-primary, international posture

---

**Domain:** aduanai.com.mx  
**Founder:** Jaime Robinson — Guadalajara, México
