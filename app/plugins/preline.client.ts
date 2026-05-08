declare global {
  interface Window {
    HSStaticMethods?: { autoInit?: () => void }
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.client) return
  try {
    await import('preline')
    const initPreline = () => {
      window.HSStaticMethods?.autoInit?.()
    }
    const performMultipleInits = () => {
      initPreline()
      setTimeout(initPreline, 50)
      setTimeout(initPreline, 200)
      setTimeout(initPreline, 500)
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', performMultipleInits)
    } else {
      nextTick(performMultipleInits)
    }
    const router = useRouter()
    router.afterEach(() => { requestAnimationFrame(() => performMultipleInits()) })
    nuxtApp.hooks.hookOnce('app:mounted', () => performMultipleInits())
    nuxtApp.hooks.hook('page:finish', () => setTimeout(performMultipleInits, 50))
  } catch (error) {
    console.warn('Error al cargar Preline:', error)
  }
})
