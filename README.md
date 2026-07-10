# check-ia (Workshop Matrix Checklist)

Aplicación web **PWA** con tema Astryx neutral para **evaluar y comparar los siete proyectos propuestos en el workshop**. Diseñada **mobile-first**: checklist con puntuación, dashboard con leaderboard y chat IA con OpenRouter.

## Qué es

Un evaluador interactivo que **estructura la revisión en dos bloques por proyecto**:

1. **Entregables** — checklist de 17 puntos + puntuación 1–5 (estrellas).
2. **Evaluación externa** — 10 criterios con selector **Fuerte / Medio / Débil** (mapeados a 5/3/1) y override manual 1–5.

Incluye **dashboard** con ranking y **chat IA** que conoce las puntuaciones actuales del taller.

## Problema que resuelve

En un taller con **siete ideas de producto** (inventario QR, cuentas compartidas, juego, plan de estudio, calorías, viajes, meta concreta) es fácil perder el hilo: criterios distintos por conversación, comparaciones informales y olvido de qué ya se revisó. Esta app:

- Aplica la **misma rúbrica oficial** en dos modalidades: **17 entregables** (checkbox + score) + **10 evaluaciones externas** (rating + score).
- Muestra el **veredicto y la etiqueta "Recomendado"** de la matriz workshop.
- Calcula **puntuación total, promedio y % completado** por proyecto.
- Ofrece **leaderboard** y **asistente IA** para consultar evaluaciones.

## Rúbrica oficial (27 ítems por proyecto, 189 total)

| Bloque | Modalidad | Criterios |
|--------|-----------|-----------|
| **Entregables MVP** (14) | Checkbox + score 1–5 | Documentación Forge, problema/objetivo, alcance MVP, arquitectura, modelo de datos, frontend funcional, backend API, persistencia, CRUD entidad principal, validaciones, manejo de errores, seguridad, responsive, control de versiones |
| **Requisitos técnicos IA** (3) | Checkbox + score 1–5 | API externa con valor real, LLM funcional, IA en el proceso |
| **Evaluación externa** (10) | Fuerte/Medio/Débil + override 1–5 | Capacidad de análisis, calidad documentación, diseño solución, calidad código, uso IA/herramientas, integración APIs, integración LLM, seguridad y buenas prácticas, creatividad/innovación, presentación final |

**Progreso:** cada checkbox marcado, score asignado o rating externo cuenta como 1 de 27 por proyecto.

**Puntuación máxima por proyecto:** 27 × 5 = **135 puntos**.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 + Astryx neutral theme |
| Estado | Zustand (checklist + ratings + scores + persistencia) |
| Iconos | Lucide React |
| PWA | `vite-plugin-pwa` (manifest, iconos, modo standalone) |
| IA | OpenRouter API (`deepseek/deepseek-v4-flash`) |
| Tests | Vitest + happy-dom |
| Lint | Oxlint |

## Arquitectura (screaming folders)

```
check-ia/
├── public/                 # Iconos PWA y favicon
├── src/
│   ├── app/                # App shell, BottomNav, MobileShell, ThemeProvider
│   ├── checklist/          # Checklist, store, scoring, persistencia local
│   │   ├── components/     # ChecklistPage, ProgressHeader
│   │   ├── hooks/          # useChecklistStore
│   │   ├── services/       # checklistStorage, scoring (+ tests)
│   │   └── types/
│   ├── dashboard/          # Leaderboard y comparación
│   │   └── components/     # DashboardPage, LeaderboardTable, TopProjectsCard…
│   ├── chat/               # Asistente IA con contexto del taller
│   │   ├── components/     # ChatPage, ChatSettings
│   │   ├── hooks/          # useChat, useWorkshopContext
│   │   ├── services/       # openrouter.ts
│   │   └── types/
│   ├── projects/           # Dominio workshop: proyectos, tarjetas, recomendaciones
│   │   ├── components/     # ProjectList, ProjectCard, RecommendationPanel
│   │   ├── data/           # Seed de 7 proyectos + criterios globales
│   │   ├── hooks/
│   │   └── types/
│   ├── themes/neutral/     # Tema Astryx neutral
│   └── shared/             # UI primitiva (Button, Checkbox, ScoreInput, cn)
├── .env.example
├── index.html
├── vite.config.ts
└── package.json
```

Navegación inferior: **Checklist** | **Dashboard** | **Chat**.

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
cp .env.example .env   # opcional: API key OpenRouter
npm run dev
```

## OpenRouter (chat IA)

El chat usa [OpenRouter](https://openrouter.ai/) para consultar evaluaciones en lenguaje natural.

### Configuración

1. Crea una API key en [openrouter.ai/keys](https://openrouter.ai/keys).
2. **Producción (Render):** añade la variable de entorno:
   ```
   VITE_OPENROUTER_API_KEY=sk-or-v1-...
   ```
   Vite la inyecta en build time; redeploy tras cambiarla.
3. **Demo local / sin redeploy:** en la pestaña **Chat → Ajustes OpenRouter**, pega la key. Se guarda en `localStorage` bajo `openrouter-api-key`.

**No commits API keys reales.** Usa `.env.example` como plantilla.

### Uso del chat

El asistente recibe en el system prompt los 7 proyectos, 27 criterios y puntuaciones actuales desde `localStorage`. Ejemplos:

- «¿Cuál proyecto va mejor?»
- «Resume evaluación de calorías»
- «¿Qué criterios faltan en cuentas-compartidas?»
- «Sugiere mejoras según las puntuaciones»

Modelo por defecto: `deepseek/deepseek-v4-flash` (económico y rápido).

## Instalar como PWA en móvil

1. Genera y sirve la app en **HTTPS** (en local: `npm run build && npm run preview`; en producción despliega `dist/`).
2. Abre la URL en el teléfono.
3. **iOS (Safari):** Compartir → **Añadir a pantalla de inicio**.
4. **Android (Chrome):** Menú (⋮) → **Instalar aplicación** o **Añadir a pantalla de inicio**.

## Persistencia (`localStorage`)

El progreso se guarda en el navegador bajo la clave:

`workshop-matrix-checklist`

Estructura:

```json
{
  "checked": { "proyecto-id:criterio-id": true },
  "ratings": { "proyecto-id:criterio-id": "strong" },
  "scores": { "proyecto-id:criterio-id": 4 },
  "notes": {},
  "lastUpdated": "2026-07-10T12:00:00.000Z"
}
```

- `checked` — entregables MVP + requisitos técnicos (17 por proyecto).
- `ratings` — evaluación externa: `strong` (Fuerte), `medium` (Medio), `weak` (Débil).
- `scores` — puntuación numérica 1–5 por criterio (override o entregables).

API key OpenRouter (fallback): `openrouter-api-key`.

Borrar datos del sitio o usar otro dispositivo/navegador **no sincroniza** entre equipos.

## Sin autenticación ni backend propio

No hay login ni base de datos. Los proyectos y ratings base vienen del **seed** en código (`workshopProjects.seed.ts`). La app es 100 % cliente salvo las llamadas al chat vía OpenRouter.

## Repositorio

Código fuente en **[check-ia](https://github.com/OscarRubioSevilla/check-ia)** (`OscarRubioSevilla/check-ia`). Proyecto standalone: no depende del monorepo lsm-platform.
