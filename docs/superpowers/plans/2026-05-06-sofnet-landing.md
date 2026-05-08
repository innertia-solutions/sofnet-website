# Sofnet Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Sofnet landing page at `/Users/guillermofarias/Sites/inertia/sonfet/` using Nuxt 4 + Tailwind 4 + Preline 3, based on the Sumando template in `/landing/`, adapted to Sofnet's brand and content.

**Architecture:** Single-page Nuxt 4 app with `app/` directory structure. 8 sections assembled in `pages/index.vue`. Dark mode via `useState('isDark')` + localStorage. Contact form posts to `/api/contact` (Brevo). Docker multi-stage for deployment.

**Tech Stack:** Nuxt 4.2, Tailwind CSS 4.1 (@tailwindcss/vite), Preline 3.2, @nuxt/image, sib-api-v3-sdk (Brevo), Docker node:22-slim

---

## File Map

```
/ (project root = /Users/guillermofarias/Sites/inertia/sonfet/)
├── package.json                          ← copy from landing/ + update name
├── nuxt.config.ts                        ← Sofnet head meta, same vite/modules config
├── tsconfig.json                         ← copy from landing/
├── .gitignore
├── .dockerignore
├── .env                                  ← BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_RECEIVER_EMAIL
├── Dockerfile
├── docker-compose.yml
├── app/
│   ├── app.vue                           ← NuxtLayout + NuxtPage
│   ├── assets/css/main.css               ← Tailwind 4 imports + brand tokens + utilities
│   ├── composables/useDarkMode.ts        ← copy from landing/
│   ├── plugins/
│   │   ├── preline.client.ts             ← copy from landing/
│   │   └── dark-state.client.ts          ← copy from landing/
│   ├── layouts/default.vue               ← <slot />
│   ├── pages/index.vue                   ← assembles all sections
│   └── components/
│       ├── Navigation.vue                ← sticky nav, dark mode, mobile menu, red CTA
│       ├── HeroSection.vue               ← 3-slide carousel, clip-path, stats cards
│       ├── PartnersStrip.vue             ← CSS marquee with 5 partner logos
│       ├── ServicesSection.vue           ← sticky-left + 4 service cards
│       ├── ClientsSection.vue            ← 2-col: logo grid left + sticky header right
│       ├── AboutSection.vue              ← sticky-left + Historia/Misión/Visión/Valores
│       ├── CtaBanner.vue                 ← full-width navy gradient + red CTA
│       ├── ContactSection.vue            ← 2-col: form left + info right
│       └── Footer.vue                    ← 4-col grid + copyright bar
├── public/
│   ├── init-theme.js                     ← copy from landing/
│   ├── favicon.ico                       ← copy from landing/
│   ├── logo-sofnet.png                   ← from assets/logo-web-rojo-2-D00511Lq.png
│   ├── images/
│   │   ├── hero-bg1.jpg                  ← from assets/background2-BDmN_0lA.jpg
│   │   ├── hero-bg2.jpg                  ← from assets/background3-C8r8dAXS.jpg
│   │   ├── cctv.jpeg                     ← from assets/cctv-Chd-eK_P.jpeg
│   │   ├── cableado.jpg                  ← from assets/cableado-DftS_8Ve.jpg
│   │   ├── erp.png                       ← from assets/erp-DxXvMtPe.png
│   │   └── telefonia.jpeg                ← from assets/telefonia-Cpc-IoAj.jpeg
│   ├── partners/
│   │   ├── dahua.png                     ← from assets/dahua-BEVIyi9M.png
│   │   ├── hikvision.png                 ← from assets/hikvision-Dh5iHXTq.png
│   │   ├── office365.png                 ← from assets/office365-CX7J5p8H.png
│   │   ├── ubiquiti.png                  ← from assets/ubiquiti-9mlkek-1.png
│   │   └── xorcom.png                    ← from assets/xorcom-BZXEGOzf.png
│   └── clientes/
│       ├── bomberos.jpeg                 ← from assets/bomba_lomiranda-B61ZMV64.jpeg
│       ├── cormun.png                    ← from assets/cormun-DglBkV17.png
│       └── eecol.webp                    ← from assets/eecol-Dwc2nfGX.webp
└── server/api/
    └── contact.post.ts                   ← Brevo API, adapted from landing/
```

---

## Task 1: Project scaffold — configs and base files

