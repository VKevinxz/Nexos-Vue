import { ref } from 'vue'
import emailjs from '@emailjs/browser'

interface EmailData {
  name: string
  email: string
  company?: string
  message: string
  service?: string
}

export function useEmailJS() {
  const isSubmitting = ref(false)
  const submitMessage = ref('')
  
  // Configuración EmailJS - ✅ CONFIGURADO
  const EMAIL_CONFIG = {
    PUBLIC_KEY: '0JcVirXo1qnzEzyHH', // ✅ Tu Public Key
    SERVICE_ID: 'service_7eunqh8', // ✅ Tu Service ID
    TEMPLATE_ID: 'template_ujv6c8q' // ✅ Tu Template ID
  }

  const initEmailJS = () => {
    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY)
    console.log('✅ EmailJS inicializado correctamente')
  }

  const sendEmail = async (formData: EmailData, toEmail: string = 'hola@nexos.dev') => {
    isSubmitting.value = true
    submitMessage.value = ''

    try {
      // Parámetros que se envían al template
      const templateParams = {
        to_email: toEmail, // Email destino (puede ser cualquiera)
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'No especificada',
        service: formData.service || 'No especificado',
        message: formData.message,
        reply_to: formData.email
      }

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      )

      if (response.status === 200) {
        submitMessage.value = '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
        return { success: true, data: response }
      } else {
        throw new Error('Error en el envío')
      }
    } catch (error) {
      console.error('Error al enviar email:', error)
      submitMessage.value = 'Error al enviar el mensaje. Por favor intenta nuevamente.'
      return { success: false, error }
    } finally {
      isSubmitting.value = false
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        submitMessage.value = ''
      }, 5000)
    }
  }

  // Función para enviar a múltiples destinatarios
  const sendEmailToMultiple = async (formData: EmailData, emails: string[]) => {
    const results = []
    
    for (const email of emails) {
      const result = await sendEmail(formData, email)
      results.push({ email, result })
    }
    
    return results
  }

  return {
    isSubmitting,
    submitMessage,
    initEmailJS,
    sendEmail,
    sendEmailToMultiple
  }
}