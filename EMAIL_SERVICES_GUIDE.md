# Configuración de Servicios de Email

## Comparación de Opciones

### 1. EmailJS (Recomendado) ⭐

**Ventajas:**
- ✅ Envía desde tu Gmail directamente
- ✅ No requiere vincular emails destino
- ✅ 200 emails gratis/mes
- ✅ Sin backend necesario
- ✅ Templates personalizables

**Configuración:**
1. Ve a [EmailJS](https://www.emailjs.com/)
2. Crea cuenta y conecta tu Gmail
3. Crea un template de email
4. Obtén tu Public Key y Template ID

### 2. Web3Forms

**Ventajas:**
- ✅ 250 envíos gratis/mes
- ✅ Sin registro inicial
- ✅ API simple
- ✅ Protección spam incluida

**Configuración:**
1. Ve a [Web3Forms](https://web3forms.com/)
2. Obtén tu Access Key gratuito
3. Configura emails destino

### 3. Formspree

**Limitaciones:**
- ❌ Solo 50 envíos gratis/mes
- ❌ Requiere verificar email destino
- ❌ No puede enviar a emails no verificados

## Instalación

### Para EmailJS:
```bash
npm install @emailjs/browser
```

### Para Web3Forms o Formspree:
No requieren instalación adicional (usan fetch nativo)

## Uso en Contact.vue

```typescript
// Opción 1: EmailJS
import { useEmailJS } from '../composables/useEmailJS'
const { sendEmail } = useEmailJS()

// Opción 2: Web3Forms  
import { useWeb3Forms } from '../composables/useWeb3Forms'
const { sendEmail } = useWeb3Forms()

// Opción 3: Formspree
import { useFormspree } from '../composables/useFormspree'
const { sendEmail } = useFormspree()
```

## Recomendación

**Usa EmailJS** si quieres la máxima flexibilidad y control. Es la mejor opción para enviar a cualquier email sin restricciones.