**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "sofnet-website",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@nuxt/image": "2.0.0",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.11",
    "@tailwindcss/vite": "^4.1.18",
    "nuxt": "^4.2.2",
    "preline": "^3.2.3",
    "sib-api-v3-sdk": "^8.5.0",
    "tailwindcss": "^4.1.18",
    "vue": "^3.5.26",
    "vue-router": "^4.6.4"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.14.0",
    "@types/node": "^25.0.3"
  },
  "packageManager": "pnpm@9.15.2+sha1.0ffb02f94047016ec7e088030337455b4c94bb34"
}
```

- [ ] **Step 2: Create nuxt.config.ts**

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'es-CL' },
      title: 'Sofnet | Tu Socio Tecnológico de Confianza',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Soluciones avanzadas en seguridad y tecnología para tu negocio. CCTV, cableado estructurado, software ERP y telefonía IP.' },
        { name: 'keywords', content: 'CCTV, cableado estructurado, ERP, telefonía IP, seguridad, Chile' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://sofnet.cl/' },
        { property: 'og:title', content: 'Sofnet | Tu Socio Tecnológico de Confianza' },
        { property: 'og:description', content: 'Soluciones avanzadas en seguridad y tecnología para tu negocio.' },
        { property: 'og:image', content: 'https://sofnet.cl/og-image.png' },
        { property: 'og:locale', content: 'es_CL' },
        { name: 'theme-color', content: '#0d1b2a' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://sofnet.cl/' },
      ],
      script: [
        { src: '/init-theme.js', type: 'text/javascript' }
      ]
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/image'],
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./.nuxt/tsconfig.server.json" },
    { "path": "./.nuxt/tsconfig.shared.json" },
    { "path": "./.nuxt/tsconfig.node.json" }
  ]
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules
.nuxt
.output
.data
dist
.env
*.local
.DS_Store
.superpowers
```

- [ ] **Step 5: Create .env** (copy from `landing/.env`, update sender/receiver to Sofnet)

```
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=contacto@sofnet.cl
BREVO_RECEIVER_EMAIL=contacto@sofnet.cl
```

- [ ] **Step 6: Commit**

```bash
git init
git add package.json nuxt.config.ts tsconfig.json .gitignore
git commit -m "feat: scaffold Sofnet Nuxt 4 project"
```

---

## Task 2: CSS, plugins, composables, layout, app.vue

**Files:**
- Create: `app/assets/css/main.css`
- Create: `app/plugins/preline.client.ts`
- Create: `app/plugins/dark-state.client.ts`
- Create: `app/composables/useDarkMode.ts`
- Create: `app/layouts/default.vue`
- Create: `app/app.vue`
- Create: `public/init-theme.js`

- [ ] **Step 1: Create app/assets/css/main.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap');

@import "tailwindcss";
@import "preline/variants.css";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/aspect-ratio";

@source "../../node_modules/preline/dist/*.js";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-brand-navy: #0d1b2a;
  --color-brand-navy-mid: #1e3a5f;
  --color-brand-red: #e63946;
  --color-brand-red-dark: #c0392b;
}

@layer base {
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; }
  button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; }
}

@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  .section-padding {
    @apply py-14 md:py-22 lg:py-30;
  }
  .section-padding-sm {
    @apply py-12 md:py-16 lg:py-20;
  }
  .btn-red {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-all duration-200 shadow-lg;
  }
  .btn-outline-white {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200;
  }
}
```

- [ ] **Step 2: Create app/plugins/preline.client.ts** (copy exactly from `landing/app/plugins/preline.client.ts` — no changes needed)

```ts
declare global {
  interface Window {
    HSStaticMethods?: { autoInit?: () => void }
    HSThemeAppearance?: { init?: () => void }
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.client) return
  try {
    await import('preline')
    const initPreline = () => {
      window.HSStaticMethods?.autoInit?.()
      window.HSThemeAppearance?.init?.()
    }
    const performMultipleInits = () => {
      initPreline()
      setTimeout(initPreline, 50)
      setTimeout(initPreline, 200)
      setTimeout(initPreline, 500)
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', performMultipleInits)
    } else {
      nextTick(performMultipleInits)
    }
    const router = useRouter()
    router.afterEach(() => { requestAnimationFrame(() => performMultipleInits()) })
    nuxtApp.hooks.hookOnce('app:mounted', () => performMultipleInits())
    nuxtApp.hooks.hook('page:finish', () => setTimeout(performMultipleInits, 50))
  } catch (error) {
    console.warn('Error al cargar Preline:', error)
  }
})
```

- [ ] **Step 3: Create app/plugins/dark-state.client.ts** (copy exactly from landing)

```ts
export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) return
  const isDark = useState<boolean>('isDark', () => false)
  const updateTheme = () => {
    if (typeof document !== 'undefined') {
      isDark.value = document.documentElement.classList.contains('dark')
    }
  }
  let observer: MutationObserver | null = null
  const initializeTheme = () => {
    updateTheme()
    if (observer) observer.disconnect()
    observer = new MutationObserver(() => updateTheme())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme)
  } else {
    nextTick(initializeTheme)
  }
  nuxtApp.hook('app:beforeUnmount', () => { observer?.disconnect(); observer = null })
})
```

- [ ] **Step 4: Create app/composables/useDarkMode.ts**

```ts
export const useDarkMode = () => {
  const isDark = useState<boolean>('isDark', () => false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('hs_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('hs_theme', 'light')
    }
  }

  return { isDark, toggleDarkMode }
}
```

- [ ] **Step 5: Create app/layouts/default.vue**

```vue
<template>
  <div>
    <slot />
  </div>
