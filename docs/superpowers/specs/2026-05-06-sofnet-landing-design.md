# Sofnet Landing — Design Spec

**Date:** 2026-05-06  
**Status:** Approved

---

## Overview

Rebuild sofnet.cl as a modern, professionally-designed Nuxt 4 landing page. Use the Sumando foundation (Fundación Sumando landing in `/landing`) as the structural and visual base, replacing all content with Sofnet's brand, services, and assets.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4.2 (`compatibilityDate: 2025-07-15`) |
| CSS | Tailwind CSS 4.1 via `@tailwindcss/vite` |
| UI Components | Preline 3.2 |
| Images | `@nuxt/image` |
| Contact form | Brevo (sib-api-v3-sdk) via server API route |
| Containerization | Docker multi-stage + docker-compose |
| Package manager | pnpm |

### Key config patterns (from Sumando)
- `@tailwindcss/vite` plugin in `vite.plugins`
- `@source "../../node_modules/preline/dist/*.js"` in main.css
- `@custom-variant dark (&:where(.dark, .dark *))` for dark mode
- Dark mode state via `useState('isDark')` + `localStorage`
- `container-custom` utility: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `section-padding`: `py-14 md:py-22 lg:py-30`

---

## Brand

| Token | Value |
|---|---|
| Primary navy | `#0d1b2a` |
| Navy mid | `#1e3a5f` |
| Accent red | `#e63946` |
| Text light | `#f1f5f9` |
| Background light mode | `#ffffff` / `#f8fafc` |
| Background dark mode | `#0d1b2a` / `#111827` |
| Font | Inter + Poppins (Google Fonts) |

---

## Sections (in order)

### 1. Navigation
- Sticky top, `z-50`, border-bottom
- Logo: Sofnet logo image (red icon + wordmark)
- Desktop links: Nosotros · Servicios · Clientes · Contacto
- Dark mode toggle button
- CTA button: **"Solicitar presupuesto"** — red background, white text
- Mobile: hamburger → slide-down menu with same links + theme toggle
- Same sticky/scroll pattern as Sumando Navigation.vue

### 2. Hero Slider
- Full-width, `h-[650px] md:h-[780px]`, `clip-path: ellipse(150% 100% at 50% 0%)`
- Background: `from-slate-900 to-blue-900/navy` gradient + image at 20% opacity
- **Slide 1:** "Innovación y Seguridad" / "Soluciones avanzadas en seguridad y tecnología para tu negocio" + stats grid (right, desktop only): Servicios, Años, Clientes, Proyectos
- **Slide 2:** "Especialistas en CCTV y Redes" / "Protege tu hogar y negocio con soluciones de clase mundial"
- **Slide 3:** "Conectividad Eficiente" / "Cableado estructurado certificado para una infraestructura robusta"
- CTAs: "Obtén una Cotización Gratis" (white/solid) + "Ver Servicios" (ghost/outline)
- Prev/Next arrows (desktop), dots indicator, auto-advance 5s
- Transition: `slide-fade` opacity animation

### 3. Partners Strip
- Infinite-scroll marquee with logos: Dahua · Hikvision · Office 365 · Ubiquiti · Xorcom
- Grayscale by default, hover shows color
- CSS animation `@keyframes marquee` (duplicated list for seamless loop)
- Light/dark backgrounds adapt

### 4. Servicios
- 2-col layout: sticky left header + vertical cards right (same pattern as Sumando ServicesSection.vue)
- Left: section badge "Nuestros Servicios", H2 "Soluciones Tecnológicas Integrales", blue accent bar, description
- **Card 1 — CCTV:** "Protege tu hogar y negocio con nuestras soluciones avanzadas de cámaras CCTV" · Features: Alta resolución 4K, Monitoreo 24/7, Acceso remoto
- **Card 2 — Cableado Estructurado Certificado:** "Conectividad óptima con cableado profesional certificado" · Features: Cat6/Cat6A, Certificación de red, Instalación profesional
- **Card 3 — Software ERP a Medida:** "Optimiza la gestión de tu empresa con software personalizado" · Features: Módulos a medida, Integración con sistemas existentes, Soporte continuo
- **Card 4 — Telefonía IP:** "Mejora tu comunicación empresarial con soluciones VoIP avanzadas" · Features: Xorcom partner, Reducción de costos, Escalabilidad
- Each card: decorative circle SVG icon top-right, hover border color change (navy → red accent)

