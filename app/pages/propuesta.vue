<template>
  <div class="relative bg-white dark:bg-brand-navy">
    <div class="absolute inset-0 pointer-events-none">
      <BackgroundPattern />
    </div>

    <!-- Nav local de la presentación -->
    <header class="fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md bg-white/80 dark:bg-brand-navy/85 border-gray-200/60 dark:border-brand-navy-mid/60">
      <nav class="container-custom">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="flex items-center gap-3">
              <img src="/logo-sofnet.png" alt="Sofnet" class="h-6 w-auto dark:brightness-0 dark:invert" />
            </NuxtLink>
            <span class="hidden sm:inline-block h-6 w-px bg-gray-300 dark:bg-brand-navy-mid"></span>
            <span class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-brand-red dark:text-red-300 text-xs font-semibold uppercase tracking-wide">
              Propuesta de servicios y productos
            </span>
          </div>
          <div class="hidden lg:flex items-center gap-8">
            <a v-for="item in localNav" :key="item.href" :href="item.href"
              class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors">
              {{ item.name }}
            </a>
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
            <a href="#contacto" class="btn-red text-sm">Agendar reunión</a>
          </div>
        </div>
      </nav>
    </header>

    <!-- HERO -->
    <section class="relative pt-20">
      <div class="relative h-[680px] md:h-[760px] overflow-hidden"
        style="clip-path: ellipse(150% 100% at 50% 0%);">
        <div class="absolute inset-0"
          style="background: linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(30,58,95,0.95) 100%);"></div>
        <div class="absolute inset-0 bg-cover bg-center opacity-15"
          style="background-image: url('/images/hero-bg1.jpg');"></div>
        <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="container-custom relative h-full flex items-center">
          <div class="grid lg:grid-cols-12 gap-12 items-center w-full">
            <div class="lg:col-span-7 text-white space-y-6">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-sm font-semibold uppercase tracking-wide">
                <span class="w-2 h-2 rounded-full bg-brand-red"></span>
                Servicios y productos Sofnet
              </div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Tecnología, software y operaciones más confiables
              </h1>
              <p class="text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                Somos Sofnet, tu socio tecnológico de confianza. Combinamos servicios de infraestructura (CCTV, redes, telefonía IP y cloud) con
                <strong class="text-white">dos productos propios</strong> que ayudan a operar plantas y cumplir auditorías con menos esfuerzo.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="#productos" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-all duration-300 shadow-lg">
                  Conocer los productos
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#servicios" class="btn-outline-white px-8 py-4">Ver servicios</a>
              </div>
            </div>

            <div class="hidden lg:block lg:col-span-5">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="stat in heroStats" :key="stat.label"
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                  <div class="text-3xl font-bold text-white mb-1">{{ stat.value }}</div>
                  <div class="text-blue-100 text-sm">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO / NOSOTROS -->
    <section id="nosotros" class="relative z-10 section-padding">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Quiénes somos
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Un solo socio para hardware, conectividad y software
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Más de una década implementando infraestructura crítica y desarrollando software para empresas en Chile.
            Nuestro foco: que las operaciones sean <strong class="text-brand-red">visibles, trazables y auditables</strong>.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div v-for="kpi in companyKpis" :key="kpi.label"
            class="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div class="text-3xl md:text-4xl font-bold text-brand-red mb-1">{{ kpi.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ kpi.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICIOS -->
    <section id="servicios" class="relative z-10 section-padding-sm">
      <div class="container-custom">
        <div class="text-center mb-14">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Servicios
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Soluciones tecnológicas integrales
          </h2>
          <div class="w-24 h-1 bg-brand-red mx-auto mb-6 rounded-full"></div>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Diseño, implementación y soporte. Una sola contraparte para toda la cadena tecnológica.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="service in services" :key="service.title"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-brand-red overflow-hidden">
            <div class="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-red-100/50 dark:bg-red-900/20"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 text-brand-red dark:text-red-300 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.iconPath"></svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{{ service.description }}</p>
              <ul class="space-y-1.5">
                <li v-for="feat in service.features" :key="feat" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <svg class="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCTOS - INTRO -->
    <section id="productos" class="relative z-10 section-padding bg-gray-50 dark:bg-gray-900/40">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Productos propios
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Dos plataformas que llevan la operación al siguiente nivel
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Software desarrollado por nuestro equipo, pensado para operaciones industriales:
            activos críticos siempre visibles y auditorías que no detienen la producción.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <a href="#asetio" class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-100/60 dark:bg-blue-900/20 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">Activos críticos</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Asetio</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                Inventario, monitoreo en tiempo real y mantenimiento de activos críticos en una sola plataforma.
              </p>
            </div>
          </a>

          <a href="#documentia" class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-violet-500 transition-all duration-300 overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-100/60 dark:bg-violet-900/20 group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">Cumplimiento · IA</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Documentia</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                Gestión documental y pre-auditoría con IA para empresas que se certifican bajo ISO y SGI.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ASETIO -->
    <section id="asetio" class="relative z-10 section-padding">
      <div class="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50/60 dark:from-blue-950/20 to-transparent pointer-events-none"></div>
      <div class="container-custom relative">
        <div class="grid lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-5 lg:sticky lg:top-28">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Producto 1 · Asetio
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Activos críticos siempre visibles y bajo control
            </h2>
            <div class="w-20 h-1 bg-blue-500 mb-6 rounded-full"></div>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Elimina la brecha entre planillas y realidad. Cada evento del activo se convierte automáticamente
              en una acción trazable, con responsables claros y evidencia auditable.
            </p>
            <div class="space-y-3 mb-8">
              <div v-for="bullet in asetioBullets" :key="bullet"
                class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ bullet }}</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="https://asetio.com" target="_blank" rel="noopener"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg">
                Visitar asetio.com
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="#contacto" class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                Solicitar demo
              </a>
            </div>
          </div>

          <div class="lg:col-span-7 space-y-6">
            <a href="https://asetio.com" target="_blank" rel="noopener" class="block group">
              <div class="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-gray-800 rounded-2xl p-2 sm:p-3 shadow-2xl border border-blue-200 dark:border-blue-900/40 hover:shadow-blue-500/30 transition-all duration-300">
                <div class="rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <div class="flex-1 flex justify-center">
                      <span class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white dark:bg-gray-900 rounded-md text-xs text-gray-500 dark:text-gray-400 font-mono border border-gray-200 dark:border-gray-700">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM12 15v6m0 0H8m4 0h4M5 7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"/></svg>
                        asetio.com
                      </span>
                    </div>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <img src="/products/asetio.png" alt="Captura de asetio.com — landing del producto"
                    class="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500 origin-top" />
                </div>
              </div>
              <p class="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Click para abrir <span class="text-blue-600 dark:text-blue-300 font-semibold">asetio.com</span>
              </p>
            </a>

            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Las 3 capas de Asetio</p>
              <div class="space-y-4">
                <div v-for="(layer, i) in asetioLayers" :key="layer.title"
                  class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 flex-shrink-0 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-lg">
                      0{{ i + 1 }}
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ layer.title }}</h4>
                      <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ layer.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
              <p class="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Casos de aplicación</p>
              <h4 class="text-2xl font-bold mb-4">Casos concretos en plantas y centros productivos</h4>
              <div class="grid sm:grid-cols-2 gap-3">
                <div v-for="useCase in asetioUseCases" :key="useCase"
                  class="flex items-start gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                  </svg>
                  <span class="text-sm">{{ useCase }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DOCUMENTIA -->
    <section id="documentia" class="relative z-10 section-padding bg-gray-50 dark:bg-gray-900/40">
      <div class="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-violet-50/60 dark:from-violet-950/20 to-transparent pointer-events-none"></div>
      <div class="container-custom relative">
        <div class="grid lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <a href="https://documentia.cl" target="_blank" rel="noopener" class="block group">
              <div class="bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-gray-800 rounded-2xl p-2 sm:p-3 shadow-2xl border border-violet-200 dark:border-violet-900/40 hover:shadow-violet-500/30 transition-all duration-300">
                <div class="rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <div class="flex-1 flex justify-center">
                      <span class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white dark:bg-gray-900 rounded-md text-xs text-gray-500 dark:text-gray-400 font-mono border border-gray-200 dark:border-gray-700">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM12 15v6m0 0H8m4 0h4M5 7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"/></svg>
                        documentia.cl
                      </span>
                    </div>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <img src="/products/documentia.png" alt="Captura de documentia.cl — landing del producto"
                    class="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500 origin-top" />
                </div>
              </div>
              <p class="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Click para abrir <span class="text-violet-600 dark:text-violet-300 font-semibold">documentia.cl</span>
              </p>
            </a>

            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Las 3 capas de Documentia</p>
              <div class="space-y-4">
                <div v-for="(layer, i) in documentiaLayers" :key="layer.title"
                  class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-violet-500 transition-all">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 flex-shrink-0 rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 flex items-center justify-center font-bold text-lg">
                      0{{ i + 1 }}
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ layer.title }}</h4>
                      <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ layer.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-8 text-white shadow-xl">
              <p class="text-xs font-bold uppercase tracking-widest text-violet-200 mb-4">Casos de aplicación</p>
              <h4 class="text-2xl font-bold mb-4">Auditorías como un programa vivo</h4>
              <div class="grid sm:grid-cols-2 gap-3">
                <div v-for="useCase in documentiaUseCases" :key="useCase"
                  class="flex items-start gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5 text-violet-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                  </svg>
                  <span class="text-sm">{{ useCase }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 lg:sticky lg:top-28 order-1 lg:order-2">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Producto 2 · Documentia
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Auditorías ISO y SGI sin sobresaltos
            </h2>
            <div class="w-20 h-1 bg-violet-500 mb-6 rounded-full"></div>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Convierte cada auditoría en un programa continuo. Documentia centraliza documentos, evidencias y
              cumplimiento, y usa <strong class="text-violet-700 dark:text-violet-300">IA para detectar brechas</strong>
              antes que el auditor.
            </p>
            <div class="space-y-3 mb-8">
              <div v-for="bullet in documentiaBullets" :key="bullet"
                class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ bullet }}</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="https://documentia.cl" target="_blank" rel="noopener"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-all shadow-lg">
                Visitar documentia.cl
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="#contacto" class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-violet-600 text-violet-600 dark:text-violet-300 dark:border-violet-400 font-semibold rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all">
                Solicitar demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- POR QUÉ SOFNET -->
    <section class="relative z-10 section-padding-sm">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Por qué Sofnet
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Un partner integral para operaciones críticas
          </h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in whySofnet" :key="value.title"
            class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-brand-red transition-all">
            <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 text-brand-red dark:text-red-300 flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="value.iconPath"></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL + CONTACTO -->
    <section id="contacto" class="relative py-32 bg-brand-navy dark:bg-gray-950 text-white overflow-hidden"
      style="clip-path: ellipse(120% 100% at 50% 50%)">
      <div class="absolute inset-0 opacity-5"
        style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 40px 40px;">
      </div>
      <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
            <span class="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Siguiente paso
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Conversemos sobre un piloto en tu operación
          </h2>
          <p class="text-xl text-blue-100/80 leading-relaxed">
            Definimos juntos un alcance acotado para validar valor en las primeras 6 a 8 semanas: una planta, un grupo de activos, una auditoría.
          </p>
          <div class="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
            <a href="mailto:contacto@sofnet.cl"
              class="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-xs text-blue-100/70 uppercase tracking-wider">Email</span>
              <span class="text-sm font-semibold">contacto@sofnet.cl</span>
            </a>
            <a href="tel:+56912345678"
              class="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-xs text-blue-100/70 uppercase tracking-wider">Teléfono</span>
              <span class="text-sm font-semibold">+56 9 1234 5678</span>
            </a>
            <a href="https://sofnet.cl" target="_blank" rel="noopener"
              class="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <svg class="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
              </svg>
              <span class="text-xs text-blue-100/70 uppercase tracking-wider">Sitio</span>
              <span class="text-sm font-semibold">sofnet.cl</span>
            </a>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a href="mailto:contacto@sofnet.cl?subject=Agendar%20reuni%C3%B3n%20Sofnet"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-red-dark transition-all shadow-xl">
              Agendar reunión
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer simple -->
    <footer class="bg-gray-950 text-gray-400 py-8">
      <div class="container-custom flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div class="flex items-center gap-3">
          <img src="/logo-sofnet.png" alt="Sofnet" class="h-5 w-auto brightness-0 invert" />
          <span>© {{ year }} Sofnet · Propuesta de servicios y productos</span>
        </div>
        <NuxtLink to="/" class="hover:text-brand-red transition-colors">Volver a sofnet.cl →</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggleDarkMode } = useDarkMode()

