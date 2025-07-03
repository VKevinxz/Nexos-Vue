<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '../composables/useScrollAnimations'
import { useTheme } from '../composables/useTheme'

const { isDark } = useTheme()

const stats = [
  { number: '50+', label: 'Proyectos Completados' },
  { number: '3+', label: 'Años de Experiencia' },
  { number: '100%', label: 'Clientes Satisfechos' },
  { number: '24/7', label: 'Soporte Técnico' }
]

const { observe } = useIntersectionObserver()
const aboutRef = ref<HTMLElement>()

onMounted(() => {
  if (aboutRef.value) {
    observe(aboutRef.value)
    
    // Observe all scroll-animate elements
    const animatedElements = aboutRef.value.querySelectorAll('.scroll-animate')
    animatedElements.forEach(el => observe(el))
  }
})
</script>

<template>
  <section ref="aboutRef" id="about" class="py-20 px-4 relative">
    <!-- Efectos de fondo para About con parallax -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb floating-orb-1 absolute top-1/4 left-20 w-36 h-36 bg-nexos-orange opacity-8 parallax-bg parallax-slow"></div>
      <div class="floating-orb floating-orb-2 absolute bottom-1/3 right-16 w-28 h-28 bg-nexos-blue opacity-12 parallax-bg parallax-medium"></div>
      
      <!-- Líneas de conexión suaves con parallax -->
      <div class="absolute inset-0 parallax-bg parallax-fast">
        <svg class="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:var(--nexos-blue);stop-opacity:1" />
              <stop offset="100%" style="stop-color:var(--nexos-orange);stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20,10 Q60,50 90,20" stroke="url(#aboutGradient)" stroke-width="0.3" fill="none">
            <animate attributeName="d" 
                     values="M20,10 Q60,50 90,20;M20,20 Q60,30 90,40;M20,10 Q60,50 90,20" 
                     dur="12s" 
                     repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 scroll-animate fade-down">
        <h2 class="text-4xl md:text-5xl font-bold text-theme-primary mb-6 flex items-center justify-center gap-4">
          Acerca de
          <img 
            :src="isDark() ? '/image/Logo_Darkmode.webp' : '/image/Logo_Lightmode.webp'" 
            alt="NEXOS" 
            class="h-24 md:h-32 w-auto object-contain"
          />
        </h2>
        <p class="text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed scroll-animate fade-up stagger-1">
          Somos NEXOS, una empresa especializada en consultoría integral y transformación digital.
          Conectamos oportunidades, creamos valor y transformamos realidades empresariales.
        </p>
      </div>

      <!-- Misión, Visión y Valores - Diseño unificado -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <!-- Misión -->
        <div class="bg-gradient-to-br from-nexos-orange/10 to-nexos-orange/5 backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 scroll-animate fade-left stagger-2 shadow-adaptive">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-nexos-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-nexos-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-theme-primary mb-4">Nuestra Misión</h3>
          </div>
          
          <p class="text-theme-secondary mb-6 leading-relaxed text-center">
            Conectar oportunidades, crear valor y transformar realidades empresariales 
            a través de consultoría integral y transformación digital especializada.
          </p>
          
          <!-- Features list -->
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 flex-shrink-0"></div>
              <span class="text-theme-primary text-sm">Consultoría integral especializada</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 flex-shrink-0"></div>
              <span class="text-theme-primary text-sm">Transformación digital efectiva</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 flex-shrink-0"></div>
              <span class="text-theme-primary text-sm">Acompañamiento continuo personalizado</span>
            </div>
          </div>
        </div>

        <!-- Visión -->
        <div class="bg-gradient-to-br from-nexos-blue/10 to-nexos-blue/5 backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 scroll-animate fade-up stagger-3 shadow-adaptive">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-nexos-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-nexos-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-theme-primary mb-4">Nuestra Visión</h3>
          </div>
          
          <p class="text-theme-secondary leading-relaxed text-center">
            Ser el socio estratégico líder en consultoría integral y transformación digital, 
            reconocidos por nuestra excelencia, innovación y compromiso en la transformación 
            de realidades empresariales.
          </p>
        </div>

        <!-- Valores -->
        <div class="bg-gradient-to-br from-nexos-orange/5 to-nexos-blue/5 backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 scroll-animate fade-right stagger-4 shadow-adaptive">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-nexos-orange/20 to-nexos-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-theme-primary mb-4">Nuestros Valores</h3>
          </div>
          
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-2xl mb-1">🎯</div>
              <h5 class="text-sm font-semibold text-theme-primary mb-1">Integridad</h5>
              <p class="text-theme-secondary text-xs">Compromiso ético en cada decisión</p>
            </div>
            <div class="text-center">
              <div class="text-2xl mb-1">🚀</div>
              <h5 class="text-sm font-semibold text-theme-primary mb-1">Innovación</h5>
              <p class="text-theme-secondary text-xs">Soluciones creativas y vanguardistas</p>
            </div>
            <div class="text-center">
              <div class="text-2xl mb-1">⭐</div>
              <h5 class="text-sm font-semibold text-theme-primary mb-1">Excelencia</h5>
              <p class="text-theme-secondary text-xs">Calidad superior en cada proyecto</p>
            </div>
            <div class="text-center">
              <div class="text-2xl mb-1">🤝</div>
              <h5 class="text-sm font-semibold text-theme-primary mb-1">Compromiso</h5>
              <p class="text-theme-secondary text-xs">Dedicación total con nuestros clientes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats section -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          :class="`text-center bg-theme-overlay-light backdrop-blur-adaptive rounded-xl p-6 border border-theme-light hover:border-theme-medium transition-all duration-300 scroll-animate scale-in stagger-${index + 1} shadow-adaptive`"
        >
          <div class="text-3xl md:text-4xl font-bold text-nexos-orange mb-2">
            {{ stat.number }}
          </div>
          <p class="text-theme-secondary text-sm md:text-base">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Fundación NEXOS section -->
      <div class="text-center mb-16 scroll-animate fade-up stagger-2">
        <h3 class="text-4xl md:text-5xl font-bold text-theme-secondary mb-6 flex items-center justify-center gap-4">
          Fundación
          <img 
            :src="isDark() ? '/image/Logo_Darkmode.webp' : '/image/Logo_Lightmode.webp'" 
            alt="NEXOS" 
            class="h-32 md:h-40 w-auto object-contain"
          />
        </h3>
        <p class="text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed mb-12">
          Comprometidos con Transformar Realidades
        </p>
        
        <!-- Proyectos de la Fundación -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Proyecto 1: Pintando un Mundo de Esperanzas -->
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 shadow-adaptive">
            <div class="relative mb-6 overflow-hidden rounded-xl">
              <img 
                src="/image/manitas.png" 
                alt="Pintando un Mundo de Esperanzas"
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <div class="text-3xl">🎨</div>
              </div>
            </div>
            
            <h4 class="text-2xl font-bold text-nexos-orange mb-4">
              "Pintando un Mundo de Esperanzas"
            </h4>
            <p class="text-theme-secondary mb-6 leading-relaxed">
              Llevamos color, alegría y apoyo a comunidades rurales, fortaleciendo espacios educativos, recreativos y comunitarios.
            </p>
            
            <!-- Actividades -->
            <div class="space-y-3">
              <h5 class="text-nexos-orange font-semibold mb-3">Actividades:</h5>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Intervenciones artísticas en escuelas</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Donación de útiles y materiales</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Jornadas recreativas y educativas</span>
              </div>
            </div>
          </div>

          <!-- Proyecto 2: Échame una Pata -->
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 shadow-adaptive">
            <div class="relative mb-6 overflow-hidden rounded-xl">
              <img 
                src="/image/patita.png" 
                alt="Échame una Pata"
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <div class="text-3xl">🐾</div>
              </div>
            </div>
            
            <h4 class="text-2xl font-bold text-nexos-blue mb-4">
              "Échame una Pata"
            </h4>
            <p class="text-theme-secondary mb-6 leading-relaxed">
              Creamos conciencia sobre el cuidado y protección de los animales callejeros, brindando ayuda y una cultura de respeto.
            </p>
            
            <!-- Actividades -->
            <div class="space-y-3">
              <h5 class="text-nexos-blue font-semibold mb-3">Actividades:</h5>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Instalación de comederos y bebederos</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Jornadas de adopción y esterilización</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Campañas educativas y voluntariado</span>
              </div>
            </div>
          </div>

          <!-- Proyecto 3: Salud y Ergo -->
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 hover:transform hover:scale-105 shadow-adaptive">
            <div class="relative mb-6 overflow-hidden rounded-xl">
              <img 
                src="/image/ergo.png" 
                alt="Salud y Ergo"
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <div class="text-3xl">💪</div>
              </div>
            </div>
            
            <h4 class="text-2xl font-bold text-nexos-orange mb-4">
              "Salud y Ergo"
            </h4>
            <p class="text-theme-secondary mb-6 leading-relaxed">
              En Fundación NEXOS fomentamos la salud laboral y buenos hábitos, como consumir productos sin azúcar ni grasas.
            </p>
            
            <!-- Actividades -->
            <div class="space-y-3">
              <h5 class="text-nexos-orange font-semibold mb-3">Actividades:</h5>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Estaciones de trabajo ergonómicas y capacitación</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Talleres sobre nutrición y hábitos saludables</span>
              </div>
              <div class="flex items-start">
                <div class="w-2 h-2 bg-nexos-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span class="text-theme-secondary text-sm">Pausas activas y opciones alimenticias saludables</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to action para la Fundación -->
        <div class="mt-16">
          <div class="bg-gradient-to-r from-nexos-orange/10 to-nexos-blue/10 backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light hover:border-theme-medium transition-all duration-300 shadow-adaptive">
            <h4 class="text-2xl font-bold text-theme-primary mb-4">
              ¿Quieres ser parte del cambio?
            </h4>
            <p class="text-theme-secondary mb-6 max-w-2xl mx-auto">
              Únete a nuestros proyectos sociales y ayúdanos a transformar realidades en nuestras comunidades.
            </p>
            <button class="bg-gradient-to-r from-nexos-orange to-nexos-blue hover:from-nexos-orange/90 hover:to-nexos-blue/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Colaborar con la Fundación
            </button>
          </div>
        </div>
      </div>

      <!-- Reconocimientos section -->
      <div class="text-center mb-16">
        <h3 class="text-3xl font-bold text-white mb-6">Reconocimientos</h3>
        <p class="text-theme-secondary max-w-2xl mx-auto mb-12">
          Nuestro compromiso con la excelencia nos ha permitido obtener importantes reconocimientos
        </p>
        
        <!-- Carrusel infinito de reconocimientos -->
        <div class="relative overflow-hidden">
          <div class="flex animate-scroll-infinite">
            <!-- Primera serie de reconocimientos -->
            <div class="flex flex-shrink-0">
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/2.1.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/3.1.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/4.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/5.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/6.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/7.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/8.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/9.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/10.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/11.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/12.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/13.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/PONTICIA.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <!-- Segunda serie (duplicada para efecto infinito) -->
            <div class="flex flex-shrink-0">
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/2.1.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/3.1.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/4.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/5.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/6.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/7.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/8.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/9.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/10.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/11.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/12.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/13.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div class="mx-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <img src="/image/reconocimientos/PONTICIA.png" alt="Reconocimiento" class="w-20 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
