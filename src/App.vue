<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

// Estado reactivo para el menú móvil
const isMobileMenuOpen = ref(false)

// Composable de tema
const { toggleTheme, initTheme, isDark } = useTheme()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Inicializar tema al montar el componente
onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen animated-gradient-bg relative overflow-hidden">
    <!-- Overlay de gradiente animado -->
    <div class="fixed inset-0 gradient-overlay pointer-events-none z-0"></div>
    
    <!-- Orbes flotantes de fondo -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="floating-orb floating-orb-1 absolute top-1/4 left-10 w-32 h-32 bg-nexos-orange opacity-20"></div>
      <div class="floating-orb floating-orb-2 absolute top-3/4 right-20 w-24 h-24 bg-nexos-blue opacity-25"></div>
      <div class="floating-orb floating-orb-3 absolute top-1/2 left-1/2 w-20 h-20 bg-nexos-orange opacity-15"></div>
      <div class="floating-orb floating-orb-1 absolute bottom-1/4 right-10 w-28 h-28 bg-nexos-blue opacity-20" style="animation-delay: 2s;"></div>
      
      <!-- Partículas brillantes -->
      <div class="sparkle absolute top-20 left-1/4 w-2 h-2 bg-nexos-orange rounded-full"></div>
      <div class="sparkle absolute top-40 right-1/3 w-1 h-1 bg-nexos-blue rounded-full"></div>
      <div class="sparkle absolute bottom-32 left-1/3 w-2 h-2 bg-nexos-orange rounded-full"></div>
      <div class="sparkle absolute bottom-20 right-1/4 w-1 h-1 bg-nexos-blue rounded-full"></div>
      <div class="sparkle absolute top-1/2 left-1/5 w-1 h-1 bg-nexos-orange rounded-full"></div>
    </div>
    
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-theme-overlay-medium backdrop-blur-adaptive border-b border-theme-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <img 
              :src="isDark() ? '/image/Logo_Darkmode.webp' : '/image/Logo_Lightmode.webp'" 
              alt="NEXOS" 
              class="h-16 w-auto object-contain transition-all duration-300" 
            />
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-4">
            <div class="flex items-baseline space-x-4">
              <a href="#home" class="text-theme-primary hover:text-nexos-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Inicio
              </a>
              <a href="#features" class="text-theme-primary hover:text-nexos-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Servicios
              </a>
              <a href="#about" class="text-theme-primary hover:text-nexos-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Nosotros
              </a>
              <a href="#contact" class="text-theme-primary hover:text-nexos-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contacto
              </a>
            </div>
            
            <!-- Theme Toggle Button -->
            <button
              @click="toggleTheme"
              class="ml-4 p-2 rounded-lg bg-theme-overlay-light hover:bg-theme-overlay-medium border border-theme-light hover:border-theme-medium transition-all duration-300 group"
              :title="isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <!-- Sol (Light Mode Icon) -->
              <svg 
                v-if="isDark()" 
                class="w-5 h-5 text-theme-secondary group-hover:text-nexos-orange transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              
              <!-- Luna (Dark Mode Icon) -->
              <svg 
                v-else 
                class="w-5 h-5 text-theme-secondary group-hover:text-nexos-blue transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="bg-theme-overlay-medium hover:bg-theme-overlay-heavy inline-flex items-center justify-center p-2 rounded-md text-theme-secondary hover:text-theme-primary border border-theme-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexos-orange"
            >
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-theme-overlay-heavy backdrop-blur-adaptive border-t border-theme-light">
          <a href="#home" class="text-theme-primary hover:text-nexos-orange block px-3 py-2 rounded-md text-base font-medium transition-colors">
            Inicio
          </a>
          <a href="#features" class="text-theme-primary hover:text-nexos-orange block px-3 py-2 rounded-md text-base font-medium transition-colors">
            Servicios
          </a>
          <a href="#about" class="text-theme-primary hover:text-nexos-orange block px-3 py-2 rounded-md text-base font-medium transition-colors">
            Nosotros
          </a>
          <a href="#contact" class="text-theme-primary hover:text-nexos-orange block px-3 py-2 rounded-md text-base font-medium transition-colors">
            Contacto
          </a>
          
          <!-- Mobile Theme Toggle -->
          <div class="pt-2 border-t border-theme-light">
            <button
              @click="toggleTheme"
              class="w-full flex items-center justify-center px-3 py-2 rounded-md text-theme-secondary hover:text-nexos-orange bg-theme-overlay-light hover:bg-theme-overlay-medium border border-theme-light transition-all duration-300"
            >
              <svg 
                v-if="isDark()" 
                class="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg 
                v-else 
                class="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              {{ isDark() ? 'Modo Claro' : 'Modo Oscuro' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <Hero />
      <Features />
      <About />
      <Contact />
    </main>

    <!-- Footer -->
    <footer class="bg-theme-overlay-heavy backdrop-blur-adaptive border-t border-theme-light">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <img 
              :src="isDark() ? '/image/Logo_Darkmode.webp' : '/image/Logo_Lightmode.webp'" 
              alt="NEXOS" 
              class="h-12 w-auto object-contain mb-2 transition-all duration-300" 
            />
            <p class="text-theme-muted text-center md:text-left">Conectando ideas, creando futuro</p>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-theme-muted hover:text-theme-primary transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a href="#" class="text-theme-muted hover:text-theme-primary transition-colors">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956.525-.233-.066-.825-.066-1.825v-3.312c-2.983.654-3.608-1.337-3.608-1.337-.479-1.217-1.17-1.542-1.17-1.542-.958-.654.071-.642.071-.642 1.058.075 1.617 1.088 1.617 1.088.942 1.613 2.475 1.146 3.08.875.096-.683.367-1.146.667-1.408-2.359-.267-4.84-1.179-4.84-5.263 0-1.163.417-2.117 1.096-2.863-.109-.267-.475-1.342.104-2.8 0 0 .896-.287 2.938 1.096.854-.238 1.771-.358 2.684-.363.913.004 1.83.125 2.688.363 2.042-1.383 2.938-1.096 2.938-1.096.579 1.458.213 2.533.104 2.8.683.746 1.096 1.7 1.096 2.863 0 4.096-2.488 4.996-4.859 5.263.383.329.725.975.725 1.967v2.917c0 1.004-.542 1.592-.063 1.825C18.896 21.417 22.054 17.079 22.054 11.987 22.054 5.367 16.688.001 12.017.001z" />
              </svg>
            </a>
            <a href="#" class="text-theme-muted hover:text-theme-primary transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
        <div class="mt-8 border-t border-theme-light pt-8">
          <p class="text-center text-theme-muted text-sm">
            © 2025 Nexos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