useHead({
  title: 'Sofnet — Propuesta de servicios y productos',
  meta: [
    { name: 'description', content: 'Servicios e infraestructura tecnológica de Sofnet, más dos productos propios: Asetio (gestión de activos críticos) y Documentia (cumplimiento ISO con IA).' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const year = new Date().getFullYear()

const localNav = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Productos', href: '#productos' },
  { name: 'Asetio', href: '#asetio' },
  { name: 'Documentia', href: '#documentia' },
  { name: 'Contacto', href: '#contacto' },
]

const heroStats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '50+', label: 'Clientes activos' },
  { value: '2', label: 'Productos propios' },
  { value: '100%', label: 'Soporte local en Chile' },
]

const companyKpis = [
  { value: '10+', label: 'Años en el mercado' },
  { value: '50+', label: 'Clientes B2B' },
  { value: '5', label: 'Líneas de servicio' },
  { value: '24/7', label: 'Soporte disponible' },
]

const services = [
  {
    title: 'CCTV y seguridad',
    description: 'Vigilancia perimetral e interior con cámaras 4K, analítica y monitoreo remoto.',
    features: ['Dahua e Hikvision', 'Grabación local y cloud', 'Analítica de video'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />',
  },
  {
    title: 'Cableado estructurado certificado',
    description: 'Diseño, instalación y certificación Cat6/Cat6A para redes empresariales.',
    features: ['Certificación incluida', 'Diseño a medida', 'Partner Ubiquiti'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />',
  },
  {
    title: 'Telefonía IP',
    description: 'VoIP empresarial sobre infraestructura Xorcom con integración a Office 365.',
    features: ['Hasta 60% menos costo', 'Escalable sin límite', 'Integración Microsoft'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />',
  },
  {
    title: 'Arquitectura cloud',
    description: 'AWS, GCP y Azure: migración, infraestructura como código y alta disponibilidad.',
    features: ['Multi-cloud', 'IaC con Terraform', 'Costos optimizados'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />',
  },
  {
    title: 'Desarrollo de software',
    description: 'Aplicaciones web, móviles y backend a medida, integradas a sus sistemas actuales.',
    features: ['Web y móvil', 'Integraciones ERP/SAP', 'Soporte continuo'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />',
  },
  {
    title: 'Productos propios',
    description: 'Asetio y Documentia: software desarrollado por nuestro equipo, pensado para operación industrial.',
    features: ['Asetio · Activos críticos', 'Documentia · Cumplimiento', 'Roadmap continuo'],
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />',
  },
]

const asetioBullets = [
  'Inventario único con responsables, ubicación y documentación',
  'Estado en tiempo real con triangulación BLE (~2.5 m de precisión)',
  'Alertas automáticas asignadas al técnico correcto',
  'Historial auditable con evidencia para cada intervención',
]

const asetioLayers = [
  {
    title: 'Inventario operacional',
    description: 'Registro único de cada activo con atributos, criticidad, responsable, ubicación y documentación asociada.',
  },
  {
    title: 'Estado en tiempo real',
    description: 'Lecturas de telemetría, condición y zona operativa normalizadas en un solo lugar.',
  },
  {
    title: 'Acción y cierre',
    description: 'Detección de eventos, asignación de tareas y mantenimiento preventivo/correctivo vinculado al historial.',
  },
]

const asetioUseCases = [
  'UPS, generadores y tableros eléctricos por planta',
  'Equipos de frío y sala de máquinas',
  'Trazabilidad de equipos móviles en bodegas',
  'Órdenes de mantención con evidencia digital',
  'Contexto del activo para el técnico en terreno',
  'Continuidad operativa y cumplimiento normativo',
]

const documentiaBullets = [
  'Repositorio documental con versiones, responsables y vencimientos',
  'Matriz de cumplimiento ISO / SGI vinculada a procesos',
  'Pre-auditoría con IA: detecta brechas antes del auditor',
  'Comparación entre ciclos y trazabilidad completa',
]

const documentiaLayers = [
  {
    title: 'Gestión documental',
    description: 'Repositorio centralizado con control de versiones, responsables, vencimientos y permisos por área.',
  },
  {
    title: 'Evidencia y cumplimiento',
    description: 'Matriz ISO/SGI viva: cada requisito vinculado a documentos, procesos y registros que lo respaldan.',
  },
  {
    title: 'Pre-auditoría con IA',
    description: 'Un copiloto que revisa la matriz, detecta brechas y genera reportes antes del ciclo de auditoría.',
  },
]

const documentiaUseCases = [
  'Auditorías BRC, FSSC 22000 e ISO 9001 / 14001 / 45001',
  'Certificaciones de exportación y proveedores',
  'Gestión documental de plantas y centros productivos',
  'Capacitaciones, actas y registros de calidad',
  'Comparación entre ciclos de auditoría',
  'Reportería ejecutiva de cumplimiento por sede',
]

const whySofnet = [
  {
    title: 'Hardware + software bajo un mismo techo',
    description: 'Diseñamos la infraestructura y desarrollamos el software que corre sobre ella. Una sola contraparte.',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
  },
  {
    title: 'Presencia y soporte local en Chile',
    description: 'Equipo en terreno, partners certificados y soporte 24/7 en español. Misma zona horaria.',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />',
  },
  {
    title: 'Operaciones críticas como foco',
    description: 'Nuestros productos nacen mirando facilities, plantas y operaciones que no pueden detenerse.',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  {
    title: 'Roadmap acompañado',
    description: 'Pilotos acotados, métricas claras y evolución conjunta. Sin riesgo de quedarse pegado.',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />',
  },
]
</script>
