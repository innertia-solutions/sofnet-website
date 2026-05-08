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
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'Sofnet' },
        { property: 'og:locale', content: 'es_CL' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Sofnet | Tu Socio Tecnológico de Confianza' },
        { name: 'twitter:description', content: 'Soluciones avanzadas en seguridad y tecnología para tu negocio.' },
        { name: 'twitter:image', content: 'https://sofnet.cl/og-image.png' },
        { name: 'theme-color', content: '#0d1b2a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
