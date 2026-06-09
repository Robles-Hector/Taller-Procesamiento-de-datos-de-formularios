# 🏎 F1 Historical Database — 2020–2026

Aplicación React SPA para explorar la historia de la Fórmula 1 desde 2020 hasta 2026.

## 🚀 Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en desarrollo
npm start
```

La app se abrirá en `http://localhost:3000`

## 🔑 Credenciales de Administrador

- **Usuario:** `admin`
- **Contraseña:** `admin123`

## 📋 Páginas y rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio — Hero, búsqueda, campeón, timeline |
| `/temporadas` | Clasificaciones por año (2020–2026) |
| `/pilotos` | Lista de todos los pilotos |
| `/piloto/:slug` | Página individual del piloto |
| `/comparador` | Comparador cara a cara entre pilotos |
| `/dashboard` | Panel con gráficos y estadísticas |
| `/circuitos` | Mapa de circuitos del calendario |
| `/admin` | Panel de administración *(solo admin)* |

## 🎯 Funcionalidades

### Invitado
- Ver timeline interactiva (2020–2026)
- Explorar pilotos, temporadas y circuitos
- Comparar pilotos
- Ver dashboard con gráficos
- Búsqueda global con autocompletado

### Administrador
- Todo lo anterior +
- Agregar nueva escudería con 2 pilotos (programada para 2027)
- Editar datos de pilotos individuales
- Ver escuderías pendientes de confirmación

## 🛠 Stack tecnológico

- **React 18** — Framework UI
- **React Router v6** — Navegación SPA
- **Recharts** — Gráficos y visualizaciones
- **CSS Variables** — Sistema de temas (dark/light)
- **Google Fonts** — Titillium Web, Share Tech Mono

## 🎨 Diseño

- Modo oscuro / claro con un clic
- Paleta basada en rojo F1 (#E50914)
- Tipografía: Titillium Web + Share Tech Mono
- Totalmente responsive

## 📁 Estructura del proyecto

```
src/
├── App.jsx                    # Router principal
├── App.css                    # Estilos globales y sistema de temas
├── index.js                   # Entry point
├── context/
│   └── AppContext.jsx          # Auth, Theme y AdminData contexts
├── data/
│   └── f1Data.js              # Datos históricos F1 (temporadas, pilotos, circuitos)
└── components/
    ├── layout/
    │   └── Navbar.jsx         # Barra de navegación + modal de login
    └── pages/
        ├── HomePage.jsx       # Inicio con hero, búsqueda y timeline
        ├── SeasonsPage.jsx    # Temporadas con clasificaciones
        ├── DriversPage.jsx    # Lista de pilotos
        ├── PilotPage.jsx      # Página individual /piloto/:slug
        ├── ComparatorPage.jsx # Comparador 3x3
        ├── DashboardPage.jsx  # Dashboard con recharts
        ├── CircuitsPage.jsx   # Mapa de circuitos
        └── AdminPage.jsx      # Panel admin
```