### 5. Clientes
- Section title: "Empresas que confían en Sofnet"
- Logo grid or carousel: Bomberos Lo Miranda, Cormun Educación, EECOL, + 1-2 more
- Images from `/public/clientes/` (copied from sofnet.cl assets)
- Grayscale + hover color effect

### 6. Nosotros
- Same 2-col sticky pattern as Sumando AboutSection.vue
- Left: badge "Nuestra Historia", H2 "¿Quiénes Somos?", red accent bar, stats grid (Años de experiencia, Clientes, Proyectos)
- Right cards:
  - **Historia:** "Sofnet nació con la visión de empoderar a las empresas chilenas con tecnología de vanguardia..."
  - **Misión:** "Empoderar a las empresas con tecnología de vanguardia, asegurando su crecimiento y éxito a través de soluciones personalizadas y de alta calidad."
  - **Visión:** "Ser líderes en el sector tecnológico, reconocidos por nuestra innovación, excelencia y compromiso con el cliente."
  - **Valores grid (2×2):** Innovación · Excelencia · Compromiso · Confianza

### 7. CTA Banner
- Full-width band, navy background with red gradient accent
- H2: "¿Listo para proteger y conectar tu negocio?"
- Button: "Solicitar cotización gratis →" (white on red)
- Subtext: "Sin compromiso · Respuesta en 24 horas"

### 8. Contacto
- Form fields: Nombre, Empresa, Email, Teléfono, Mensaje
- Submit via `/api/contact` server route (Brevo API, same pattern as Sumando)
- Contact info block: dirección (placeholder), teléfono (placeholder), email (placeholder)
- Success/error toast notification

### 9. Footer
- Logo + tagline "Tu Socio Tecnológico de Confianza"
- Quick links column
- Contact info column
- Social media icons (Facebook, LinkedIn, Instagram)
- Copyright bar: "© 2024 Sofnet. Todos los derechos reservados."

---

## File Structure

```
/ (project root)
├── app/
│   ├── app.vue
│   ├── assets/css/main.css
│   ├── components/
│   │   ├── Navigation.vue
│   │   ├── HeroSection.vue
│   │   ├── PartnersStrip.vue
│   │   ├── ServicesSection.vue
│   │   ├── ClientsSection.vue
│   │   ├── AboutSection.vue
│   │   ├── CtaBanner.vue
│   │   ├── ContactSection.vue
│   │   ├── Footer.vue
│   │   └── BackgroundPattern.vue
│   ├── composables/
│   │   └── useDarkMode.ts
│   ├── layouts/default.vue
│   ├── pages/index.vue
│   └── plugins/
│       ├── dark-state.client.ts
│       └── preline.client.ts
├── public/
│   ├── images/          ← hero backgrounds from sofnet.cl assets
│   ├── clientes/        ← client logos
│   ├── partners/        ← brand logos (dahua, hikvision, etc.)
│   ├── logo-sofnet.png  ← from sofnet.cl assets
│   └── favicon.ico
├── server/api/
│   └── contact.post.ts
├── nuxt.config.ts
├── tsconfig.json
├── .env
├── .gitignore
├── .dockerignore
├── Dockerfile
└── docker-compose.yml
```

---

## Docker

**Dockerfile** (multi-stage, same pattern as `/landing/docker/prod/Dockerfile`):
- Stage 1 `builder`: `node:22-slim`, install deps, build
- Stage 2 runtime: `node:22-slim`, copy `.output`, `ENV PORT=3000`, `CMD node .output/server/index.mjs`

**docker-compose.yml:**
- Service `web`, build `.`, port `3000:3000`, restart `unless-stopped`
- `.env` mounted for secrets

**.dockerignore:** `node_modules`, `.nuxt`, `.output`, `.data`, `docs`, `.superpowers`

---

## Contact Placeholder

The current sofnet.cl has fake contact data. Deploy with placeholder values and replace when real data is provided:
- Address: `[Dirección pendiente]`
- Phone: `[Teléfono pendiente]`
- Email: `[Email pendiente]`

---

## Out of Scope

- Team section (removed per user request)
- Multi-language / i18n
- Blog / CMS
- User authentication
