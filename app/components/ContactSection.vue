<template>
  <section id="contacto" class="section-padding">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-12 items-start">
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
            <form @submit.prevent="handleSubmit" novalidate class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nombre *</label>
                  <input type="text" v-model="form.name" :disabled="isSubmitting"
                    :class="inputClass('name')"
                    placeholder="Tu nombre"
                    @blur="touch('name')" />
                  <p v-if="errors.name" class="mt-1.5 text-xs text-brand-red">{{ errors.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Empresa</label>
                  <input type="text" v-model="form.company" :disabled="isSubmitting"
                    :class="inputClass()"
                    placeholder="Tu empresa" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input type="email" v-model="form.email" :disabled="isSubmitting"
                    :class="inputClass('email')"
                    placeholder="tu@empresa.cl"
                    @blur="touch('email')" />
                  <p v-if="errors.email" class="mt-1.5 text-xs text-brand-red">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                  <input type="tel" v-model="form.phone" :disabled="isSubmitting"
                    :class="inputClass()"
                    placeholder="+56 9 XXXX XXXX" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mensaje *</label>
                <textarea v-model="form.message" rows="4" :disabled="isSubmitting"
                  :class="inputClass('message')"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  @blur="touch('message')"></textarea>
                <p v-if="errors.message" class="mt-1.5 text-xs text-brand-red">{{ errors.message }}</p>
              </div>
              <button type="submit" :disabled="isSubmitting"
                class="w-full px-6 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red-dark transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2">
                <svg v-if="isSubmitting" class="animate-spin h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
              </button>
            </form>
          </div>
        </div>
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
const touched = ref<Record<string, boolean>>({})
const errors = ref<Record<string, string>>({})

const baseInput = 'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all resize-none disabled:opacity-50'

const inputClass = (field?: string) => [
  baseInput,
  field && errors.value[field]
    ? 'border-brand-red'
    : 'border-gray-300 dark:border-gray-600',
]

const touch = (field: string) => {
  touched.value[field] = true
  validate(field)
}

const validate = (field?: string) => {
  const fields = field ? [field] : ['name', 'email', 'message']
  let valid = true
  for (const f of fields) {
    if (f === 'name' && !form.value.name.trim()) {
      errors.value.name = 'El nombre es requerido'
      valid = false
    } else if (f === 'name') {
      delete errors.value.name
    }
    if (f === 'email') {
      if (!form.value.email.trim()) {
        errors.value.email = 'El email es requerido'
        valid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Ingresa un email válido'
        valid = false
      } else {
        delete errors.value.email
      }
    }
    if (f === 'message' && !form.value.message.trim()) {
      errors.value.message = 'El mensaje es requerido'
      valid = false
    } else if (f === 'message') {
      delete errors.value.message
    }
  }
  return valid
}

const handleSubmit = async () => {
  touched.value = { name: true, email: true, message: true }
  if (!validate() || isSubmitting.value) return

  isSubmitting.value = true
  submitStatus.value = 'idle'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form.value } })
    submitStatus.value = 'success'
    form.value = { name: '', email: '', company: '', phone: '', message: '' }
    touched.value = {}
    errors.value = {}
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
    value: '+56 9 1234 5678',
    href: 'tel:+56912345678',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />',
  },
]
</script>
