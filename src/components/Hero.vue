<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollAnimations, useIntersectionObserver } from '../composables/useScrollAnimations'

// Estado reactivo para animaciones
const heroRef = ref<HTMLElement>()

// Composables para animaciones
const { windowHeight } = useScrollAnimations()
const { observe } = useIntersectionObserver()

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
  <section ref="heroRef" id="home" class="relative min-h-screen flex items-center px-4 pt-16">
    <!-- Background Image -->
    <div class="absolute inset-0 overflow-hidden">
      <img 
        src="/image/14.webp" 
        alt="Background NEXOS" 
        class="w-full h-full object-cover object-center parallax-bg parallax-slow"
      />
      <!-- Overlay con color consistente a los demás componentes -->
      <div class="absolute inset-0" style="background: rgba(29, 31, 48, 0.85);"></div>
      
      <!-- Orbes flotantes sutiles -->
      <div class="floating-orb floating-orb-1 absolute top-1/4 right-10 w-32 h-32 bg-nexos-orange opacity-10 parallax-bg parallax-fast"></div>
      <div class="floating-orb floating-orb-2 absolute bottom-1/4 left-10 w-24 h-24 bg-nexos-blue opacity-15 parallax-bg parallax-medium"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Column - Text Content -->
        <div class="text-left space-y-8 scroll-animate fade-right">
          
          <!-- Main Title -->
          <div class="space-y-4">
            <h1 class="text-4xl lg:text-6xl font-black text-white leading-tight hero-main-title">
              NEXOS<br>
              <span class="text-nexos-orange">ESTRATEGIAS &</span><br>
              <span class="text-nexos-orange">NEGOCIOS</span>
            </h1>
          </div>

          <!-- Description -->
          <div class="space-y-6 scroll-animate fade-right stagger-1">
            <p class="text-lg lg:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl">
              Somos un equipo multidisciplinario especializado en consultoría 
              estratégica y gestión empresarial.
            </p>
            <p class="text-lg lg:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl">
              Ofrecemos soluciones integrales en áreas fiscales, contables, legales, 
              laborales y comerciales, con un enfoque innovador orientado a 
              mejorar el desempeño, la rentabilidad y el cumplimiento de tu 
              organización.
            </p>
          </div>

          <!-- CTA Buttons with circular design -->
          <div class="flex flex-col sm:flex-row gap-6 items-start mt-12 scroll-animate scale-in stagger-2">
            <!-- Botón Servicios (Óvalo izquierdo) -->
            <button 
              @click="goToServices"
              class="nexos-oval-button nexos-oval-services bg-nexos-blue/20 border-2 border-nexos-blue hover:bg-nexos-blue hover:border-nexos-blue text-white font-bold px-8 py-4 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg hover:shadow-nexos-blue/30"
            >
              <span class="text-lg">SERVICIOS</span>
            </button>
            
            <!-- Botón Contacto (Óvalo derecho) -->
            <button 
              @click="goToContact"
              class="nexos-oval-button nexos-oval-contact bg-nexos-orange/20 border-2 border-nexos-orange hover:bg-nexos-orange hover:border-nexos-orange text-white font-bold px-8 py-4 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg hover:shadow-nexos-orange/30"
            >
              <span class="text-lg">CONTACTO</span>
            </button>
          </div>
        </div>

        <!-- Right Column - Additional Content or Space -->
        <div class="hidden lg:block">
          <!-- Espacio para balance visual -->
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

/* Título principal con estilo empresarial */
.hero-main-title {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* Botones ovales estilo "dibujado a mano" */
.nexos-oval-button {
  position: relative;
  border-radius: 50px;
  min-width: 160px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

/* Efecto de "dibujado" con pseudo-elementos */
.nexos-oval-button::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50px;
  border: 2px solid transparent;
  background: linear-gradient(45deg, currentColor, transparent, currentColor);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.nexos-oval-button:hover::before {
  opacity: 0.6;
}

/* Servicios Button - Estilo azul */
.nexos-oval-services {
  background: rgba(116, 174, 225, 0.15);
  border-color: #74AEE1;
  color: #74AEE1;
}

.nexos-oval-services:hover {
  background: #74AEE1;
  color: white;
  box-shadow: 0 6px 25px rgba(116, 174, 225, 0.4);
}

/* Contacto Button - Estilo naranja */
.nexos-oval-contact {
  background: rgba(229, 146, 34, 0.15);
  border-color: #E59222;
  color: #E59222;
}

.nexos-oval-contact:hover {
  background: #E59222;
  color: white;
  box-shadow: 0 6px 25px rgba(229, 146, 34, 0.4);
}

/* Animación de entrada para los botones */
.nexos-oval-button {
  animation: slideInScale 0.8s ease-out forwards;
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}

.nexos-oval-services {
  animation-delay: 0.3s;
}

.nexos-oval-contact {
  animation-delay: 0.5s;
}

@keyframes slideInScale {
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .nexos-oval-button {
    min-width: 140px;
    height: 60px;
  }
  
  .nexos-oval-button span {
    font-size: 0.9rem;
  }
  
  .hero-main-title {
    font-size: 2.5rem;
    line-height: 1;
  }
}

/* Parallax backgrounds */
.parallax-bg {
  will-change: transform;
  backface-visibility: hidden;
}

.parallax-slow {
  transform: translateY(var(--parallax-slow, 0));
}

.parallax-medium {
  transform: translateY(var(--parallax-medium, 0));
}

.parallax-fast {
  transform: translateY(var(--parallax-fast, 0));
}
</style>
