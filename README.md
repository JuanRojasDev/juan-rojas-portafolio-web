# Juan Andrés Rojas - Portfolio

Portfolio personal de desarrollo web con diseño inspirado en las mejores prácticas de la industria. Presenta mis habilidades, proyectos y experiencia como desarrollador Full-Stack.

### 🌐 Website: [juanrojas.vercel.app](https://juanrojas.vercel.app/)

## ✨ Características

- **Diseño Moderno**: Implementación pixel-perfect con animaciones suaves y transiciones elegantes
- **Cursor Personalizado**: Cursor interactivo con `mix-blend-mode` y efectos magnéticos
- **Smooth Scrolling**: Integración de Lenis para navegación fluida
- **Animaciones Avanzadas**: GSAP y Framer Motion para efectos visuales impactantes
- **Preloader Animado**: Carga inicial con contador y saludos multiidioma
- **Responsive Design**: Optimizado para todos los dispositivos
- **Multiidioma**: Soporte completo para Español e Inglés
- **Modo Oscuro**: Secciones con paleta oscura para mejor contraste

## 🚀 Tecnologías

- **Frontend**: React 18, React Router DOM
- **Styling**: Styled Components
- **Animaciones**: GSAP, Framer Motion, Lenis
- **3D**: Three.js, React Three Fiber
- **Formularios**: EmailJS
- **Internacionalización**: React i18next
- **Build**: React Scripts

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JuanRojasDev/juan-rojas-portafolio-web.git

# Navegar al directorio
cd juan-rojas-portafolio-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
```

## 🎨 Estructura del Proyecto

```
src/
├── components/
│   ├── canvas/          # Componentes 3D (Three.js)
│   ├── cards/           # Tarjetas de proyectos, experiencia
│   ├── sections/        # Secciones principales
│   └── studio/          # Componentes reutilizables
├── pages/               # Páginas del sitio
├── data/                # Datos y constantes
├── context/             # Context API (idioma, etc.)
├── hooks/               # Custom hooks
├── images/              # Imágenes y assets
└── utils/               # Utilidades y helpers
```

## 🎯 Secciones

1. **Hero** - Presentación con animación marquee y foto
2. **About** - Información personal y profesional
3. **Work** - Portfolio de proyectos destacados
4. **Skills** - Habilidades técnicas y frameworks
5. **Experience** - Experiencia laboral
6. **Education** - Formación académica
7. **Contact** - Formulario de contacto

## 🔧 Configuración

### Variables de Entorno

```env
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key
```

### Personalización

1. Actualiza `src/data/constants.js` con tu información personal
2. Reemplaza las imágenes en `public/` y `src/images/`
3. Modifica los colores en `src/index.css` (variables CSS)
4. Ajusta las traducciones en `src/data/translations.js`

## 📱 Características Responsive

- **Desktop** (> 960px): Experiencia completa con cursor personalizado
- **Tablet** (720px - 960px): Layout adaptado, animaciones optimizadas
- **Mobile** (< 720px): Diseño vertical, navegación simplificada

## 🎨 Sistema de Diseño

### Tipografía
- **Principal**: PP Neue Montreal
- **Fallback**: Inter, System Sans

### Paleta de Colores
- **Paper**: `#999d9e` (Fondo claro)
- **Ink**: `#1c1d20` (Texto principal)
- **Accent**: `#455ce9` (Color de énfasis)

### Animaciones
- **Entrada**: `expo.out` (1.2s)
- **Hover**: `ease` (0.4s)
- **Scroll**: ScrollTrigger con reveal effects

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run deploy
```
re/nueva-caracteristica`)
5. Abre un Pull Request

## 📧 Contacto

- **Email**: rojassalinasjuanandres@gmail.com
- **LinkedIn**: [Juan Andrés Rojas](https://www.linkedin.com/in/juan-andres-rojas-salinas-2a74b31bb/)
- **GitHub**: [@JuanRojasDev](https://github.com/JuanRojasDev)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ por Juan Andrés Rojas
