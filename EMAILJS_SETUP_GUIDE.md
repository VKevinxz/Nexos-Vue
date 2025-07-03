# 📧 Configuración de EmailJS - Paso a Paso

## 🚀 ¿Por qué EmailJS?

EmailJS te permite enviar emails directamente desde tu frontend usando tu cuenta de Gmail, **sin necesidad de backend** y **sin vincular emails destino**.

### ✅ Ventajas:
- Envía desde tu Gmail directamente
- No requiere vincular el email destino
- 200 emails gratis por mes
- Sin backend necesario
- Templates personalizables
- Cualquier destinatario sin restricciones

## 📋 Configuración Paso a Paso

### 1. Crear Cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign up for free"
3. Regístrate con tu email

### 2. Conectar Gmail
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Autoriza tu cuenta de Gmail
5. Dale un nombre al servicio (ej: `gmail`)

### 3. Crear Template de Email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura tu template:

```html
Subject: Nuevo mensaje de {{from_name}} desde Nexos Landing

Template Content:
Has recibido un nuevo mensaje desde la landing page de Nexos:

Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}
Servicio de interés: {{service}}

Mensaje:
{{message}}

---
Puedes responder directamente a: {{reply_to}}
```

4. En "Settings" del template:
   - **To Email**: `{{to_email}}` (esto permite enviar a cualquier destinatario)
   - **From Name**: `Nexos Landing`
   - **Reply To**: `{{reply_to}}`

5. Guarda el template y copia el **Template ID**

### 4. Obtener Public Key
1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key**

### 5. Configurar en tu Proyecto

Edita `src/composables/useEmailJS.ts`:

```typescript
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui', // Reemplaza con tu Public Key
  SERVICE_ID: 'gmail', // O el nombre que le diste a tu servicio
  TEMPLATE_ID: 'tu_template_id_aqui' // Reemplaza con tu Template ID
}
```

### 6. Configurar Email Destino

En `src/components/Contact.vue`, actualiza:

```typescript
const DESTINATION_EMAILS = [
  'tu-email@gmail.com', // Tu email principal
  // 'backup@gmail.com' // Email secundario opcional
]
```

## 🎯 Uso

Una vez configurado, tu formulario enviará emails automáticamente a la dirección que especifiques, usando tu cuenta de Gmail como remitente.

### Características:
- ✅ Envía a **cualquier email** sin necesidad de verificación
- ✅ Usa **tu Gmail** como remitente
- ✅ El destinatario puede **responder directamente**
- ✅ **200 emails gratis** por mes
- ✅ Sin límites de emails destino

## 🔄 Alternativas Rápidas

Si no quieres configurar EmailJS ahora, también tienes:

### Web3Forms (Más Simple)
```typescript
// En Contact.vue, cambia la importación:
import { useWeb3Forms } from '../composables/useWeb3Forms'
const { sendEmail } = useWeb3Forms()

// Y configura tu Access Key en useWeb3Forms.ts
```

### Formspree (Con Limitaciones)
```typescript
// En Contact.vue, cambia la importación:
import { useFormspree } from '../composables/useFormspree'
const { sendEmail } = useFormspree()

// Y configura tu Form ID en useFormspree.ts
```

## 🎨 Template HTML Personalizado

Para un email más profesional, puedes usar HTML en tu template:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #f97316;">Nuevo mensaje desde Nexos</h2>
  
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Empresa:</strong> {{company}}</p>
    <p><strong>Servicio:</strong> {{service}}</p>
  </div>
  
  <div style="background: white; padding: 20px; border-left: 4px solid #f97316;">
    <h3>Mensaje:</h3>
    <p>{{message}}</p>
  </div>
  
  <p style="color: #6b7280; font-size: 14px;">
    Puedes responder directamente a este email.
  </p>
</div>
```

¡Listo! Con esta configuración tendrás un sistema de contacto profesional que envía emails desde tu Gmail a cualquier destinatario. 🚀
