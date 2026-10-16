import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage indisponível (aba anônima etc.) */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const theme = ref<Theme>(initialTheme())

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {
    /* ignora */
  }
})

export function useTheme() {
  const toggle = () => {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    // View Transitions API: transição suave entre temas onde o navegador suporta
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => (theme.value = next))
    } else {
      theme.value = next
    }
  }
  return { theme, toggle }
}