</template>
```

- [ ] **Step 6: Create app/app.vue**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 7: Create public/init-theme.js** (copy from `landing/public/init-theme.js` — identical)

```js
(function () {
  try {
    const theme = localStorage.getItem('hs_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  } catch (e) { console.warn('Error initializing theme:', e); }
})();
```

- [ ] **Step 8: Install dependencies and verify dev server starts**

```bash
cd /Users/guillermofarias/Sites/inertia/sonfet
pnpm install
pnpm dev
```

Expected: dev server starts at `http://localhost:3000` (blank page is fine, no errors in terminal)

- [ ] **Step 9: Commit**

```bash
git add app/ public/init-theme.js
git commit -m "feat: add CSS, plugins, composables, layout and app shell"
```

---

## Task 3: Public assets — copy and organize images

**Files:**
- Create: `public/logo-sofnet.png`
- Create: `public/images/hero-bg1.jpg`, `hero-bg2.jpg`, `cctv.jpeg`, `cableado.jpg`, `erp.png`, `telefonia.jpeg`
- Create: `public/partners/` (5 files)
- Create: `public/clientes/` (3 files)
- Create: `public/favicon.ico`

- [ ] **Step 1: Create directories and copy all assets**

```bash
mkdir -p /Users/guillermofarias/Sites/inertia/sonfet/public/images
mkdir -p /Users/guillermofarias/Sites/inertia/sonfet/public/partners
mkdir -p /Users/guillermofarias/Sites/inertia/sonfet/public/clientes

ASSETS=/Users/guillermofarias/Sites/inertia/sonfet/assets
PUB=/Users/guillermofarias/Sites/inertia/sonfet/public

# Logo
cp "$ASSETS/logo-web-rojo-2-D00511Lq.png" "$PUB/logo-sofnet.png"

# Hero backgrounds (service images)
cp "$ASSETS/background2-BDmN_0lA.jpg" "$PUB/images/hero-bg1.jpg"
cp "$ASSETS/background3-C8r8dAXS.jpg" "$PUB/images/hero-bg2.jpg"

# Service images
cp "$ASSETS/cctv-Chd-eK_P.jpeg"      "$PUB/images/cctv.jpeg"
cp "$ASSETS/cableado-DftS_8Ve.jpg"    "$PUB/images/cableado.jpg"
cp "$ASSETS/erp-DxXvMtPe.png"         "$PUB/images/erp.png"
cp "$ASSETS/telefonia-Cpc-IoAj.jpeg"  "$PUB/images/telefonia.jpeg"

# Partner logos
cp "$ASSETS/dahua-BEVIyi9M.png"       "$PUB/partners/dahua.png"
cp "$ASSETS/hikvision-Dh5iHXTq.png"   "$PUB/partners/hikvision.png"
cp "$ASSETS/office365-CX7J5p8H.png"   "$PUB/partners/office365.png"
cp "$ASSETS/ubiquiti-9mlkek-1.png"    "$PUB/partners/ubiquiti.png"
cp "$ASSETS/xorcom-BZXEGOzf.png"      "$PUB/partners/xorcom.png"

# Client logos
cp "$ASSETS/bomba_lomiranda-B61ZMV64.jpeg" "$PUB/clientes/bomberos.jpeg"
cp "$ASSETS/cormun-DglBkV17.png"           "$PUB/clientes/cormun.png"
cp "$ASSETS/eecol-Dwc2nfGX.webp"          "$PUB/clientes/eecol.webp"

# Favicon from landing
cp /Users/guillermofarias/Sites/inertia/sonfet/landing/public/favicon.ico "$PUB/favicon.ico"

echo "Assets copied"
ls "$PUB/images" "$PUB/partners" "$PUB/clientes"
```

Expected output: lists all files in each directory.

- [ ] **Step 2: Commit**

```bash
git add public/
git commit -m "feat: add all Sofnet public assets"
```

---

## Task 4: Navigation component

**Files:**
- Create: `app/components/Navigation.vue`

- [ ] **Step 1: Create app/components/Navigation.vue**

```vue
<template>
  <header :class="[
    'sticky top-0 z-50 w-full border-b transition-all duration-300',
    'bg-white dark:bg-brand-navy border-gray-200 dark:border-brand-navy-mid'
  ]">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3">
          <img src="/logo-sofnet.png" alt="Sofnet" class="h-10 w-auto" />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors">
            {{ item.name }}
          </a>

          <!-- Dark mode toggle -->
          <button @click="toggleDarkMode" type="button"
            class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-navy-mid transition-colors">
            <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- CTA -->
          <a href="#contacto" class="btn-red text-sm">
            Solicitar presupuesto
          </a>
        </div>

        <!-- Mobile menu button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
          class="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-navy-mid transition-colors">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-brand-navy-mid">
        <div class="container-custom py-4 space-y-1">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-brand-navy-mid hover:text-brand-red transition-colors">
            {{ item.name }}
          </a>
          <a href="#contacto" @click="isMobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-base font-semibold text-white bg-brand-red hover:bg-brand-red-dark transition-colors text-center mt-2">
            Solicitar presupuesto
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { isDark, toggleDarkMode } = useDarkMode()
const isMobileMenuOpen = ref(false)

onMounted(() => {
  if (import.meta.client) {
    const handleResize = () => { if (window.innerWidth >= 1024) isMobileMenuOpen.value = false }
    window.addEventListener('resize', handleResize)
    onUnmounted(() => window.removeEventListener('resize', handleResize))
  }
})

const navigation = [
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Clientes', href: '#clientes' },
  { name: 'Contacto', href: '#contacto' },
]
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { opacity: 1; max-height: 500px; }
</style>
```

- [ ] **Step 2: Create app/pages/index.vue with just Navigation to verify**

```vue
<template>
  <div class="relative">
    <Navigation />
    <div class="p-20 text-center text-gray-500">Sofnet — en construcción</div>
  </div>
</template>
```

- [ ] **Step 3: Open http://localhost:3000 and verify**

Nav renders with logo, links, dark mode toggle, and red "Solicitar presupuesto" button. Mobile menu opens on small screens.

- [ ] **Step 4: Commit**

```bash
git add app/components/Navigation.vue app/pages/index.vue
git commit -m "feat: add Navigation component"
```

---

## Task 5: Hero Section

**Files:**
- Create: `app/components/HeroSection.vue`

- [ ] **Step 1: Create app/components/HeroSection.vue**

```vue
<template>
  <section class="relative bg-white dark:bg-brand-navy pb-0 -mt-20">
    <div class="relative h-[650px] md:h-[780px] pt-20 overflow-hidden"
      style="clip-path: ellipse(150% 100% at 50% 0%);">

      <!-- Slides -->
      <template v-for="(slide, index) in slides" :key="index">
        <Transition name="slide-fade">
          <div v-show="currentSlide === index"
            class="absolute inset-0"
            :style="{ background: slide.gradient }">
            <!-- Background image -->
            <div class="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-1000"
              :style="{ backgroundImage: `url('${slide.image}')` }"></div>

            <div class="container-custom relative h-full flex items-start pt-16">
              <div class="grid lg:grid-cols-2 gap-12 items-center w-full">
                <!-- Text -->
                <div class="text-white space-y-6">
                  <div class="inline-block">
                    <span class="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-sm font-semibold uppercase tracking-wide">
                      {{ slide.badge }}
                    </span>
                  </div>
                  <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {{ slide.title }}
                  </h1>
                  <p class="text-xl text-blue-100 leading-relaxed">{{ slide.subtitle }}</p>
                  <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#contacto"
                      class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-all duration-300 shadow-lg">
                      Obtén una Cotización Gratis
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a href="#servicios" class="btn-outline-white px-8 py-4">
                      Ver servicios
                    </a>
                  </div>
                </div>

                <!-- Stats grid — only on slide 0 and desktop -->
                <div v-if="index === 0" class="hidden lg:grid grid-cols-2 gap-6">
                  <div v-for="stat in stats" :key="stat.label"
                    class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div class="text-4xl font-bold text-white mb-2">{{ stat.value }}</div>
                    <div class="text-blue-100 text-sm font-medium">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </template>

      <!-- Arrows -->
      <button @click="prevSlide"
        class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button @click="nextSlide"
        class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-12 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        <button v-for="(_, index) in slides" :key="index" @click="currentSlide = index"
          class="h-3 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-3'">
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentSlide = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const slides = [
  {
    badge: 'Especialistas en seguridad y redes',
    title: 'Innovación y Seguridad',
    subtitle: 'Soluciones avanzadas en seguridad y tecnología para proteger y conectar tu negocio.',
    image: '/images/hero-bg1.jpg',
    gradient: 'linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(30,58,95,0.95) 100%)',
  },
  {
    badge: 'CCTV · Cableado · ERP · VoIP',
    title: 'Especialistas en CCTV y Redes',
    subtitle: 'Protege tu hogar y negocio con nuestras soluciones avanzadas de vigilancia y conectividad.',
    image: '/images/cctv.jpeg',
    gradient: 'linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(30,58,95,0.95) 100%)',
  },
  {
    badge: 'Infraestructura certificada',
    title: 'Conectividad Eficiente',
    subtitle: 'Optimiza tu infraestructura con cableado estructurado certificado y soluciones de red empresarial.',
    image: '/images/hero-bg2.jpg',
    gradient: 'linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(30,58,95,0.95) 100%)',
  },
]

const stats = [
  { value: '4', label: 'Servicios Especializados' },
  { value: '10+', label: 'Años de Experiencia' },
  { value: '50+', label: 'Clientes Satisfechos' },
  { value: '100%', label: 'Compromiso de Calidad' },
]

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % slides.length }
const prevSlide = () => { currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1 }

onMounted(() => { intervalId = setInterval(nextSlide, 5000) })
onUnmounted(() => { if (intervalId) clearInterval(intervalId) })
</script>

<style scoped>
.slide-fade-enter-active { transition: opacity 1s ease-out; }
.slide-fade-leave-active { transition: opacity 0.8s ease-in; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; }
</style>
```

- [ ] **Step 2: Add HeroSection to index.vue and verify**

In `app/pages/index.vue`:
```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
  </div>
</template>
```

Open http://localhost:3000 — full-screen hero with navy gradient, text, red CTA, stats cards (desktop), dots, and auto-slide every 5s.

- [ ] **Step 3: Commit**

```bash
git add app/components/HeroSection.vue app/pages/index.vue
git commit -m "feat: add HeroSection with 3-slide carousel"
```

---

## Task 6: Partners Strip

**Files:**
- Create: `app/components/PartnersStrip.vue`

- [ ] **Step 1: Create app/components/PartnersStrip.vue**

```vue
<template>
  <section class="py-10 bg-gray-50 dark:bg-brand-navy border-y border-gray-200 dark:border-brand-navy-mid overflow-hidden">
    <div class="container-custom mb-4">
      <p class="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Partners tecnológicos
      </p>
    </div>
    <div class="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div class="flex gap-12 items-center animate-marquee whitespace-nowrap">
        <template v-for="i in 3" :key="i">
          <div v-for="partner in partners" :key="`${i}-${partner.name}`"
            class="flex-shrink-0 flex items-center justify-center">
            <img :src="partner.logo" :alt="partner.name"
              class="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { name: 'Dahua', logo: '/partners/dahua.png' },
  { name: 'Hikvision', logo: '/partners/hikvision.png' },
  { name: 'Office 365', logo: '/partners/office365.png' },
  { name: 'Ubiquiti', logo: '/partners/ubiquiti.png' },
  { name: 'Xorcom', logo: '/partners/xorcom.png' },
]
</script>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}
.animate-marquee {
  animation: marquee 20s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
```

- [ ] **Step 2: Add PartnersStrip to index.vue**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
  </div>
</template>
```

Verify: logos scroll smoothly. Fade-in mask on edges. Grayscale by default, color on hover.

- [ ] **Step 3: Commit**

```bash
git add app/components/PartnersStrip.vue app/pages/index.vue
git commit -m "feat: add PartnersStrip with CSS marquee animation"
```

---

## Task 7: Services Section

**Files:**
- Create: `app/components/ServicesSection.vue`

- [ ] **Step 1: Create app/components/ServicesSection.vue**

```vue
<template>
  <section id="servicios" class="relative section-padding bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-brand-navy">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: sticky header -->
        <div class="lg:sticky lg:top-32">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Nuestros Servicios
          </span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Soluciones Tecnológicas Integrales
          </h2>
          <div class="w-24 h-1 bg-brand-red mb-6 rounded-full"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Especialistas en seguridad, redes, software y comunicaciones para empresas de todo tamaño.
          </p>
        </div>

        <!-- Right: service cards -->
        <div class="space-y-6">
          <div v-for="service in services" :key="service.title"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-brand-red dark:hover:border-brand-red overflow-hidden">

            <!-- Decorative icon background -->
            <div class="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <component :is="service.icon" class="w-16 h-16 text-brand-red/30" />
            </div>

            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{{ service.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{{ service.description }}</p>
              <ul class="space-y-2">
                <li v-for="feat in service.features" :key="feat" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

const IconCamera = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' })
]) })

