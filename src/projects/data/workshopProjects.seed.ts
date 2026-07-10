import type { WorkshopProject } from '../types/project.types'
import { WORKSHOP_CRITERIA_GLOBAL } from './workshopCriteria.global'

function buildCriteria(
  ratings: Record<string, { baselineRating: 'green' | 'yellow' | 'red'; hint: string }>,
) {
  return WORKSHOP_CRITERIA_GLOBAL.map((definition) => {
    const entry = ratings[definition.id]
    return {
      ...definition,
      baselineRating: entry.baselineRating,
      hint: entry.hint,
    }
  })
}

export const WORKSHOP_PROJECTS: WorkshopProject[] = [
  {
    id: 'inventario-qr',
    name: 'Inventario oficina QR',
    emoji: '📦',
    verdict: 'Útil para aprender QR, pero API y LLM quedan débiles.',
    recommended: false,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'yellow',
        hint: 'El dolor de inventario existe, pero el público objetivo es interno y acotado.',
      },
      'alcance-mvp': {
        baselineRating: 'green',
        hint: 'Escanear QR + listar stock es un MVP claro y alcanzable en el taller.',
      },
      arquitectura: {
        baselineRating: 'yellow',
        hint: 'Flujo simple; falta definir si el catálogo vive en cliente o backend.',
      },
      'full-stack': {
        baselineRating: 'yellow',
        hint: 'CRUD básico sí, pero la capa de sincronización multiusuario queda ligera.',
      },
      crud: {
        baselineRating: 'green',
        hint: 'Alta, baja y consulta de ítems encajan bien con el ejercicio.',
      },
      'api-externa': {
        baselineRating: 'red',
        hint: 'No hay integración externa obligatoria; el QR puede ser autogenerado.',
      },
      'llm-central': {
        baselineRating: 'red',
        hint: 'El LLM sería adorno: resúmenes de stock no justifican el núcleo del producto.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Roles de oficina son simples; conviene acotar quién edita inventario.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Uso móvil para escanear QR es natural y priorizable.',
      },
      'ia-proceso': {
        baselineRating: 'yellow',
        hint: 'IA podría sugerir reabastecimiento, pero no es crítica para el MVP.',
      },
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Buen candidato para BRD corto: actores, flujos y entidades bien delimitadas.',
      },
    }),
  },
  {
    id: 'cuentas-compartidas',
    name: 'Cuentas compartidas IA+QR',
    emoji: '🔐',
    verdict: 'Recomendado: LLM fuerte para onboarding y políticas de uso.',
    recommended: true,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'green',
        hint: 'Compartir suscripciones sin fugas de credenciales es un problema real y visible.',
      },
      'alcance-mvp': {
        baselineRating: 'yellow',
        hint: 'Definir un solo tipo de cuenta (ej. streaming) evita sobredimensionar el MVP.',
      },
      arquitectura: {
        baselineRating: 'green',
        hint: 'QR de invitación + vault de secretos + auditoría es una arquitectura coherente.',
      },
      'full-stack': {
        baselineRating: 'green',
        hint: 'Auth, invitaciones, panel admin y app móvil cubren el stack completo.',
      },
      crud: {
        baselineRating: 'green',
        hint: 'Grupos, miembros, cuentas compartidas y eventos de acceso son CRUD rico.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Opcional integrar proveedor OAuth; el MVP puede simular la cuenta.',
      },
      'llm-central': {
        baselineRating: 'green',
        hint: 'El LLM explica reglas, redacta políticas y guía el alta segura por QR.',
      },
      seguridad: {
        baselineRating: 'green',
        hint: 'Tema central: permisos, rotación, expiración y trazabilidad de accesos.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Invitación y escaneo QR deben funcionar primero en móvil.',
      },
      'ia-proceso': {
        baselineRating: 'green',
        hint: 'IA asiste en onboarding, detección de riesgos y respuestas de soporte.',
      },
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Forge captura bien amenazas, roles y flujos de confianza del sistema.',
      },
    }),
  },
  {
    id: 'juego-naves',
    name: 'Juego naves',
    emoji: '🚀',
    verdict: 'No recomendado: poco encaje con la rúbrica del taller.',
    recommended: false,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'red',
        hint: 'Entretenimiento genérico; no demuestra un problema de negocio claro.',
      },
      'alcance-mvp': {
        baselineRating: 'yellow',
        hint: 'Un nivel jugable es acotado, pero la tentación de pulir gameplay crece rápido.',
      },
      arquitectura: {
        baselineRating: 'red',
        hint: 'Loop de juego en canvas no ejercita la arquitectura objetivo del workshop.',
      },
      'full-stack': {
        baselineRating: 'red',
        hint: 'Puede quedar solo frontend; backend y persistencia son accesorios.',
      },
      crud: {
        baselineRating: 'red',
        hint: 'Tabla de puntajes es CRUD mínimo, insuficiente para evaluar el sprint.',
      },
      'api-externa': {
        baselineRating: 'red',
        hint: 'Sin necesidad real de APIs externas en el núcleo del juego.',
      },
      'llm-central': {
        baselineRating: 'red',
        hint: 'Diálogos o power-ups con IA se sienten forzados y no estructuran el producto.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Anti-trampa en leaderboard importa poco frente a otros proyectos.',
      },
      responsive: {
        baselineRating: 'yellow',
        hint: 'Controles táctiles son viables, pero no es el foco pedagógico del taller.',
      },
      'ia-proceso': {
        baselineRating: 'red',
        hint: 'La IA no mejora el proceso de desarrollo ni el valor entregado al usuario.',
      },
      'documentacion-forge': {
        baselineRating: 'red',
        hint: 'Difícil justificar BRD/Forge con historias de usuario de negocio sólidas.',
      },
    }),
  },
  {
    id: 'app-estudio',
    name: 'App estudio plan IA',
    emoji: '📋',
    verdict: 'Recomendado: plan de estudio con IA como copiloto pedagógico.',
    recommended: true,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'green',
        hint: 'Organizar materias y ritmo de estudio es un dolor frecuente en estudiantes.',
      },
      'alcance-mvp': {
        baselineRating: 'green',
        hint: 'Plan semanal + recordatorios + ajuste por progreso define un MVP claro.',
      },
      arquitectura: {
        baselineRating: 'green',
        hint: 'Separar planificador, motor de reglas y asistente IA mantiene el diseño limpio.',
      },
      'full-stack': {
        baselineRating: 'green',
        hint: 'Panel web, API de planes y notificaciones cubren el stack esperado.',
      },
      crud: {
        baselineRating: 'green',
        hint: 'Materias, bloques de estudio, tareas y métricas ofrecen CRUD suficiente.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Calendario o LMS externo enriquece, pero no es obligatorio para el MVP.',
      },
      'llm-central': {
        baselineRating: 'green',
        hint: 'La IA genera y adapta planes según carga, exámenes y retroalimentación.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Datos académicos requieren auth básica y aislamiento por usuario.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Consulta diaria del plan desde el móvil es el caso de uso principal.',
      },
      'ia-proceso': {
        baselineRating: 'green',
        hint: 'IA propone replanificación y detecta sobrecarga antes de abandonar.',
      },
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Historias de usuario y reglas de planificación se documentan bien en Forge.',
      },
    }),
  },
  {
    id: 'calorias',
    name: 'App calorías',
    emoji: '🥗',
    verdict: 'Más fuerte de la matriz: problema claro, LLM útil y MVP realista.',
    recommended: true,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'green',
        hint: 'Registrar comida y entender calorías es un problema masivo y medible.',
      },
      'alcance-mvp': {
        baselineRating: 'green',
        hint: 'Foto o texto → estimación calórica + diario diario es MVP cerrado.',
      },
      arquitectura: {
        baselineRating: 'green',
        hint: 'Ingesta multimodal, normalización nutricional y perfil de usuario encajan bien.',
      },
      'full-stack': {
        baselineRating: 'green',
        hint: 'App móvil, API, base de alimentos y panel de progreso completan el stack.',
      },
      crud: {
        baselineRating: 'green',
        hint: 'Comidas, porciones, metas y historial diario son CRUD rico y evaluable.',
      },
      'api-externa': {
        baselineRating: 'green',
        hint: 'Base nutricional o visión por API externa aporta valor real al producto.',
      },
      'llm-central': {
        baselineRating: 'green',
        hint: 'El LLM interpreta descripciones, corrige porciones y explica recomendaciones.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Datos de salud exigen privacidad; MVP puede empezar con auth y cifrado básico.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Captura rápida desde el teléfono en la mesa es el flujo crítico.',
      },
      'ia-proceso': {
        baselineRating: 'green',
        hint: 'IA acelera registro, clasifica alimentos y sugiere ajustes sin fricción.',
      },
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Métricas, actores y flujos de registro se plasman con claridad en Forge.',
      },
    }),
  },
  {
    id: 'viajes',
    name: 'Planificación viajes',
    emoji: '✈️',
    verdict: 'Competitivo: buen encaje, pero el alcance puede inflarse con integraciones.',
    recommended: false,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'green',
        hint: 'Armar itinerarios consume tiempo; el valor para viajeros es evidente.',
      },
      'alcance-mvp': {
        baselineRating: 'yellow',
        hint: 'Un solo destino + 3 días mantiene el MVP; multi-ciudad lo complica.',
      },
      arquitectura: {
        baselineRating: 'yellow',
        hint: 'Orquestar vuelos, hospedaje y actividades exige límites de módulos claros.',
      },
      'full-stack': {
        baselineRating: 'green',
        hint: 'Planner web, API de itinerarios y persistencia de preferencias cubren el stack.',
      },
      crud: {
        baselineRating: 'green',
        hint: 'Viajes, etapas, reservas y notas son entidades CRUD sólidas.',
      },
      'api-externa': {
        baselineRating: 'green',
        hint: 'Mapas, clima o vuelos aportan diferenciación real si se acotan a un proveedor.',
      },
      'llm-central': {
        baselineRating: 'green',
        hint: 'La IA propone rutas, optimiza tiempos y redacta el itinerario en lenguaje natural.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Reservas y pagos futuros elevan exigencias; MVP puede omitir checkout.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Consultar el plan en ruta desde móvil es caso de uso natural.',
      },
      'ia-proceso': {
        baselineRating: 'green',
        hint: 'IA negocia trade-offs de tiempo, presupuesto y preferencias del viajero.',
      },
      'documentacion-forge': {
        baselineRating: 'yellow',
        hint: 'Forge funciona si se fijan límites de integraciones y actores desde el inicio.',
      },
    }),
  },
  {
    id: 'meta-concreta',
    name: 'Meta concreta',
    emoji: '🎯',
    verdict: 'Idea potente, pero necesita acotar problema y MVP antes de arrancar.',
    recommended: false,
    criteria: buildCriteria({
      'problema-publico': {
        baselineRating: 'yellow',
        hint: 'Metas personales son válidas, pero falta un segmento y dolor específico.',
      },
      'alcance-mvp': {
        baselineRating: 'red',
        hint: 'Sin una meta ejemplo (ahorro, fitness, idioma) el alcance queda difuso.',
      },
      arquitectura: {
        baselineRating: 'yellow',
        hint: 'Tracker + coach IA es viable una vez definida la meta concreta.',
      },
      'full-stack': {
        baselineRating: 'yellow',
        hint: 'Depende del dominio elegido; hoy el stack no está completamente justificado.',
      },
      crud: {
        baselineRating: 'yellow',
        hint: 'Hábitos, hitos y check-ins aparecen tras acotar la meta principal.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Integraciones útiles surgen después de elegir vertical (finanzas, salud, etc.).',
      },
      'llm-central': {
        baselineRating: 'yellow',
        hint: 'Coach IA ayuda, pero primero hay que fijar qué meta se persigue y cómo.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Requisitos varían según datos sensibles de la meta elegida.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Seguimiento diario desde móvil encaja con cualquier meta personal.',
      },
      'ia-proceso': {
        baselineRating: 'yellow',
        hint: 'IA puede dividir metas en pasos, pero necesita contexto de dominio acotado.',
      },
      'documentacion-forge': {
        baselineRating: 'red',
        hint: 'Forge requiere problema y MVP definidos; hoy el BRD quedaría incompleto.',
      },
    }),
  },
]
