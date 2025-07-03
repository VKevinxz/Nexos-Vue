<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useIntersectionObserver } from '../composables/useScrollAnimations'
import { useTheme } from '../composables/useTheme'
import { useEmailJS } from '../composables/useEmailJS'

const { isDark } = useTheme()
const { isSubmitting, submitMessage, sendEmail, initEmailJS } = useEmailJS()

// Estado reactivo para el formulario
const formData = reactive({
  name: '',
  email: '',
  company: '',
  message: '',
  service: ''
})

const contactRef = ref<HTMLElement>()
const { observe } = useIntersectionObserver()

// Configuración de emails destino - ✅ CONFIGURADO
const DESTINATION_EMAILS = [
  'cm.nexosd@gmail.com', // Email principal donde recibirás los mensajes
  // 'backup@nexos.dev' // Email secundario opcional
]

const services = [
  'Consultoría Estratégica',
  'Consultoría Financiera',
  'Consultoría Legal',
  'Transformación Digital'
]

const contactInfo = [
  {
    icon: '📧',
    title: 'Email',
    value: 'abaldeon@asesoriaennegocios.com',
    link: 'mailto:abaldeon@asesoriaennegocios.com'
  },
  {
    icon: '📧',
    title: 'Email Alternativo',
    value: 'vbaldeon@asesoriaennegocios.com',
    link: 'mailto:vbaldeon@asesoriaennegocios.com'
  },
  {
    icon: '📱',
    title: 'Teléfono',
    value: '(051) 909-2347',
    link: 'tel:+51909234747'
  },
  {
    icon: '📍',
    title: 'Ubicación',
    value: 'Lima 043 - Perú',
    link: '#'
  }
]

const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.message) {
    submitMessage.value = 'Por favor completa todos los campos requeridos'
    return
  }

  try {
    // Enviar email usando EmailJS
    const result = await sendEmail(formData, DESTINATION_EMAILS[0])
    
    if (result.success) {
      // Limpiar formulario solo si el envío fue exitoso
      Object.keys(formData).forEach(key => {
        formData[key as keyof typeof formData] = ''
      })
    }
  } catch (error) {
    console.error('Error en el envío:', error)
    submitMessage.value = 'Error al enviar el mensaje. Por favor intenta nuevamente.'
  }
}

onMounted(() => {
  // Inicializar EmailJS
  initEmailJS()
  
  if (contactRef.value) {
    observe(contactRef.value)
    
    // Observe all scroll-animate elements
    const animatedElements = contactRef.value.querySelectorAll('.scroll-animate')
    animatedElements.forEach(el => observe(el))
  }
})
</script>

