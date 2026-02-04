# Rajesh Gangadharam — Developer Portfolio

A modern **software developer portfolio** built with React + TypeScript. It showcases full‑stack projects (Django/FastAPI + React) and ML demos with a performance‑minded UI (scroll-triggered animations + Three.js background).

![Portfolio preview](public/demo.png)

## Links

- Live site: _(add your URL)_  
- Resume: `public/Rajesh_FullStack_Developer.pdf`
- GitHub: `https://github.com/RAJESH2961`
- LinkedIn: `https://www.linkedin.com/in/rajesh2906/`

## Tech Stack

- Frontend: React 18, TypeScript, Vite (SWC), React Router
- UI: Tailwind CSS, shadcn/ui (Radix UI), lucide-react
- UX/Effects: Three.js + @react-three/fiber/@react-three/drei, scroll animations (IntersectionObserver)
- Tooling: ESLint, PostCSS

## What’s Inside

- Responsive, recruiter-friendly layout (About, Experience, Projects, Contact)
- Dark/light mode with persisted preference
- Contact form integration (Formspree)
- 3D particle background (React Three Fiber)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## SEO & Deployment Notes

- Update the placeholder domain in:
  - `index.html` (canonical + Open Graph URLs)
  - `public/robots.txt` (Sitemap URL)
  - `public/sitemap.xml`
- If deploying as an SPA, ensure your host rewrites unknown routes to `index.html` (Netlify/Vercel do this via config; GitHub Pages needs extra setup).
