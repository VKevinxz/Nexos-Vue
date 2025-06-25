import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimations() {
  const scrollY = ref(0)
  const windowHeight = ref(0)

  const updateScroll = () => {
    scrollY.value = window.scrollY
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('resize', updateScroll)
  })

  return {
    scrollY,
    windowHeight
  }
}

export function useIntersectionObserver() {
  const observedElements = ref<Map<Element, boolean>>(new Map())

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        observedElements.value.set(entry.target, entry.isIntersecting)
        
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          entry.target.classList.remove('animate-out')
        } else {
          entry.target.classList.add('animate-out')
          entry.target.classList.remove('animate-in')
        }
      })
    },
    {
      threshold: [0, 0.1, 0.5, 0.9],
      rootMargin: '-10% 0px -10% 0px'
    }
  )

  const observe = (element: Element) => {
    observer.observe(element)
  }

  const unobserve = (element: Element) => {
    observer.unobserve(element)
    observedElements.value.delete(element)
  }

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    observe,
    unobserve,
    observedElements
  }
}
