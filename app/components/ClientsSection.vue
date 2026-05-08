<template>
  <section id="clientes" class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <div class="order-2 lg:order-1">
          <div class="grid grid-cols-2 gap-6">
            <div v-for="client in clients" :key="client.name"
              class="p-6 bg-white rounded-xl border border-gray-200 hover:border-brand-red shadow-sm hover:shadow-lg transition-all flex items-center justify-center min-h-[120px]">
              <img :src="client.logo" :alt="client.name"
                class="max-h-16 w-auto object-contain mx-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>
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
