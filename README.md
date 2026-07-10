# check-ia (Workshop Matrix Checklist)

Aplicación web **PWA** con estética Matrix (terminal verde sobre fondo negro) para **evaluar y comparar los siete proyectos propuestos en el workshop** mediante un checklist de criterios compartidos. Diseñada **mobile-first**: cabecera fija con progreso global, lista de proyectos expandibles y panel inferior con el top de recomendados.

## Qué es

Un evaluador interactivo que no sustituye el juicio del equipo, sino que **estructura la revisión**: cada proyecto muestra un semáforo por criterio (verde / amarillo / rojo según la matriz base), puedes marcar qué puntos ya validaste en vivo y ves el avance por proyecto y en conjunto. Los datos viven solo en el navegador; no hay cuentas ni servidor.

## Problema que resuelve

En un taller con **siete ideas de producto** (inventario QR, cuentas compartidas, juego, plan de estudio, calorías, viajes, meta concreta) es fácil perder el hilo: criterios distintos por conversación, comparaciones informales y olvido de qué ya se revisó. Esta app:

- Aplica la **misma rúbrica global** (problema público, alcance MVP, arquitectura, full-stack, CRUD, API externa, LLM central, seguridad, responsive, IA en el proceso, documentación Forge) a todos los proyectos.
- Muestra el **veredicto y la etiqueta “Recomendado”** de la matriz workshop.
- Permite **marcar criterios revisados** y recuperar el estado al volver a abrir la PWA.
- Destaca un **ranking de hasta tres proyectos recomendados** ordenados por criterios en verde.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 + CSS Modules (tokens Matrix) |
| Estado | Zustand (checklist + persistencia) |
| PWA | `vite-plugin-pwa` (manifest, iconos, modo standalone) |
| Tests | Vitest + happy-dom |
| Lint | Oxlint |

## Arquitectura (screaming folders)

La estructura del código agrupa por **capacidad de negocio**, no por tipo técnico genérico:

```
check-ia/
├── public/                 # Iconos PWA y favicon
├── src/
│   ├── app/                # Composición raíz (App, MobileShell)
│   ├── checklist/          # Página principal, store, persistencia local
│   │   ├── components/     # ChecklistPage, ProgressHeader, CriteriaRow
│   │   ├── hooks/          # useChecklistStore
│   │   ├── services/       # checklistStorage (+ tests)
│   │   └── types/
│   ├── projects/           # Dominio workshop: proyectos, tarjetas, recomendaciones
│   │   ├── components/     # ProjectList, ProjectCard, RecommendationPanel
│   │   ├── data/           # Seed de 7 proyectos + criterios globales
│   │   ├── hooks/
│   │   └── types/
│   ├── matrix-theme/       # Tema visual Matrix (tokens, overlays)
│   └── shared/             # UI primitiva y utilidades (cn, Button, Checkbox)
├── index.html
├── vite.config.ts
├── vitest.config.ts
└── package.json
```

Flujo principal: `App` → `ChecklistPage` → `MobileShell` (cabecera + scroll + panel fijo inferior) → `ProjectList` / `RecommendationPanel`, con estado en `useChecklistStore` y escritura en `localStorage`.

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR (Vite) |
| `npm run build` | `tsc -b` + build de producción en `dist/` |
| `npm run preview` | Sirve la build local (ideal para probar PWA) |
| `npm test` | Vitest en una pasada |
| `npm run lint` | Oxlint |

Requisitos: **Node.js 20+** y **npm 10+**.

```bash
git clone https://github.com/OscarRubioSevilla/check-ia.git
cd check-ia
npm install
npm run dev
```

## Instalar como PWA en móvil

1. Genera y sirve la app en **HTTPS** (en local: `npm run build && npm run preview`; en producción despliega `dist/`).
2. Abre la URL en el teléfono.
3. **iOS (Safari):** Compartir → **Añadir a pantalla de inicio**.
4. **Android (Chrome):** Menú (⋮) → **Instalar aplicación** o **Añadir a pantalla de inicio**.

La PWA se abre en modo **standalone** (sin barra del navegador), con safe areas y tema verde Matrix (`#00FF41`).

## Persistencia (`localStorage`)

El progreso del checklist se guarda en el navegador bajo la clave:

`workshop-matrix-checklist`

Incluye qué criterios están marcados por proyecto, notas asociadas (si se usan) y `lastUpdated`. Borrar datos del sitio o usar otro dispositivo/navegador **no sincroniza** entre equipos.

## Sin autenticación ni backend

No hay login, API propia ni base de datos. Los proyectos y ratings base vienen del **seed** en código (`workshopProjects.seed.ts`). La app es 100 % cliente: adecuada para uso en sala de workshop o revisión individual offline tras la primera carga.

## Repositorio

Código fuente en **[check-ia](https://github.com/OscarRubioSevilla/check-ia)** (`OscarRubioSevilla/check-ia`). Proyecto standalone: no depende del monorepo lsm-platform.
