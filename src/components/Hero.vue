<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimations, useIntersectionObserver } from '../composables/useScrollAnimations'
import { useTheme } from '../composables/useTheme'

// Estado reactivo para animaciones
const heroRef = ref<HTMLElement>()

// Composables para animaciones y tema
const { windowHeight } = useScrollAnimations()
const { observe } = useIntersectionObserver()
const { isDark } = useTheme()

// Parallax effect
const parallaxOffset = ref(0)

// Funciones de navegación
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const goToServices = () => {
  scrollToSection('features')
}

const goToContact = () => {
  scrollToSection('contact')
}

const updateParallax = () => {
  if (heroRef.value) {
    const rect = heroRef.value.getBoundingClientRect()
    const scrollProgress = Math.max(0, Math.min(1, (windowHeight.value - rect.top) / (windowHeight.value + rect.height)))
    parallaxOffset.value = scrollProgress * 100
    
    // Update CSS custom properties for parallax
    document.documentElement.style.setProperty('--parallax-slow', `${parallaxOffset.value * 0.3}px`)
    document.documentElement.style.setProperty('--parallax-medium', `${parallaxOffset.value * 0.5}px`)
    document.documentElement.style.setProperty('--parallax-fast', `${parallaxOffset.value * 0.8}px`)
  }
}

onMounted(() => {
  if (heroRef.value) {
    observe(heroRef.value)
    
    // Observe all scroll-animate elements within the hero
    const animatedElements = heroRef.value.querySelectorAll('.scroll-animate')
    animatedElements.forEach(el => observe(el))
  }
  
  const updateOnScroll = () => {
    updateParallax()
  }
  
  window.addEventListener('scroll', updateOnScroll, { passive: true })
  updateParallax()
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateOnScroll)
  })
})
</script>

