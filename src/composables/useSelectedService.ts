import { ref } from 'vue'

// Estado global para el servicio seleccionado
const selectedService = ref<string>('')

export const useSelectedService = () => {
  const setSelectedService = (service: string) => {
    selectedService.value = service
  }

  const getSelectedService = () => {
    return selectedService.value
  }

  const clearSelectedService = () => {
    selectedService.value = ''
  }

  return {
    selectedService,
    setSelectedService,
    getSelectedService,
    clearSelectedService
  }
}
