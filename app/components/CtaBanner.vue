<template>
  <section class="py-20 bg-brand-navy dark:bg-gray-950 text-white relative overflow-hidden">
    <!-- Fade transition from the section above -->
    <div class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white dark:from-brand-navy to-transparent pointer-events-none z-10"></div>
    <div class="absolute inset-0 opacity-5"
      style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
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
          <a href="#servicios" class="btn-outline-white px-8 py-4 font-bold">Ver servicios</a>
        </div>
        <p class="text-sm text-blue-100/50">Sin compromiso · Respuesta en 24 horas</p>
      </div>
    </div>
  </section>
</template>