const IconNetwork = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' })
]) })

const IconCode = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
]) })

const IconPhone = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' })
]) })

const services = [
  {
    title: 'Sistemas CCTV',
    description: 'Protege tu hogar y negocio con nuestras soluciones avanzadas de cámaras de seguridad de alta calidad.',
    icon: IconCamera,
    features: ['Cámaras 4K y HD', 'Monitoreo remoto 24/7', 'Grabación en nube y local', 'Marcas Dahua e Hikvision'],
  },
  {
    title: 'Cableado Estructurado Certificado',
    description: 'Garantiza una conectividad óptima con nuestro servicio profesional de cableado estructurado certificado.',
    icon: IconNetwork,
    features: ['Certificación Cat6 / Cat6A', 'Diseño de red a medida', 'Testing y certificación', 'Partner Ubiquiti Networks'],
  },
  {
    title: 'Desarrollo de Software ERP',
    description: 'Optimiza la gestión de tu empresa con software a medida diseñado para tus procesos específicos.',
    icon: IconCode,
    features: ['Módulos personalizados', 'Integración con sistemas existentes', 'Capacitación incluida', 'Soporte y mantenimiento'],
  },
  {
    title: 'Telefonía IP',
    description: 'Mejora la comunicación empresarial con soluciones VoIP avanzadas que reducen costos y escalan fácilmente.',
    icon: IconPhone,
    features: ['Sistemas Xorcom', 'Reducción de costos del 60%', 'Escalabilidad ilimitada', 'Integración con Office 365'],
  },
]
</script>
```

- [ ] **Step 2: Add to index.vue and verify**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
    <ServicesSection />
  </div>
</template>
```

