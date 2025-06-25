import { ref, watch } from 'vue'

export type Theme = 'dark' | 'light'

// Estado reactivo global del tema
const theme = ref<Theme>('dark')

// Función para alternar el tema
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// Función para establecer un tema específico
const setTheme = (newTheme: Theme) => {
  theme.value = newTheme
}

// Función para aplicar el tema al DOM
const applyTheme = (currentTheme: Theme) => {
  const html = document.documentElement
  
  if (currentTheme === 'light') {
    html.setAttribute('data-theme', 'light')
  } else {
    html.removeAttribute('data-theme')
  }
  
  // Guardar la preferencia en localStorage
  localStorage.setItem('nexos-theme', currentTheme)
}

// Función para inicializar el tema desde localStorage o preferencia del sistema
const initTheme = () => {
  const savedTheme = localStorage.getItem('nexos-theme') as Theme
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme) {
    theme.value = savedTheme
  } else {
    theme.value = systemPrefersDark ? 'dark' : 'light'
  }
  
  applyTheme(theme.value)
}

// Hook principal del composable
export const useTheme = () => {
  // Watcher para aplicar cambios de tema automáticamente
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: false })
  
  return {
    theme: theme,
    toggleTheme,
    setTheme,
    initTheme,
    isDark: () => theme.value === 'dark',
    isLight: () => theme.value === 'light'
  }
}
