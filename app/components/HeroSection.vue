<template>
  <section class="relative bg-white dark:bg-brand-navy pb-0 pt-20">
    <div class="relative h-[680px] md:h-[800px] overflow-hidden"
      style="clip-path: ellipse(150% 100% at 50% 0%);">
      <template v-for="(slide, index) in slides" :key="index">
        <Transition name="slide-fade">
          <div v-show="currentSlide === index"
            class="absolute inset-0"
            :style="{ background: slide.gradient }">
            <div class="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-1000"
              :style="{ backgroundImage: `url('${slide.image}')` }"></div>
            <div class="container-custom relative h-full flex items-center">
              <div class="grid lg:grid-cols-2 gap-12 items-center w-full">
                <div class="text-white space-y-6">
                  <div class="inline-block">
                    <span class="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-sm font-semibold uppercase tracking-wide">
                      {{ slide.badge }}
                    </span>
                  </div>
                  <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{{ slide.title }}</h1>
                  <p class="text-xl text-blue-100 leading-relaxed">{{ slide.subtitle }}</p>
                  <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#contacto"
                      class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-all duration-300 shadow-lg">
                      Obtén una Cotización Gratis
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a href="#servicios" class="btn-outline-white px-8 py-4">Ver servicios</a>
                  </div>
                </div>
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