Verify: 4 cards render with icons, descriptions, and feature lists. Hover shows red border and icon scale.

- [ ] **Step 3: Commit**

```bash
git add app/components/ServicesSection.vue app/pages/index.vue
git commit -m "feat: add ServicesSection with 4 service cards"
```

---

## Task 8: Clients Section

**Files:**
- Create: `app/components/ClientsSection.vue`

- [ ] **Step 1: Create app/components/ClientsSection.vue**

```vue
<template>
  <section id="clientes" class="section-padding bg-white dark:bg-gray-900">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: logo grid -->
        <div class="order-2 lg:order-1">
          <div class="grid grid-cols-2 gap-6">
            <div v-for="client in clients" :key="client.name"
              class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-red dark:hover:border-brand-red hover:shadow-lg transition-all flex items-center justify-center min-h-[120px]">
              <img :src="client.logo" :alt="client.name"
                class="max-h-16 w-auto object-contain mx-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>

        <!-- Right: sticky header -->
        <div class="order-1 lg:order-2 lg:sticky lg:top-32">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Clientes
          </span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Empresas que confían en Sofnet
          </h2>
          <div class="w-24 h-1 bg-brand-red mb-6 rounded-full"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Trabajamos con organizaciones de distintos rubros que confían en nuestra experiencia y compromiso.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const clients = [
  { name: 'Bomberos Lo Miranda', logo: '/clientes/bomberos.jpeg' },
  { name: 'Cormun Educación', logo: '/clientes/cormun.png' },
  { name: 'EECOL', logo: '/clientes/eecol.webp' },
  { name: 'Sofnet', logo: '/logo-sofnet.png' },
]
</script>
```

