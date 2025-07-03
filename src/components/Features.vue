<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '../composables/useScrollAnimations'
import { useSelectedService } from '../composables/useSelectedService'

// Estado para animaciones de scroll
const featuresRef = ref<HTMLElement>()
const { observe } = useIntersectionObserver()
const { setSelectedService } = useSelectedService()

// Mapeo de servicios a opciones del formulario
const serviceMapping: Record<string, string> = {
  'Nexos Estratégicos': 'Consultoría Estratégica',
  'Nexos Financieros': 'Consultoría Financiera', 
  'Nexos Legales': 'Consultoría Legal',
  'Nexos Digital': 'Transformación Digital'
}

const features = [
  {
    icon: '🎯',
    image: '/image/17.png',
    title: 'Nexos Estratégicos',
    subtitle: 'Consultoría Estratégica',
    description: 'Consultoría empresarial y estratégica para optimizar el crecimiento y desarrollo organizacional.',
    services: ['Planificación Estratégica', 'Análisis de Mercado', 'Optimización de Procesos', 'Gestión del Cambio']
  },
  {
    icon: '💰',
    image: '/image/15.png',
    title: 'Nexos Financieros',
    subtitle: 'Consultoría Financiera',
    description: 'Consultoría financiera y contable especializada para fortalecer la estabilidad económica empresarial.',
    services: ['Análisis Financiero', 'Gestión de Riesgos', 'Planificación Fiscal', 'Estructuración Financiera']
  },
  {
    icon: '⚖️',
    image: '/image/16.png',
    title: 'Nexos Legales',
    subtitle: 'Consultoría Legal',
    description: 'Asesoría jurídica especializada para garantizar el cumplimiento normativo y legal empresarial.',
    services: ['Derecho Corporativo', 'Cumplimiento Normativo', 'Resolución de Conflictos', 'Contratos y Negociaciones']
  },
  {
    icon: '🚀',
    image: '/image/18.png',
    title: 'Nexos Digital',
    subtitle: 'Transformación Digital',
    description: 'Transformación digital y tecnológica para modernizar procesos y potenciar el crecimiento empresarial.',
    services: ['Software Personalizado', 'Marketing Digital', 'Automatización de Procesos', 'Consultoría Tecnológica']
  }
]

const goToContactWithService = (featureTitle: string) => {
  // Establecer el servicio seleccionado
  const mappedService = serviceMapping[featureTitle]
  if (mappedService) {
    setSelectedService(mappedService)
  }
  
  // Navegar a la sección de contacto
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

onMounted(() => {
  if (featuresRef.value) {
    observe(featuresRef.value)
    
    // Observe all scroll-animate elements
    const animatedElements = featuresRef.value.querySelectorAll('.scroll-animate')
    animatedElements.forEach(el => observe(el))
  }
})
</script>

<template>
  <section ref="featuresRef" id="features" class="py-20 px-4 relative">
    <!-- Efectos de fondo para Features con parallax -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb floating-orb-2 absolute top-10 right-10 w-40 h-40 bg-nexos-blue opacity-10 parallax-bg parallax-slow"></div>
      <div class="floating-orb floating-orb-3 absolute bottom-20 left-10 w-32 h-32 bg-nexos-orange opacity-10 parallax-bg parallax-medium"></div>
      
      <!-- Partículas adicionales -->
      <div class="sparkle absolute top-1/4 right-1/3 w-1 h-1 bg-nexos-blue rounded-full"></div>
      <div class="sparkle absolute top-3/4 left-1/4 w-2 h-2 bg-nexos-orange rounded-full"></div>
      <div class="sparkle absolute bottom-1/4 left-1/3 w-1 h-1 bg-nexos-orange rounded-full"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 scroll-animate fade-down">
        <h2 class="text-4xl md:text-5xl font-bold text-theme-primary mb-6">
          Nuestros
          <span class="text-nexos-orange font-bold">
            Servicios
          </span>
        </h2>
        <p class="text-xl text-theme-secondary max-w-3xl mx-auto scroll-animate fade-up stagger-1">
          Ofrecemos consultoría integral y transformación digital para conectar oportunidades,
          crear valor y transformar realidades empresariales en diversos sectores.
        </p>
      </div>

      <!-- Features grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 scroll-animate shadow-adaptive"
          :class="index % 2 === 0 ? 'fade-left' : 'fade-right'"
        >
          <!-- Image -->
          <div class="relative mb-6 overflow-hidden rounded-xl">
            <img 
              :src="feature.image" 
              :alt="feature.title"
              class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <div class="text-3xl">{{ feature.icon }}</div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="space-y-4">
            <div>
              <h3 class="text-2xl font-bold text-theme-primary mb-2">{{ feature.title }}</h3>
              <p class="text-nexos-orange font-medium text-lg">{{ feature.subtitle }}</p>
            </div>
            
            <p class="text-theme-secondary leading-relaxed">
              {{ feature.description }}
            </p>
            
            <!-- Services list -->
            <div class="space-y-2">
              <h4 class="text-theme-primary font-semibold mb-3">Servicios incluidos:</h4>
              <ul class="space-y-2">
                <li v-for="service in feature.services" :key="service" class="flex items-start">
                  <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span class="text-theme-secondary text-sm">{{ service }}</span>
                </li>
              </ul>
            </div>
            
            <!-- CTA Button -->
            <div class="pt-4">
              <button 
                @click="goToContactWithService(feature.title)"
                class="bg-gradient-to-r from-nexos-orange to-nexos-blue hover:from-nexos-orange/90 hover:to-nexos-blue/90 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-adaptive text-sm cursor-pointer"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
