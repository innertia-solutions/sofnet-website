<template>
  <section id="nosotros" class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">
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
        <div class="space-y-6">
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
