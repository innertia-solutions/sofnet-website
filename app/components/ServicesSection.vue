<template>
  <section id="servicios" class="relative section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">
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
        <div class="space-y-6">
          <div v-for="service in services" :key="service.title"
            class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-brand-red dark:hover:border-brand-red overflow-hidden">
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

const IconCloud = defineComponent({ render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' })
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
    title: 'Desarrollo de Software',
    description: 'Creamos soluciones digitales a medida para automatizar y optimizar los procesos de tu empresa.',
    icon: IconCode,
    features: ['Aplicaciones web y móvil', 'Integración con sistemas existentes', 'Capacitación incluida', 'Soporte y mantenimiento'],
  },
  {
    title: 'Arquitectura Cloud',
    description: 'Diseñamos e implementamos infraestructuras cloud escalables y seguras en AWS, Google Cloud y Azure.',
    icon: IconCloud,
    features: ['Migración a la nube', 'Infraestructura como código', 'Alta disponibilidad y escalabilidad', 'AWS · GCP · Azure'],
  },
  {
    title: 'Telefonía IP',
    description: 'Mejora la comunicación empresarial con soluciones VoIP avanzadas que reducen costos y escalan fácilmente.',
    icon: IconPhone,
    features: ['Sistemas Xorcom', 'Reducción de costos del 60%', 'Escalabilidad ilimitada', 'Integración con Office 365'],
  },
]
</script>
