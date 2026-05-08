<template>
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-md',
    'bg-white/80 dark:bg-brand-navy/85 border-gray-200/60 dark:border-brand-navy-mid/60'
  ]">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3">
          <img src="/logo-sofnet.png" alt="Sofnet" class="h-8 w-auto dark:brightness-0 dark:invert" />
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
