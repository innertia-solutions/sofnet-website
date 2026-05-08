export const useDarkMode = () => {
  const isDark = useState<boolean>('isDark', () => false)

  const toggleDarkMode = () => {
    if (typeof document === 'undefined') return
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('hs_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('hs_theme', 'light')
    }
  }

  return { isDark, toggleDarkMode }
}
