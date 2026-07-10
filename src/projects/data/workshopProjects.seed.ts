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
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Buen candidato para BRD corto: actores, flujos y entidades bien delimitadas.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'green',
        hint: 'Ítems, ubicaciones y movimientos de stock son entidades directas y documentables.',
      },
      'frontend-funcional': {
        baselineRating: 'green',
        hint: 'Escáner QR y listado de inventario son pantallas concretas para el MVP.',
      },
      'backend-api': {
        baselineRating: 'yellow',
        hint: 'API REST de inventario es viable; la sincronización multiusuario puede quedar ligera.',
      },
      persistencia: {
        baselineRating: 'green',
        hint: 'Base de datos de ítems y existencias es el núcleo natural del producto.',
      },
      'crud-entidad': {
        baselineRating: 'green',
        hint: 'Alta, baja y consulta de ítems encajan bien con el ejercicio.',
      },
      validaciones: {
        baselineRating: 'yellow',
        hint: 'Cantidades, códigos QR duplicados y campos obligatorios requieren reglas claras.',
      },
      'manejo-errores': {
        baselineRating: 'yellow',
        hint: 'Errores de escaneo y stock negativo deben mostrarse sin romper el flujo móvil.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Roles de oficina son simples; conviene acotar quién edita inventario.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Uso móvil para escanear QR es natural y priorizable.',
      },
      'control-versiones': {
        baselineRating: 'green',
        hint: 'Proyecto acotado facilita commits pequeños por feature (escáner, CRUD, reportes).',
      },
      'api-externa': {
        baselineRating: 'red',
        hint: 'No hay integración externa obligatoria; el QR puede ser autogenerado.',
      },
      'llm-funcional': {
        baselineRating: 'red',
        hint: 'El LLM sería adorno: resúmenes de stock no justifican el núcleo del producto.',
      },
      'ia-en-proceso': {
        baselineRating: 'yellow',
        hint: 'IA podría sugerir reabastecimiento, pero no es crítica para el MVP.',
      },
      'capacidad-analisis': {
        baselineRating: 'yellow',
        hint: 'El problema es entendible, pero el valor de negocio queda limitado al contexto interno.',
      },
      'calidad-documentacion': {
        baselineRating: 'green',
        hint: 'Flujos de escaneo y entidades de inventario se plasman bien en Forge.',
      },
      'diseno-solucion': {
        baselineRating: 'yellow',
        hint: 'Arquitectura simple; conviene explicitar capas cliente/servidor desde el BRD.',
      },
      'calidad-codigo': {
        baselineRating: 'yellow',
        hint: 'Alcance moderado permite código limpio si se evita sobreingeniería de sync.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'yellow',
        hint: 'IA ayuda en documentación y scaffolding, pero el producto no la necesita en runtime.',
      },
      'integracion-api': {
        baselineRating: 'red',
        hint: 'Sin API externa con valor demostrable en el núcleo del inventario.',
      },
      'integracion-llm': {
        baselineRating: 'red',
        hint: 'Cualquier uso de LLM sería cosmético frente al flujo principal de QR + stock.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'Auth básica y permisos por rol bastan; no hay datos altamente sensibles.',
      },
      'creatividad-innovacion': {
        baselineRating: 'yellow',
        hint: 'QR en inventario es práctico pero poco diferenciador frente a otras ideas del taller.',
      },
      'presentacion-final': {
        baselineRating: 'yellow',
        hint: 'Demo de escaneo en vivo es convincente si se muestra el flujo completo de stock.',
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
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Forge captura bien amenazas, roles y flujos de confianza del sistema.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'green',
        hint: 'Grupos, miembros, cuentas compartidas y eventos de acceso modelan el dominio con claridad.',
      },
      'frontend-funcional': {
        baselineRating: 'green',
        hint: 'Onboarding por QR, panel de grupo y gestión de invitaciones son pantallas centrales.',
      },
      'backend-api': {
        baselineRating: 'green',
        hint: 'Auth, invitaciones, vault y auditoría exigen API propia bien definida.',
      },
      persistencia: {
        baselineRating: 'green',
        hint: 'Secretos cifrados, membresías y logs de acceso requieren persistencia robusta.',
      },
      'crud-entidad': {
        baselineRating: 'green',
        hint: 'Grupos, miembros, cuentas compartidas y eventos de acceso son CRUD rico.',
      },
      validaciones: {
        baselineRating: 'green',
        hint: 'Expiración de invitaciones, límites de miembros y políticas de uso necesitan validación doble.',
      },
      'manejo-errores': {
        baselineRating: 'green',
        hint: 'Fallos de acceso, QR expirado y credenciales inválidas deben guiar al usuario con claridad.',
      },
      seguridad: {
        baselineRating: 'green',
        hint: 'Tema central: permisos, rotación, expiración y trazabilidad de accesos.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Invitación y escaneo QR deben funcionar primero en móvil.',
      },
      'control-versiones': {
        baselineRating: 'green',
        hint: 'Features de auth, QR y vault permiten commits incrementales y revisables.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Opcional integrar proveedor OAuth; el MVP puede simular la cuenta.',
      },
      'llm-funcional': {
        baselineRating: 'green',
        hint: 'El LLM explica reglas, redacta políticas y guía el alta segura por QR.',
      },
      'ia-en-proceso': {
        baselineRating: 'green',
        hint: 'IA asiste en onboarding, detección de riesgos y respuestas de soporte.',
      },
      'capacidad-analisis': {
        baselineRating: 'green',
        hint: 'El equipo debe analizar amenazas, confianza y fricción del reparto de cuentas.',
      },
      'calidad-documentacion': {
        baselineRating: 'green',
        hint: 'Modelo de amenazas y flujos de invitación se documentan con rigor en Forge.',
      },
      'diseno-solucion': {
        baselineRating: 'green',
        hint: 'Separar vault, invitaciones y auditoría demuestra diseño maduro.',
      },
      'calidad-codigo': {
        baselineRating: 'green',
        hint: 'Dominio rico pero acotado si se prioriza un vertical (ej. streaming).',
      },
      'uso-ia-herramientas': {
        baselineRating: 'green',
        hint: 'IA acelera políticas, copy de onboarding y revisión de amenazas en documentación.',
      },
      'integracion-api': {
        baselineRating: 'yellow',
        hint: 'OAuth externo suma valor; el MVP puede demostrar el flujo sin proveedor real.',
      },
      'integracion-llm': {
        baselineRating: 'green',
        hint: 'LLM estructura el onboarding y traduce políticas a lenguaje claro para el usuario.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'green',
        hint: 'Cifrado, expiración y auditoría son el diferenciador frente a otras ideas.',
      },
      'creatividad-innovacion': {
        baselineRating: 'green',
        hint: 'Combinar QR + vault + LLM para confianza grupal es una propuesta distintiva.',
      },
      'presentacion-final': {
        baselineRating: 'green',
        hint: 'Demo de invitación segura y políticas generadas por IA es muy demostrable.',
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
      'documentacion-forge': {
        baselineRating: 'red',
        hint: 'Difícil justificar BRD/Forge con historias de usuario de negocio sólidas.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'red',
        hint: 'Puntajes y sesiones son un modelo mínimo que no evalúa dominio de negocio.',
      },
      'frontend-funcional': {
        baselineRating: 'yellow',
        hint: 'El juego puede verse bien, pero no demuestra formularios ni flujos de producto.',
      },
      'backend-api': {
        baselineRating: 'red',
        hint: 'Puede quedar solo frontend; backend y API son accesorios difíciles de justificar.',
      },
      persistencia: {
        baselineRating: 'red',
        hint: 'Leaderboard local o simple no ejercita persistencia significativa del taller.',
      },
      'crud-entidad': {
        baselineRating: 'red',
        hint: 'Tabla de puntajes es CRUD mínimo, insuficiente para evaluar el sprint.',
      },
      validaciones: {
        baselineRating: 'red',
        hint: 'Pocas validaciones de negocio; el foco está en física y render, no en datos.',
      },
      'manejo-errores': {
        baselineRating: 'yellow',
        hint: 'Errores de carga de assets importan, pero no alinean con criterios del workshop.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Anti-trampa en leaderboard importa poco frente a otros proyectos.',
      },
      responsive: {
        baselineRating: 'yellow',
        hint: 'Controles táctiles son viables, pero no es el foco pedagógico del taller.',
      },
      'control-versiones': {
        baselineRating: 'yellow',
        hint: 'Iteraciones de gameplay pueden generar commits, pero poco alineados a entregables.',
      },
      'api-externa': {
        baselineRating: 'red',
        hint: 'Sin necesidad real de APIs externas en el núcleo del juego.',
      },
      'llm-funcional': {
        baselineRating: 'red',
        hint: 'Diálogos o power-ups con IA se sienten forzados y no estructuran el producto.',
      },
      'ia-en-proceso': {
        baselineRating: 'red',
        hint: 'La IA no mejora el proceso de desarrollo ni el valor entregado al usuario.',
      },
      'capacidad-analisis': {
        baselineRating: 'red',
        hint: 'No obliga a analizar problema, actores ni restricciones de negocio.',
      },
      'calidad-documentacion': {
        baselineRating: 'red',
        hint: 'Documentación Forge quedaría vacía de requisitos de negocio relevantes.',
      },
      'diseno-solucion': {
        baselineRating: 'red',
        hint: 'Diseño orientado a game loop, no a solución full-stack con IA.',
      },
      'calidad-codigo': {
        baselineRating: 'yellow',
        hint: 'Puede haber buen código de juego, pero no demuestra patrones del taller.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'red',
        hint: 'Poca oportunidad de usar IA de forma significativa en producto o proceso.',
      },
      'integracion-api': {
        baselineRating: 'red',
        hint: 'Sin integración externa con valor demostrable.',
      },
      'integracion-llm': {
        baselineRating: 'red',
        hint: 'LLM no encaja de forma natural en la mecánica central del juego.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'Requisitos de seguridad son marginales frente al resto de proyectos.',
      },
      'creatividad-innovacion': {
        baselineRating: 'yellow',
        hint: 'Creativo como juego, pero poco innovador respecto a los objetivos del workshop.',
      },
      'presentacion-final': {
        baselineRating: 'yellow',
        hint: 'Demo entretenida, pero difícil de defender ante la rúbrica oficial.',
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
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Historias de usuario y reglas de planificación se documentan bien en Forge.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'green',
        hint: 'Materias, bloques de estudio, tareas y métricas modelan el dominio pedagógico.',
      },
      'frontend-funcional': {
        baselineRating: 'green',
        hint: 'Calendario de estudio, tareas y panel de progreso son pantallas centrales.',
      },
      'backend-api': {
        baselineRating: 'green',
        hint: 'Panel web, API de planes y notificaciones cubren el stack esperado.',
      },
      persistencia: {
        baselineRating: 'green',
        hint: 'Planes, sesiones y progreso requieren historial persistente por usuario.',
      },
      'crud-entidad': {
        baselineRating: 'green',
        hint: 'Materias, bloques de estudio, tareas y métricas ofrecen CRUD suficiente.',
      },
      validaciones: {
        baselineRating: 'green',
        hint: 'Carga horaria, solapamiento de bloques y metas deben validarse en ambas capas.',
      },
      'manejo-errores': {
        baselineRating: 'green',
        hint: 'Fallos de replanificación o sync deben comunicarse sin perder el plan del alumno.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Datos académicos requieren auth básica y aislamiento por usuario.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Consulta diaria del plan desde el móvil es el caso de uso principal.',
      },
      'control-versiones': {
        baselineRating: 'green',
        hint: 'Módulos de plan, tareas y asistente IA permiten entregas incrementales claras.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Calendario o LMS externo enriquece, pero no es obligatorio para el MVP.',
      },
      'llm-funcional': {
        baselineRating: 'green',
        hint: 'La IA genera y adapta planes según carga, exámenes y retroalimentación.',
      },
      'ia-en-proceso': {
        baselineRating: 'green',
        hint: 'IA propone replanificación y detecta sobrecarga antes de abandonar.',
      },
      'capacidad-analisis': {
        baselineRating: 'green',
        hint: 'Requiere analizar hábitos de estudio, restricciones y señales de abandono.',
      },
      'calidad-documentacion': {
        baselineRating: 'green',
        hint: 'Reglas de planificación y actores (alumno, tutor) se plasman bien en Forge.',
      },
      'diseno-solucion': {
        baselineRating: 'green',
        hint: 'Motor de reglas + asistente IA demuestra diseño modular y escalable.',
      },
      'calidad-codigo': {
        baselineRating: 'green',
        hint: 'Dominio pedagógico rico con fronteras claras entre planificación e IA.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'green',
        hint: 'IA acelera historias de usuario, reglas de replanificación y copy pedagógico.',
      },
      'integracion-api': {
        baselineRating: 'yellow',
        hint: 'Calendario externo suma valor; el MVP puede operar con datos propios.',
      },
      'integracion-llm': {
        baselineRating: 'green',
        hint: 'LLM personaliza planes y explica ajustes en lenguaje natural al estudiante.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'Auth por usuario y aislamiento de datos académicos son suficientes en MVP.',
      },
      'creatividad-innovacion': {
        baselineRating: 'green',
        hint: 'Copiloto pedagógico que replanifica por señales reales es una propuesta sólida.',
      },
      'presentacion-final': {
        baselineRating: 'green',
        hint: 'Demo de plan adaptativo por IA es clara y alineada con la rúbrica.',
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
      'documentacion-forge': {
        baselineRating: 'green',
        hint: 'Métricas, actores y flujos de registro se plasman con claridad en Forge.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'green',
        hint: 'Comidas, porciones, metas y perfil nutricional forman un modelo rico y evaluable.',
      },
      'frontend-funcional': {
        baselineRating: 'green',
        hint: 'Captura rápida, diario y resumen diario son flujos claros para el usuario.',
      },
      'backend-api': {
        baselineRating: 'green',
        hint: 'App móvil, API, base de alimentos y panel de progreso completan el stack.',
      },
      persistencia: {
        baselineRating: 'green',
        hint: 'Historial de comidas y metas exige persistencia con consultas por fecha.',
      },
      'crud-entidad': {
        baselineRating: 'green',
        hint: 'Comidas, porciones, metas y historial diario son CRUD rico y evaluable.',
      },
      validaciones: {
        baselineRating: 'green',
        hint: 'Porciones, fechas y metas calóricas necesitan validación consistente.',
      },
      'manejo-errores': {
        baselineRating: 'green',
        hint: 'Fallos de visión o LLM deben ofrecer corrección manual sin perder el registro.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Datos de salud exigen privacidad; MVP puede empezar con auth y cifrado básico.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Captura rápida desde el teléfono en la mesa es el flujo crítico.',
      },
      'control-versiones': {
        baselineRating: 'green',
        hint: 'Features de captura, diario y estimación permiten commits temáticos claros.',
      },
      'api-externa': {
        baselineRating: 'green',
        hint: 'Base nutricional o visión por API externa aporta valor real al producto.',
      },
      'llm-funcional': {
        baselineRating: 'green',
        hint: 'El LLM interpreta descripciones, corrige porciones y explica recomendaciones.',
      },
      'ia-en-proceso': {
        baselineRating: 'green',
        hint: 'IA acelera registro, clasifica alimentos y sugiere ajustes sin fricción.',
      },
      'capacidad-analisis': {
        baselineRating: 'green',
        hint: 'Obliga a analizar fricción de registro, precisión y hábitos del usuario.',
      },
      'calidad-documentacion': {
        baselineRating: 'green',
        hint: 'Flujos multimodales y métricas de salud se documentan con detalle en Forge.',
      },
      'diseno-solucion': {
        baselineRating: 'green',
        hint: 'Pipeline de ingesta → normalización → diario demuestra diseño maduro.',
      },
      'calidad-codigo': {
        baselineRating: 'green',
        hint: 'Dominio claro con integraciones reales que ejercitan buenas prácticas.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'green',
        hint: 'IA en documentación, clasificación y estimación es central en producto y proceso.',
      },
      'integracion-api': {
        baselineRating: 'green',
        hint: 'API nutricional o de visión aporta datos reales al núcleo del producto.',
      },
      'integracion-llm': {
        baselineRating: 'green',
        hint: 'LLM interpreta comidas en lenguaje natural y explica el impacto calórico.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'Datos de salud requieren cuidado; MVP puede demostrar auth y privacidad básica.',
      },
      'creatividad-innovacion': {
        baselineRating: 'green',
        hint: 'Registro multimodal con IA es innovador y útil en la vida diaria.',
      },
      'presentacion-final': {
        baselineRating: 'green',
        hint: 'Demo de foto → calorías en vivo es muy convincente para evaluadores.',
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
      'documentacion-forge': {
        baselineRating: 'yellow',
        hint: 'Forge funciona si se fijan límites de integraciones y actores desde el inicio.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'green',
        hint: 'Viajes, etapas, reservas y preferencias forman un modelo sólido y extensible.',
      },
      'frontend-funcional': {
        baselineRating: 'green',
        hint: 'Itinerario visual, preferencias y timeline del viaje son pantallas naturales.',
      },
      'backend-api': {
        baselineRating: 'green',
        hint: 'Planner web, API de itinerarios y persistencia de preferencias cubren el stack.',
      },
      persistencia: {
        baselineRating: 'green',
        hint: 'Itinerarios y preferencias del viajero requieren guardado y versionado.',
      },
      'crud-entidad': {
        baselineRating: 'green',
        hint: 'Viajes, etapas, reservas y notas son entidades CRUD sólidas.',
      },
      validaciones: {
        baselineRating: 'yellow',
        hint: 'Fechas, traslapes y presupuesto deben validarse para evitar itinerarios inviables.',
      },
      'manejo-errores': {
        baselineRating: 'yellow',
        hint: 'Fallos de APIs de mapas o vuelos deben degradar con gracia al plan manual.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Reservas y pagos futuros elevan exigencias; MVP puede omitir checkout.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Consultar el plan en ruta desde móvil es caso de uso natural.',
      },
      'control-versiones': {
        baselineRating: 'green',
        hint: 'Módulos de itinerario, integraciones y LLM permiten commits por etapa.',
      },
      'api-externa': {
        baselineRating: 'green',
        hint: 'Mapas, clima o vuelos aportan diferenciación real si se acotan a un proveedor.',
      },
      'llm-funcional': {
        baselineRating: 'green',
        hint: 'La IA propone rutas, optimiza tiempos y redacta el itinerario en lenguaje natural.',
      },
      'ia-en-proceso': {
        baselineRating: 'green',
        hint: 'IA negocia trade-offs de tiempo, presupuesto y preferencias del viajero.',
      },
      'capacidad-analisis': {
        baselineRating: 'green',
        hint: 'Requiere analizar restricciones de tiempo, presupuesto y preferencias del viajero.',
      },
      'calidad-documentacion': {
        baselineRating: 'yellow',
        hint: 'Documentación sólida si se acotan integraciones y actores desde el BRD.',
      },
      'diseno-solucion': {
        baselineRating: 'yellow',
        hint: 'Buen diseño posible, pero el riesgo de sobredimensionar integraciones es alto.',
      },
      'calidad-codigo': {
        baselineRating: 'yellow',
        hint: 'Orquestación de APIs exige disciplina para no acumular deuda técnica.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'green',
        hint: 'IA ayuda en documentación, optimización de rutas y redacción de itinerarios.',
      },
      'integracion-api': {
        baselineRating: 'green',
        hint: 'Mapas, clima o vuelos aportan datos reales si se limita a un proveedor.',
      },
      'integracion-llm': {
        baselineRating: 'green',
        hint: 'LLM redacta y ajusta itinerarios según preferencias en lenguaje natural.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'MVP sin pagos reduce riesgo; conviene aislar datos de reservas futuras.',
      },
      'creatividad-innovacion': {
        baselineRating: 'green',
        hint: 'Planner conversacional con datos reales es atractivo y diferenciador.',
      },
      'presentacion-final': {
        baselineRating: 'green',
        hint: 'Demo de itinerario generado por IA con mapa es visualmente fuerte.',
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
      'documentacion-forge': {
        baselineRating: 'red',
        hint: 'Forge requiere problema y MVP definidos; hoy el BRD quedaría incompleto.',
      },
      'problema-objetivo': {
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
      'modelo-datos': {
        baselineRating: 'yellow',
        hint: 'Hábitos, hitos y check-ins aparecen tras acotar la meta principal.',
      },
      'frontend-funcional': {
        baselineRating: 'yellow',
        hint: 'UI de seguimiento es clara, pero depende de definir la vertical elegida.',
      },
      'backend-api': {
        baselineRating: 'yellow',
        hint: 'Depende del dominio elegido; hoy el stack no está completamente justificado.',
      },
      persistencia: {
        baselineRating: 'yellow',
        hint: 'Historial de hábitos requiere persistencia, pero el modelo aún no está fijado.',
      },
      'crud-entidad': {
        baselineRating: 'yellow',
        hint: 'Hábitos, hitos y check-ins aparecen tras acotar la meta principal.',
      },
      validaciones: {
        baselineRating: 'yellow',
        hint: 'Reglas de progreso dependen de la meta elegida; hoy son hipotéticas.',
      },
      'manejo-errores': {
        baselineRating: 'yellow',
        hint: 'Flujos de coach IA deben manejar metas ambiguas o incompletas del usuario.',
      },
      seguridad: {
        baselineRating: 'yellow',
        hint: 'Requisitos varían según datos sensibles de la meta elegida.',
      },
      responsive: {
        baselineRating: 'green',
        hint: 'Seguimiento diario desde móvil encaja con cualquier meta personal.',
      },
      'control-versiones': {
        baselineRating: 'yellow',
        hint: 'Sin MVP acotado, los commits pueden dispersarse en exploración.',
      },
      'api-externa': {
        baselineRating: 'yellow',
        hint: 'Integraciones útiles surgen después de elegir vertical (finanzas, salud, etc.).',
      },
      'llm-funcional': {
        baselineRating: 'yellow',
        hint: 'Coach IA ayuda, pero primero hay que fijar qué meta se persigue y cómo.',
      },
      'ia-en-proceso': {
        baselineRating: 'yellow',
        hint: 'IA puede dividir metas en pasos, pero necesita contexto de dominio acotado.',
      },
      'capacidad-analisis': {
        baselineRating: 'yellow',
        hint: 'Potencial alto si se elige una meta concreta; hoy el análisis está incompleto.',
      },
      'calidad-documentacion': {
        baselineRating: 'red',
        hint: 'Sin vertical definida, la documentación Forge queda fragmentada.',
      },
      'diseno-solucion': {
        baselineRating: 'yellow',
        hint: 'Tracker + coach es viable, pero el diseño depende de acotar el dominio.',
      },
      'calidad-codigo': {
        baselineRating: 'yellow',
        hint: 'Riesgo de reescrituras si se cambia la meta a mitad del sprint.',
      },
      'uso-ia-herramientas': {
        baselineRating: 'yellow',
        hint: 'IA puede ayudar a definir pasos, pero necesita una meta ejemplo clara.',
      },
      'integracion-api': {
        baselineRating: 'yellow',
        hint: 'APIs útiles dependen del vertical; sin elección, la integración es especulativa.',
      },
      'integracion-llm': {
        baselineRating: 'yellow',
        hint: 'Coach IA es prometedor una vez fijada la meta y las métricas de progreso.',
      },
      'seguridad-buenas-practicas': {
        baselineRating: 'yellow',
        hint: 'Requisitos varían; conviene elegir un vertical con datos no sensibles para el MVP.',
      },
      'creatividad-innovacion': {
        baselineRating: 'yellow',
        hint: 'Idea flexible e innovadora, pero necesita un ejemplo concreto para brillar.',
      },
      'presentacion-final': {
        baselineRating: 'yellow',
        hint: 'Demo convincente solo si se compromete una meta específica antes del taller.',
      },
    }),
  },
]