<template>
  <section ref="heroRef" id="home" class="relative min-h-screen flex items-center justify-center px-4 pt-16">
    <!-- Background effects mejorados con parallax -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Imagen de fondo - en modo claro sin efectos para depuración -->
      <div v-if="isDark()" class="absolute inset-0 parallax-bg parallax-slow transition-opacity duration-300 opacity-20">
        <img 
          src="/image/14.webp" 
          alt="Background NEXOS" 
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 transition-colors duration-300 bg-theme-overlay-heavy"></div>
      </div>
      
      <!-- Imagen CON PARALLAX en modo claro -->
      <div v-else class="absolute inset-0 parallax-bg parallax-slow">
        <img 
          src="/image/14.webp" 
          alt="Background NEXOS" 
          class="w-full h-full object-cover object-center"
        />
      </div>
      
      <!-- Gradiente animado de fondo - solo en modo oscuro -->
      <div v-if="isDark()" class="absolute inset-0 bg-gradient-to-br from-theme-overlay-heavy via-transparent to-theme-overlay-heavy parallax-bg parallax-medium"></div>
      
      <!-- Orbes animados - ahora también en modo claro -->
      <div class="floating-orb floating-orb-1 absolute -top-40 -right-40 w-80 h-80 bg-nexos-orange opacity-20 parallax-bg parallax-fast"></div>
      <div class="floating-orb floating-orb-2 absolute -bottom-40 -left-40 w-80 h-80 bg-nexos-blue opacity-20 parallax-bg parallax-slow"></div>
      <div class="floating-orb floating-orb-3 absolute top-20 left-20 w-60 h-60 bg-nexos-orange opacity-10 parallax-bg parallax-medium"></div>
      <div class="floating-orb floating-orb-1 absolute bottom-20 right-20 w-40 h-40 bg-nexos-blue opacity-15 parallax-bg parallax-fast" style="animation-delay: 3s;"></div>
      
      <!-- Líneas de conexión animadas -->
      <div class="absolute inset-0">
        <svg class="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:var(--nexos-orange);stop-opacity:1" />
              <stop offset="100%" style="stop-color:var(--nexos-blue);stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M0,20 Q50,60 100,30" stroke="url(#lineGradient)" stroke-width="0.5" fill="none" class="animate-pulse">
            <animate attributeName="d" 
                     values="M0,20 Q50,60 100,30;M0,30 Q50,10 100,40;M0,20 Q50,60 100,30" 
                     dur="8s" 
                     repeatCount="indefinite"/>
          </path>
          <path d="M0,70 Q50,30 100,80" stroke="url(#lineGradient)" stroke-width="0.3" fill="none" class="animate-pulse" style="animation-delay: 2s;">
            <animate attributeName="d" 
                     values="M0,70 Q50,30 100,80;M0,80 Q50,90 100,60;M0,70 Q50,30 100,80" 
                     dur="10s" 
                     repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </div>

    <div class="relative z-10 text-center max-w-4xl mx-auto">
      <!-- Main heading -->
      <h1 class="text-5xl md:text-7xl font-bold text-theme-primary mb-6 leading-tight flex items-center justify-center scroll-animate fade-down">
        <img 
          :src="isDark() ? '/image/Logo_Darkmode.webp' : '/image/Logo_Lightmode.webp'" 
          alt="NEXOS" 
          class="h-32 md:h-48 w-auto object-contain transition-all duration-300"
        />
      </h1>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl font-black text-theme-primary mb-8 max-w-2xl mx-auto leading-relaxed scroll-animate fade-up stagger-1 hero-title-strong">
        Comprometidos con Transformar Realidades
      </p>
      
      <p class="text-lg md:text-xl font-bold text-theme-secondary mb-8 max-w-3xl mx-auto scroll-animate fade-up stagger-2 hero-subtitle-strong">
        Conectamos oportunidades, creamos valor y transformamos realidades empresariales 
        a través de consultoría integral y transformación digital.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 scroll-animate scale-in stagger-3">
        <button 
          @click="goToServices"
          class="bg-gradient-to-r from-nexos-orange to-nexos-blue hover:from-nexos-orange/90 hover:to-nexos-blue/90 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-adaptive cursor-pointer"
        >
          Conocer Más
        </button>
        <button 
          @click="goToContact"
          class="border-2 border-theme-medium hover:border-nexos-orange text-theme-primary hover:text-nexos-orange font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-adaptive hover:bg-theme-overlay-light cursor-pointer"
        >
          Contactar
        </button>
      </div>

      <!-- Features highlight -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
        <div class="text-center scroll-animate fade-up stagger-4">
          <div class="bg-theme-overlay-medium backdrop-blur-adaptive rounded-xl p-6 transition-all duration-300 hover:bg-theme-overlay-heavy hover:transform hover:scale-105 shadow-adaptive">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-theme-primary mb-2">Integridad</h3>
            <p class="text-theme-secondary">Compromiso ético en cada decisión</p>
          </div>
        </div>
        <div class="text-center scroll-animate fade-up stagger-5">
          <div class="bg-theme-overlay-medium backdrop-blur-adaptive rounded-xl p-6 transition-all duration-300 hover:bg-theme-overlay-heavy hover:transform hover:scale-105 shadow-adaptive">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-semibold text-theme-primary mb-2">Innovación</h3>
            <p class="text-theme-secondary">Soluciones creativas y vanguardistas</p>
          </div>
        </div>
        <div class="text-center scroll-animate fade-up stagger-6">
          <div class="bg-theme-overlay-medium backdrop-blur-adaptive rounded-xl p-6 transition-all duration-300 hover:bg-theme-overlay-heavy hover:transform hover:scale-105 shadow-adaptive">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-xl font-semibold text-theme-primary mb-2">Excelencia</h3>
            <p class="text-theme-secondary">Calidad superior en cada proyecto</p>
          </div>
        </div>
        <div class="text-center scroll-animate fade-up stagger-6">
          <div class="bg-theme-overlay-medium backdrop-blur-adaptive rounded-xl p-6 transition-all duration-300 hover:bg-theme-overlay-heavy hover:transform hover:scale-105 shadow-adaptive">
            <div class="text-4xl mb-4">🤝</div>
            <h3 class="text-xl font-semibold text-theme-primary mb-2">Compromiso</h3>
            <p class="text-theme-secondary">Dedicación total con nuestros clientes</p>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

/* Estilos para texto más fuerte y destacado */
.hero-title-strong {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.hero-subtitle-strong {
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.01em;
}

/* Estilos específicos para modo LIGHT */
:global([data-theme="light"]) .hero-title-strong {
  color: #0f172a !important;
  text-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
  font-weight: 900 !important;
}

:global([data-theme="light"]) .hero-subtitle-strong {
  color: #1e293b !important;
  text-shadow: 0 1px 4px rgba(30, 41, 59, 0.1);
  font-weight: 700 !important;
}

/* Estilos específicos para modo DARK */
:global([data-theme="dark"]) .hero-title-strong,
:global(:root:not([data-theme="light"])) .hero-title-strong {
  color: #ffffff !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  font-weight: 900 !important;
}

:global([data-theme="dark"]) .hero-subtitle-strong,
:global(:root:not([data-theme="light"])) .hero-subtitle-strong {
  color: #e2e8f0 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700 !important;
}
</style>
