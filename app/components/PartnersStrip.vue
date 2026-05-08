<template>
  <section id="partners" class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- Left: sticky header -->
        <div class="lg:sticky lg:top-32">
          <span class="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-300 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
            Partners
          </span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Tecnología de las mejores marcas
          </h2>
          <div class="w-24 h-1 bg-brand-red mb-6 rounded-full"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Trabajamos con los fabricantes líderes del mercado para garantizar soluciones de la más alta calidad y soporte técnico certificado.
          </p>
        </div>

        <!-- Right: partner groups -->
        <div class="space-y-8">

          <!-- Technology partners -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Tecnología</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-for="partner in techPartners" :key="partner.name"
                class="bg-white rounded-xl border border-gray-200 hover:border-brand-red p-5 flex items-center justify-center min-h-[90px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                <img :src="partner.logo" :alt="partner.name"
                  class="max-h-20 w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </div>

          <!-- Cloud partners -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Cloud</p>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="partner in cloudPartners" :key="partner.name"
                class="bg-white rounded-xl border border-gray-200 hover:border-brand-red p-5 flex items-center justify-center min-h-[90px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                <img :src="partner.logo" :alt="partner.name"
                  class="max-h-20 w-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const techPartners = [
  { name: 'Dahua', logo: '/partners/dahua.png' },
  { name: 'Hikvision', logo: '/partners/hikvision.png' },
  { name: 'Office 365', logo: '/partners/office365.png' },
  { name: 'Ubiquiti', logo: '/partners/ubiquiti.png' },
  { name: 'Xorcom', logo: '/partners/xorcom.png' },
  { name: 'Cassia Networks', logo: '/partners/cassia.png' },
]

const cloudPartners = [
  { name: 'AWS', logo: '/partners/aws.png' },
  { name: 'Google Cloud', logo: '/partners/gcp.png' },
  { name: 'Microsoft Azure', logo: '/partners/azure.svg' },
]
</script>
