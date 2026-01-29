# Bee-Bot PWA

Aprende jugando con Bee-Bot y la Profesora Elimar.

Este proyecto es una **Aplicación Web Progresiva (PWA)** diseñada para simular el funcionamiento de un robot educativo Bee-Bot. Permite a los niños aprender conceptos básicos de programación, secuencias y orientación espacial de manera interactiva y divertida, tanto en línea como sin conexión a internet.

## Características Principales

*   **Simulación Realista**: Reproduce los movimientos y comportamientos clásicos del Bee-Bot (Adelante, Atrás, Girar Izquierda, Girar Derecha, Pausa).
*   **Memoria de Comandos**: Permite programar una secuencia de pasos para que el Bee-Bot los ejecute en orden.
*   **Visualización de Cola**: Muestra visualmente los comandos almacenados en la memoria del robot.
*   **Audio Interactivo**: Efectos de sonido para mejorar la experiencia de usuario (requiere interacción inicial).
*   **Modo PWA (Instalable)**:
    *   **Instalable**: Se puede instalar como una aplicación nativa en dispositivos móviles y de escritorio.
    *   **Soporte Offline**: Funciona perfectamente sin conexión a internet una vez instalada.
    *   **Rendimiento**: Carga rápida y optimizada.
*   **Diseño Responsivo**: Adaptado para funcionar en tabletas, móviles y ordenadores de escritorio.

## Tecnologías Utilizadas

Este proyecto utiliza un stack moderno y eficiente:

*   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido.
*   **[React](https://react.dev/)**: Biblioteca para construir la interfaz de usuario.
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para mayor robustez en el código.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para un diseño moderno y responsive.
*   **[shadcn/ui](https://ui.shadcn.com/)**: Componentes de UI reutilizables y accesibles.
*   **[Framer Motion](https://www.framer.com/motion/)**: Animaciones fluidas para las interacciones del Bee-Bot.
*   **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)**: Configuración para convertir la web en una PWA funcional.

## Instalación y Desarrollo Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clonar el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd beebot
    ```

2.  **Instalar dependencias**:
    Asegúrate de tener Node.js instalado.
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:8080` (o el puerto que indique la consola).

4.  **Construir para producción**:
    Para generar la versión optimizada para producción:
    ```bash
    npm run build
    ```

## Cómo instalar la PWA

1.  Abre la aplicación en tu navegador (Chrome, Edge, Safari, etc.).
2.  Busca el icono de "Instalar" en la barra de direcciones o en el menú de opciones del navegador.
3.  Selecciona "Instalar Bee-Bot PWA".
4.  ¡Listo! Ahora tendrás la aplicación en tu pantalla de inicio y podrás usarla sin internet.

---

**Portafolio del Desarrollador**: [https://joshuachavl.vercel.app/](https://joshuachavl.vercel.app/)
