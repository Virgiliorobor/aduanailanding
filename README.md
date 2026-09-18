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

### Production Deploy with Coolify (Recommended)

This repository is configured for automatic deployment via Coolify using the GitHub App webhook.

**Configuration:**

1. **Add Repository in Coolify:**
   - Connect via Coolify GitHub App
   - Repository: `Virgiliorobor/aduanailanding`
   - Branch: `main` (deploy after PR merge)

2. **Build Settings:**
   - Build Pack: **Dockerfile**
   - Build Command: (automatic from Dockerfile)
   - Publish Directory: (automatic from Dockerfile)

3. **Port Configuration:**
   - Container Port: **8743**
   - **IMPORTANT:** Port 8743 is used to avoid conflicts with other services on the shared host
   - Coolify will proxy this port through its reverse proxy (Traefik)

4. **Domain Settings:**
   - Domain: `aduanai.com.mx`
   - Coolify handles SSL/TLS certificates automatically
   - DNS: Point `aduanai.com.mx` A/CNAME record to your Coolify host

5. **Deployment:**
   - Push to `main` branch triggers automatic deployment
   - No environment variables required for static site v1
   - Coolify pulls, builds via multi-stage Dockerfile, deploys to port 8743

**Local Docker Testing:**

```bash
# Build the Docker image
docker build -t aduanai-landing .

# Run container locally
docker run -p 8743:8743 aduanai-landing

# Or use docker-compose
docker-compose up

# Access at http://localhost:8743
```

**Why Port 8743?**
The founder's server runs multiple applications. Port 8743 avoids common conflicts with:
- 80/443 (Coolify reverse proxy)
- 3000, 5173, 8080, 8000 (other dev servers)

### Alternative Deployment Options

**Option 1: GitHub Pages**

1. Build the project: `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch
3. Configure GitHub Pages to serve from that branch

**Option 2: Static Host (Vercel, Netlify, etc.)**

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure custom domain: `aduanai.com.mx`

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