<template>
  <section id="contact" class="py-20 px-4 relative">
    <!-- Efectos de fondo para Contact -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb floating-orb-3 absolute top-16 right-1/4 w-44 h-44 bg-nexos-blue opacity-8"></div>
      <div class="floating-orb floating-orb-1 absolute bottom-16 left-1/4 w-36 h-36 bg-nexos-orange opacity-10"></div>
      
      <!-- Partículas de contacto -->
      <div class="sparkle absolute top-1/3 left-1/6 w-2 h-2 bg-nexos-orange rounded-full"></div>
      <div class="sparkle absolute top-2/3 right-1/5 w-1 h-1 bg-nexos-blue rounded-full"></div>
      <div class="sparkle absolute bottom-1/3 left-2/3 w-1 h-1 bg-nexos-orange rounded-full"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-theme-primary mb-6">
          Hablemos de tu
          <span class="text-nexos-blue font-bold">
            Proyecto
          </span>
        </h2>
        <p class="text-xl text-theme-secondary max-w-3xl mx-auto">
          ¿Tienes una idea brillante? Estamos aquí para ayudarte a convertirla en realidad. 
          Contáctanos y comencemos a trabajar juntos.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact form -->
        <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light shadow-adaptive">
          <h3 class="text-2xl font-bold text-theme-primary mb-6">Envíanos un mensaje</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-theme-secondary mb-2">
                Nombre completo *
              </label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-theme-overlay-medium border border-theme-light rounded-lg text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-nexos-orange focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre completo"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-theme-secondary mb-2">
                Email *
              </label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-theme-overlay-medium border border-theme-light rounded-lg text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-nexos-orange focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>

            <!-- Company -->
            <div>
              <label class="block text-sm font-medium text-theme-secondary mb-2">
                Empresa (opcional)
              </label>
              <input
                v-model="formData.company"
                type="text"
                class="w-full px-4 py-3 bg-theme-overlay-medium border border-theme-light rounded-lg text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-nexos-orange focus:border-transparent transition-all duration-300"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <!-- Service -->
            <div>
              <label class="block text-sm font-medium text-theme-secondary mb-2">
                Servicio de interés
              </label>
              <select
                v-model="formData.service"
                :class="[
                  'w-full px-4 py-3 border rounded-lg transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-nexos-orange focus:border-transparent',
                  isDark() 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                ]"
              >
                <option 
                  value="" 
                  :class="isDark() ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'"
                >
                  Selecciona un servicio
                </option>
                <option 
                  v-for="service in services" 
                  :key="service" 
                  :value="service"
                  :class="isDark() ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
                >
                  {{ service }}
                </option>
              </select>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm font-medium text-theme-secondary mb-2">
                Mensaje *
              </label>
              <textarea
                v-model="formData.message"
                required
                rows="4"
                class="w-full px-4 py-3 bg-theme-overlay-medium border border-theme-light rounded-lg text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-nexos-orange focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              ></textarea>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'w-full font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform relative overflow-hidden',
                'bg-gradient-to-r from-nexos-orange to-nexos-blue text-white',
                'hover:from-nexos-orange/90 hover:to-nexos-blue/90 hover:scale-105',
                'focus:outline-none focus:ring-4 focus:ring-nexos-orange/30',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                isDark() 
                  ? 'shadow-2xl shadow-nexos-orange/20 hover:shadow-nexos-orange/40' 
                  : 'shadow-lg shadow-nexos-orange/25 hover:shadow-xl hover:shadow-nexos-orange/30',
                'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
              ]"
            >
              <span v-if="!isSubmitting" class="relative z-10">Enviar Mensaje</span>
              <span v-else class="flex items-center justify-center relative z-10">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
              
              <!-- Efecto de brillo adicional para dark mode -->
              <div 
                v-if="isDark()" 
                class="absolute inset-0 rounded-lg bg-gradient-to-r from-nexos-orange/20 to-nexos-blue/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>
            </button>

            <!-- Submit message -->
            <div v-if="submitMessage" class="text-center">
              <p class="text-nexos-orange bg-nexos-orange/10 border border-nexos-orange/20 rounded-lg p-3">
                {{ submitMessage }}
              </p>
            </div>
          </form>
        </div>

        <!-- Contact info -->
        <div class="space-y-8">
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light shadow-adaptive">
            <h3 class="text-2xl font-bold text-theme-primary mb-6">Información de contacto</h3>
            
            <div class="space-y-6">
              <div 
                v-for="info in contactInfo" 
                :key="info.title"
                class="flex items-center group"
              >
                <div class="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {{ info.icon }}
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-theme-secondary mb-1">{{ info.title }}</h4>
                  <a 
                    :href="info.link" 
                    class="text-nexos-orange hover:text-nexos-blue transition-colors"
                  >
                    {{ info.value }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light shadow-adaptive">
            <h3 class="text-2xl font-bold text-theme-primary mb-6">Preguntas Frecuentes</h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-semibold text-theme-primary mb-2">¿Cuánto tiempo toma un proyecto?</h4>
                <p class="text-theme-secondary text-sm">Depende de la complejidad, pero generalmente entre 2-8 semanas.</p>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-theme-primary mb-2">¿Ofrecen soporte post-lanzamiento?</h4>
                <p class="text-theme-secondary text-sm">Sí, ofrecemos soporte continuo y mantenimiento.</p>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-theme-primary mb-2">¿Trabajan con empresas internacionales?</h4>
                <p class="text-theme-secondary text-sm">Absolutamente, trabajamos con clientes de todo el mundo.</p>
              </div>
            </div>
          </div>

          <!-- Social links -->
          <div class="bg-theme-overlay-light backdrop-blur-adaptive rounded-2xl p-8 border border-theme-light shadow-adaptive">
            <h3 class="text-2xl font-bold text-theme-primary mb-6">Síguenos</h3>
            <div class="flex space-x-4">
              <a href="https://www.linkedin.com/company/asesoriaennegocios/" target="_blank" rel="noopener noreferrer" class="bg-nexos-blue/20 hover:bg-nexos-blue/30 p-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                <svg class="w-6 h-6 text-nexos-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@nexos.com" target="_blank" rel="noopener noreferrer" class="bg-pink-500/20 hover:bg-pink-500/30 p-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                <svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/NexosEstrategiayNegocios" target="_blank" rel="noopener noreferrer" class="bg-blue-600/20 hover:bg-blue-600/30 p-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
