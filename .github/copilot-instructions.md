<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Proyecto Nexos - Landing Page

Este es un proyecto de landing page moderna creado con:
- Vue 3.5.x con Composition API y `<script setup>`
- TypeScript para tipado estático
- Tailwind CSS 4.1.x para estilos
- Vite 7.x como build tool

## Estructura del Proyecto

- `src/App.vue` - Componente principal con navegación y layout
- `src/components/Hero.vue` - Sección hero con animaciones
- `src/components/Features.vue` - Sección de servicios y características
- `src/components/About.vue` - Información sobre la empresa y equipo
- `src/components/Contact.vue` - Formulario de contacto y información

## Guías de Desarrollo

### Vue 3 Composition API
- Usar `<script setup>` para la sintaxis moderna
- Importar funciones reactivas: `ref`, `reactive`, `computed`, `watch`
- Usar TypeScript para tipado de props y variables

### Tailwind CSS v4
- Utilizar clases utilitarias modernas
- Aprovechar gradientes y efectos de backdrop-blur
- Usar variables CSS cuando sea necesario
- Responsive design con prefijos sm:, md:, lg:, xl:

### Mejores Prácticas
- Componentes reutilizables y modulares
- Estado reactivo bien organizado
- Transiciones y animaciones suaves
- Diseño responsive y accesible
- Código limpio y bien documentado

## Comandos de Desarrollo

```bash
npm run dev     # Servidor de desarrollo
npm run build   # Build de producción
npm run preview # Preview del build
```
