# Configuración de EmailJS

## Pasos Rápidos:

1. **Registrarte en EmailJS**: https://www.emailjs.com/
2. **Conectar Gmail**: Autoriza tu cuenta de Gmail en EmailJS
3. **Crear Template**: Copia el template de EMAILJS_SETUP_GUIDE.md
4. **Configurar credenciales** en `src/composables/useEmailJS.ts`:

```typescript
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'user_xxxxxxxxxxxxxxxxx', // Tu Public Key de EmailJS
  SERVICE_ID: 'gmail', // ID de tu servicio Gmail
  TEMPLATE_ID: 'template_xxxxxxxxx' // ID de tu template
}
```

5. **Configurar email destino** en `src/components/Contact.vue`:

```typescript
const DESTINATION_EMAILS = [
  'tu-email@gmail.com', // Cambia por tu email
]
```

## ¿Dónde encontrar las credenciales?

- **Public Key**: Account → General → Public Key
- **Service ID**: Email Services → (nombre de tu servicio)
- **Template ID**: Email Templates → (ID de tu template)

## Resultado:

✅ Envíos desde tu Gmail a cualquier destinatario
✅ 200 emails gratis por mes  
✅ Sin verificación de emails destino
✅ Respuestas directas al remitente