- [ ] **Step 2: Add to index.vue and verify**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
    <ServicesSection />
    <ClientsSection />
  </div>
</template>
```

Verify: logo grid with 4 clients, grayscale + hover color, sticky right header.

- [ ] **Step 3: Commit**

```bash
git add app/components/ClientsSection.vue app/pages/index.vue
git commit -m "feat: add ClientsSection with logo grid"
```

---

## Task 9: About Section (Nosotros)

**Files:**
- Create: `app/components/AboutSection.vue`

- [ ] **Step 1: Create app/components/AboutSection.vue**

```vue
<template>
  <section id="nosotros" class="section-padding bg-gray-50 dark:bg-gray-800">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: sticky header + stats -->
        <div class="lg:sticky lg:top-32">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Nuestra Historia
          </span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            ¿Quiénes Somos?
          </h2>
          <div class="w-24 h-1 bg-brand-red mb-6 rounded-full"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Tu socio tecnológico de confianza en seguridad, redes y software empresarial.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
              <div class="text-3xl font-bold text-brand-red mb-1">10+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Años de Experiencia</div>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
              <div class="text-3xl font-bold text-brand-red mb-1">50+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Clientes Satisfechos</div>
            </div>
          </div>
        </div>

        <!-- Right: content cards -->
        <div class="space-y-6">

          <!-- Historia -->
          <div class="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center">
              <svg class="w-16 h-16 text-brand-red/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="relative z-10">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Nuestra Historia</h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Sofnet nació con una visión clara: <strong class="text-brand-red">empoderar a las empresas chilenas</strong> con tecnología de vanguardia. Hoy somos un referente en soluciones de seguridad, conectividad y software a medida para organizaciones de todo tamaño.
              </p>
            </div>
          </div>

          <!-- Misión -->
          <div class="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center">
              <svg class="w-16 h-16 text-brand-red/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="relative z-10">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Misión</h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Empoderar a las empresas con <strong class="text-brand-red">tecnología de vanguardia</strong>, asegurando su crecimiento y éxito a través de <strong class="text-brand-red">soluciones personalizadas y de alta calidad</strong>.
              </p>
            </div>
          </div>

          <!-- Visión -->
          <div class="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center">
              <svg class="w-16 h-16 text-brand-red/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div class="relative z-10">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Visión</h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ser <strong class="text-brand-red">líderes en el sector tecnológico</strong>, reconocidos por nuestra innovación, excelencia y compromiso con el cliente.
              </p>
            </div>
          </div>

          <!-- Valores grid -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="valor in valores" :key="valor.title"
              class="relative bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-brand-red transition-all overflow-hidden">
              <div class="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-100/30 dark:bg-red-900/20"></div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{{ valor.title }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 relative z-10">{{ valor.description }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const valores = [
  { title: 'Innovación', description: 'Tecnología de vanguardia' },
  { title: 'Excelencia', description: 'Altos estándares de calidad' },
  { title: 'Compromiso', description: 'Siempre disponibles para ti' },
  { title: 'Confianza', description: 'Tu socio de largo plazo' },
]
</script>
```

- [ ] **Step 2: Add to index.vue and verify**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
    <ServicesSection />
    <ClientsSection />
    <AboutSection />
  </div>
</template>
```

Verify: Historia/Misión/Visión cards with red accent icons, 2×2 valores grid, stats (10+ años, 50+ clientes).

- [ ] **Step 3: Commit**

```bash
git add app/components/AboutSection.vue app/pages/index.vue
git commit -m "feat: add AboutSection with Historia, Misión, Visión and Valores"
```

---

## Task 10: CTA Banner + Footer

**Files:**
- Create: `app/components/CtaBanner.vue`
- Create: `app/components/Footer.vue`

- [ ] **Step 1: Create app/components/CtaBanner.vue**

```vue
<template>
  <section class="section-padding-sm bg-brand-navy dark:bg-gray-950 text-white relative overflow-hidden">
    <!-- Grid background pattern -->
    <div class="absolute inset-0 opacity-5"
      style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    <!-- Red glow -->
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container-custom relative z-10">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
          <svg class="w-4 h-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          ¿Listo para comenzar?
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          ¿Listo para proteger y conectar tu negocio?
        </h2>
        <p class="text-xl text-blue-100/80 leading-relaxed">
          Conversemos sobre cómo Sofnet puede ayudarte. Cotización sin costo ni compromiso.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a href="#contacto" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-red-dark transition-all duration-200 shadow-xl hover:shadow-2xl group">
            Solicitar cotización gratis
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="#servicios" class="btn-outline-white px-8 py-4 font-bold">
            Ver servicios
          </a>
        </div>
        <p class="text-sm text-blue-100/50">Sin compromiso · Respuesta en 24 horas</p>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Create app/components/Footer.vue**

```vue
<template>
  <footer class="bg-gray-950 text-gray-300">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- Brand -->
        <div class="space-y-4">
          <img src="/logo-sofnet.png" alt="Sofnet" class="h-10 w-auto brightness-0 invert" />
          <p class="text-sm text-gray-400">
            Tu socio tecnológico de confianza. Soluciones en seguridad, redes y software para empresas de todo tamaño.
          </p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" :href="social.href"
              class="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-red flex items-center justify-center transition-colors">
              <span class="sr-only">{{ social.name }}</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon"></svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Navegación</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href" class="text-sm hover:text-brand-red transition-colors">{{ link.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold mb-4">Servicios</h3>
          <ul class="space-y-3">
            <li v-for="service in serviceLinks" :key="service">
              <a href="#servicios" class="text-sm hover:text-brand-red transition-colors">{{ service }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contacto</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm">Santiago, Chile</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contacto@sofnet.cl" class="text-sm hover:text-brand-red transition-colors">contacto@sofnet.cl</a>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+56912345678" class="text-sm hover:text-brand-red transition-colors">+56 9 [pendiente]</a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} Sofnet. Todos los derechos reservados.</p>
          <p class="text-sm text-gray-500">Tu Socio Tecnológico de Confianza</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const quickLinks = [
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Clientes', href: '#clientes' },
  { name: 'Contacto', href: '#contacto' },
]

const serviceLinks = ['Sistemas CCTV', 'Cableado Estructurado', 'Software ERP', 'Telefonía IP']

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  },
  {
    name: 'Instagram',
    href: '#',
    icon: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
  },
]
</script>
```

- [ ] **Step 3: Add CtaBanner and Footer to index.vue**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
    <ServicesSection />
    <ClientsSection />
    <AboutSection />
    <CtaBanner />
    <Footer />
  </div>
</template>
```

Verify: CTA banner with navy background, red glow, grid pattern. Footer with 4 columns, red hover on links, social icons.

- [ ] **Step 4: Commit**

```bash
git add app/components/CtaBanner.vue app/components/Footer.vue app/pages/index.vue
git commit -m "feat: add CtaBanner and Footer"
```

---

## Task 11: Contact Section + Server API

**Files:**
- Create: `app/components/ContactSection.vue`
- Create: `server/api/contact.post.ts`

- [ ] **Step 1: Create server/api/contact.post.ts**

```ts
import SibApiV3Sdk from 'sib-api-v3-sdk'

export default defineEventHandler(async (event) => {
  const { name, email, message, company, phone } = await readBody(event)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos requeridos' })
  }

  const client = SibApiV3Sdk.ApiClient.instance
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'BREVO_API_KEY no configurada' })
  }

  client.authentications['api-key'].apiKey = apiKey
  const api = new SibApiV3Sdk.TransactionalEmailsApi()

  try {
    await api.sendTransacEmail({
      subject: `Nuevo contacto Sofnet: ${name}`,
      sender: {
        name: 'Sofnet Web',
        email: process.env.BREVO_SENDER_EMAIL || 'contacto@sofnet.cl',
      },
      to: [{ email: process.env.BREVO_RECEIVER_EMAIL || 'contacto@sofnet.cl' }],
      replyTo: { email, name },
      htmlContent: `
        <h2>Nuevo mensaje desde sofnet.cl</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    return { ok: true }
  } catch (error: any) {
    console.error('Brevo error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error al enviar el mensaje' })
  }
})
```

- [ ] **Step 2: Create app/components/ContactSection.vue**

```vue
<template>
  <section id="contacto" class="section-padding bg-gray-50 dark:bg-gray-800">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: form -->
        <div class="order-2 lg:order-1">
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envíanos un mensaje</h3>

            <div v-if="submitStatus === 'success'"
              class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <p class="text-green-800 dark:text-green-200 font-medium">¡Mensaje enviado! Te contactaremos pronto.</p>
            </div>

            <div v-if="submitStatus === 'error'"
              class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <svg class="w-5 h-5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p class="text-red-800 dark:text-red-200 font-medium">{{ errorMessage }}</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nombre *</label>
                  <input type="text" v-model="form.name" required :disabled="isSubmitting"
                    class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Tu nombre" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Empresa</label>
                  <input type="text" v-model="form.company" :disabled="isSubmitting"
                    class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Tu empresa" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input type="email" v-model="form.email" required :disabled="isSubmitting"
                    class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="tu@empresa.cl" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                  <input type="tel" v-model="form.phone" :disabled="isSubmitting"
                    class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="+56 9 XXXX XXXX" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mensaje *</label>
                <textarea v-model="form.message" rows="4" required :disabled="isSubmitting"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all resize-none disabled:opacity-50"
                  placeholder="Cuéntanos en qué podemos ayudarte..."></textarea>
              </div>
              <button type="submit" :disabled="isSubmitting"
                class="w-full px-6 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Right: sticky header + contact info -->
        <div class="order-1 lg:order-2 lg:sticky lg:top-32 space-y-8">
          <div>
            <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
              Contacto
            </span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              ¿Cómo podemos ayudarte?
            </h2>
            <div class="w-24 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Contáctanos y un especialista te atenderá para diseñar la solución que necesitas.
            </p>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-4 p-5">
              <div class="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="info.iconPath"></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">{{ info.label }}</div>
                <a :href="info.href" class="text-gray-900 dark:text-white hover:text-brand-red transition-colors font-medium">{{ info.value }}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = ref({ name: '', email: '', company: '', phone: '', message: '' })
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const handleSubmit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitStatus.value = 'idle'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form.value } })
    submitStatus.value = 'success'
    form.value = { name: '', email: '', company: '', phone: '', message: '' }
    setTimeout(() => { submitStatus.value = 'idle' }, 5000)
  } catch (error: any) {
    submitStatus.value = 'error'
    errorMessage.value = error.data?.statusMessage || 'Error al enviar. Inténtalo nuevamente.'
    setTimeout(() => { submitStatus.value = 'idle' }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

const contactInfo = [
  {
    label: 'Email',
    value: 'contacto@sofnet.cl',
    href: 'mailto:contacto@sofnet.cl',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
  },
  {
    label: 'Teléfono',
    value: '+56 9 [pendiente]',
    href: 'tel:+56912345678',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />',
  },
  {
    label: 'Ubicación',
    value: 'Santiago, Chile',
    href: '#',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />',
  },
]
</script>
```

- [ ] **Step 3: Add ContactSection to index.vue (final assembly)**

```vue
<template>
  <div class="relative">
    <Navigation />
    <HeroSection />
    <PartnersStrip />
    <ServicesSection />
    <ClientsSection />
    <AboutSection />
    <CtaBanner />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup>
useHead({ title: 'Sofnet — Tu Socio Tecnológico de Confianza' })
</script>
```

- [ ] **Step 4: Verify full page in browser**

Open http://localhost:3000. Scroll through all sections. Test form submission (check browser network tab for POST /api/contact). Verify dark mode toggle works across all sections.

- [ ] **Step 5: Commit**

```bash
git add app/components/ContactSection.vue server/ app/pages/index.vue
git commit -m "feat: add ContactSection with Brevo API and complete page assembly"
```

---

## Task 12: Docker

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.dockerignore`

- [ ] **Step 1: Create Dockerfile**

```dockerfile
FROM node:22.12.0-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:22.12.0-slim

WORKDIR /app

COPY --from=builder /app/.output /app/.output

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

- [ ] **Step 2: Create docker-compose.yml**

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

- [ ] **Step 3: Create .dockerignore**

```
node_modules
.nuxt
.output
.data
docs
.superpowers
*.local
.env
.git
.DS_Store
npm-debug.log*
```

- [ ] **Step 4: Test Docker build locally**

```bash
docker build -t sofnet-web .
docker run --rm -p 3000:3000 --env-file .env sofnet-web
```

Expected: server starts, http://localhost:3000 serves the landing page.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat: add Docker multi-stage build and docker-compose"
```

---

## Self-Review

**Spec coverage check:**
- [x] Nav with dark mode, mobile menu, red CTA → Task 4
- [x] Hero slider 3 slides, stats, arrows, dots → Task 5
- [x] Partners strip marquee (Dahua, Hikvision, Office365, Ubiquiti, Xorcom) → Task 6
- [x] Services section 4 cards sticky layout → Task 7
- [x] Clients section logo grid → Task 8
- [x] About section Historia/Misión/Visión/Valores → Task 9
- [x] CTA Banner → Task 10
- [x] Contact form + Brevo API → Task 11
- [x] Footer 4-col → Task 10
- [x] Docker multi-stage → Task 12
- [x] Assets organized in public/ → Task 3
- [x] No team section → confirmed absent

**Type consistency:**
- `useDarkMode()` returns `{ isDark, toggleDarkMode }` — used as `const { isDark, toggleDarkMode } = useDarkMode()` in Navigation.vue ✓
- `$fetch('/api/contact', { method: 'POST', body: {...} })` matches `readBody(event)` in contact.post.ts ✓
- `btn-red` and `btn-outline-white` defined in main.css, used in Hero and CtaBanner ✓
- `brand-red`, `brand-navy`, `brand-navy-mid` defined in `@theme`, used throughout ✓

**No placeholders:** All code blocks are complete. Contact info has explicit `[pendiente]` markers for real data.
