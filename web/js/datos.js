/* =====================================================================
   DATOS DEL SITIO — Brigadas I.E. John F. Kennedy
   ---------------------------------------------------------------------
   Toda la información que muestra la página sale de este archivo.
   Para actualizar la web (marcar actividades ejecutadas, registrar
   asistentes, agregar fotos o hallazgos) solo hay que editar aquí.
   ===================================================================== */

const SITIO = {
  institucion: "Institución Educativa John F. Kennedy",
  ciudad: "Puerto Boyacá, Boyacá",
  anioCronograma: 2027,
  autoras: ["Isabella Panchano Calderón", "Yesly Gisella Acosta García"],
  grado: "Grado Undécimo B",
  docente: "Profesora Dioselina Mena",
  lineaEmergencias: "123",
};

/* ---------------------------------------------------------------------
   BRIGADAS
   Integrantes transcritos del organigrama 2026 – Jornada B – Bachiller.
   ⚠ VERIFICAR con la institución: el organigrama original tiene nombres
   con posibles errores de escritura y algunos repetidos.
   --------------------------------------------------------------------- */
const BRIGADAS = [
  {
    id: "primeros-auxilios",
    nombre: "Primeros auxilios",
    color: "rojo",
    icono: "cruz",
    descripcion:
      "Grupo organizado, capacitado y equipado para brindar atención inmediata, básica y provisional a heridos o enfermos durante una emergencia, antes de que lleguen los servicios médicos profesionales.",
    funciones: [
      "Brindar primeros auxilios básicos dentro de su nivel de capacitación.",
      "Identificar personas lesionadas o que requieran atención inmediata.",
      "Activar los servicios de emergencia y solicitar apoyo médico.",
      "Inspeccionar y mantener el botiquín y los elementos de primeros auxilios en buen estado y vigentes.",
      "Apoyar la atención inicial y entregar información a los organismos de socorro.",
    ],
    docentes: [
      "Jimmy Alexander Bohórquez Cruz",
      "Leidy Lorena González Arenas",
      "Jenniffer Jiménez Orozco",
      "Zicney Sharink Alarcón",
    ],
    estudiantes: [
      { nombre: "Johan Esteban Vélez Vergara", grado: "10B" },
      { nombre: "Johan Daniela Gutiérrez Zuluaga", grado: "10A" },
    ],
  },
  {
    id: "evacuacion",
    nombre: "Evacuación, búsqueda y rescate",
    color: "verde",
    icono: "salida",
    descripcion:
      "Grupo interno de personas capacitadas y organizadas para salvaguardar la vida y los bienes durante una emergencia, como sismos, incendios o fugas.",
    funciones: [
      "Identificar y señalizar rutas de evacuación, salidas de emergencia y puntos de encuentro.",
      "Orientar la evacuación de la comunidad educativa.",
      "Realizar la búsqueda y rescate de personas en zonas seguras.",
      "Apoyar la atención de personas que requieran ayuda.",
      "Participar en simulacros y actividades de preparación.",
    ],
    docentes: [
      "Darwin Esteban Rodríguez Rojas",
      "Angelo Fernando Ramírez Piracoa",
      "Johan Saii Tiames Piracoa",
      "Johan Smith Piracoa",
    ],
    estudiantes: [
      { nombre: "Jefferson Urrutia", grado: "" },
      { nombre: "Henry Alejandro Guatame Torres", grado: "" },
      { nombre: "Yeison Joaquín García Mosso", grado: "" },
      { nombre: "Jossie Esteban Jinco Deneses", grado: "" },
    ],
  },
  {
    id: "incendios",
    nombre: "Prevención y lucha contra incendios",
    color: "naranja",
    icono: "llama",
    descripcion:
      "Grupo organizado, capacitado y equipado para actuar como primera línea de defensa ante el fuego. Inspecciona las instalaciones, verifica redes eléctricas y de gas, y vigila que los materiales inflamables estén bien almacenados.",
    funciones: [
      "Identificar riesgos de incendio y reportar condiciones inseguras.",
      "Verificar que los extintores y equipos contra incendios estén accesibles y señalizados.",
      "Promover el uso seguro de las instalaciones eléctricas y los equipos.",
      "Informar sobre fugas de gas, humo, cortocircuitos u otras situaciones peligrosas.",
      "Usar extintores solo si cuenta con capacitación y existe una ruta de escape segura.",
    ],
    docentes: ["Zicney Sharink Alarcón"],
    estudiantes: [
      { nombre: "Emanuel Arenas Perdomo", grado: "10B" },
      { nombre: "Samuel Santiago Bohórquez Vega", grado: "11A" },
      { nombre: "San Sebastián Congo Batancur", grado: "10B" },
      { nombre: "Julián Antonio Grag Batanur", grado: "11B" },
    ],
  },
  {
    id: "comunicaciones",
    nombre: "Comunicación y alerta",
    color: "azul",
    icono: "megafono",
    descripcion:
      "Equipo organizado y capacitado encargado de gestionar la información antes, durante y después de una emergencia, con enlace interno (personal y brigadas) y externo (organismos de socorro y autoridades).",
    funciones: [
      "Comunicar oportunamente las alertas e instrucciones de emergencia.",
      "Conocer los mecanismos de alarma y los canales de comunicación institucional.",
      "Informar a los responsables de la emergencia sobre novedades identificadas.",
      "Apoyar la comunicación con los organismos de socorro.",
      "Evitar la difusión de información no confirmada que pueda generar pánico.",
    ],
    docentes: ["Nicol Dayana Gómez Poda", "Diana Patricia Otálora Melo"],
    estudiantes: [{ nombre: "Nicol Dayana Gómez Prola", grado: "10A" }],
  },
  {
    id: "movilidad",
    nombre: "Movilidad",
    color: "morado",
    icono: "cono",
    descripcion:
      "Brigada escolar de tránsito y seguridad vial: estudiantes, docentes y padres de familia que promueven una cultura de prevención, orden y seguridad en los entornos escolares.",
    funciones: [
      "Orientar el tránsito de estudiantes, docentes y visitantes.",
      "Apoyar la evacuación en zonas de acceso y salida.",
      "Controlar el cruce seguro de vías internas y externas.",
      "Coordinar con las autoridades de tránsito cuando sea necesario.",
      "Mantener despejadas las vías de acceso para los organismos de socorro.",
    ],
    docentes: [
      "Freddy Alveiro Ramírez",
      "Sulma Cuartas (Preescolar)",
      "Yolima Castillo González (Preescolar)",
      "Mónica Torres (Psicorientación)",
    ],
    estudiantes: [
      { nombre: "Luis Fernando Rodríguez Voltaira", grado: "11A" },
      { nombre: "Johan Estiven Díaz Marín", grado: "11B" },
    ],
  },
];

const PUNTO_ENCUENTRO = ["Maribel Moreno Zapata", "María Johana Mendoza Machado"];
let COORDINADORA = "Dioselina Mena Moreno";

const RESPONSABILIDADES = [
  "Participar en las actividades de capacitación.",
  "Conocer sus funciones y responsabilidades.",
  "Mantener una actitud preventiva.",
  "Reportar oportunamente cualquier condición insegura.",
  "Participar en los simulacros institucionales.",
  "Conocer los procedimientos de actuación en caso de emergencia.",
  "Evitar acciones que pongan en riesgo su integridad o la de otras personas.",
];

const COMO_ACTUAR = [
  { titulo: "Mantén la calma", texto: "Evita generar pánico a tu alrededor." },
  { titulo: "Informa", texto: "Avisa de inmediato a un docente o al personal responsable." },
  { titulo: "Sigue instrucciones", texto: "Atiende a los coordinadores y brigadistas." },
  { titulo: "Evacúa por la ruta", texto: "Usa las rutas establecidas cuando se indique." },
  { titulo: "Sin correr", texto: "No corras, no empujes y no regreses por objetos personales." },
  { titulo: "Punto de encuentro", texto: "Dirígete al punto de encuentro establecido." },
  { titulo: "Espera autorización", texto: "No regreses a las instalaciones hasta que te lo indiquen." },
];

/* ---------------------------------------------------------------------
   CRONOGRAMA DE ACTIVIDADES 2027
   meses: 1 = enero ... 12 = diciembre
   planeado: meses en que está programada la actividad
   ejecutado: agregar aquí los meses en que SÍ se realizó (con evidencia)
   --------------------------------------------------------------------- */
const ACTIVIDADES = [
  { n: 1, actividad: "Revisión y actualización del listado de brigadistas, roles y responsabilidades.", planeado: [1], ejecutado: [] },
  { n: 2, actividad: "Inspección general de extintores, botiquines, camillas, señalización, rutas de evacuación y DEA.", planeado: [3, 6, 9, 12], ejecutado: [] },
  { n: 3, actividad: "Verificación de rutas de evacuación, salidas de emergencia y puntos de encuentro.", planeado: [6, 12], ejecutado: [] },
  { n: 4, actividad: "Socialización del plan de prevención, preparación y respuesta ante emergencias.", planeado: [3, 10], ejecutado: [] },
  { n: 5, actividad: "Identificación de condiciones inseguras y actos que puedan generar emergencias.", planeado: [2, 5, 8, 11], ejecutado: [] },
  { n: 6, actividad: "Verificación de sistemas de alarma, comunicación y señalización.", planeado: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ejecutado: [] },
  { n: 7, actividad: "Revisión y actualización de directorios telefónicos y cadena de llamadas.", planeado: [5, 11], ejecutado: [] },
  { n: 8, actividad: "Evaluación del cumplimiento de las actividades del semestre.", planeado: [6, 12], ejecutado: [] },
  { n: 9, actividad: "Inspección de rutas de evacuación, zonas seguras y puntos de encuentro.", planeado: [3, 7, 11], ejecutado: [] },
  { n: 10, actividad: "Elaboración del informe de cumplimiento y programación del siguiente año.", planeado: [12], ejecutado: [] },
  { n: 11, actividad: "Participación en simulacros de emergencia.", planeado: [6], ejecutado: [] },
];

const PROGRAMA_ACTIVIDADES = {
  objetivo:
    "Fortalecer las capacidades de prevención, preparación y respuesta de las brigadas escolares mediante la planificación, ejecución y seguimiento de actividades que faciliten una actuación oportuna ante emergencias que pongan en riesgo la vida, la integridad física de las personas y las instalaciones de la institución.",
  meta: "Ejecutar al menos el 80 % de las actividades previstas en el cronograma anual.",
  indicador: "(Actividades ejecutadas / Actividades programadas) × 100",
  frecuencia: "Mensual",
  responsables: "Rectoría, docente encargado del proyecto y líderes de las brigadas escolares.",
  planAccion: [
    { fase: "Planificar", texto: "Elaborar el cronograma, definir responsables y establecer fechas." },
    { fase: "Hacer", texto: "Desarrollar capacitaciones, simulacros, inspecciones y actividades de prevención." },
    { fase: "Verificar", texto: "Hacer seguimiento al cumplimiento y revisar los resultados de las inspecciones." },
    { fase: "Actuar", texto: "Establecer acciones correctivas y de mejora frente a los hallazgos." },
  ],
  evidencias:
    "Cronograma, listas de asistencia, registros fotográficos, formatos de inspección, informes de simulacros y registros de seguimiento.",
};

/* ---------------------------------------------------------------------
   CRONOGRAMA DE CAPACITACIONES 2027
   Al ejecutar una capacitación, llenar: ejecutada: true, asistentes,
   programadas, aprobados (personas con nota ≥ 3,0), fechaEjecucion.
   --------------------------------------------------------------------- */
const CAPACITACIONES = [
  { mes: 1, tema: "Funciones, responsabilidades y organización de la brigada de emergencias.", brigada: "todas" },
  { mes: 2, tema: "Plan de emergencias, amenazas, vulnerabilidad y gestión del riesgo.", brigada: "todas" },
  { mes: 3, tema: "Primeros auxilios básicos y valoración inicial del paciente.", brigada: "primeros-auxilios" },
  { mes: 4, tema: "Técnicas de evacuación, rutas, salidas y puntos de encuentro.", brigada: "evacuacion" },
  { mes: 5, tema: "Manejo de comunicaciones, alarmas y activación de emergencias.", brigada: "comunicaciones" },
  { mes: 6, tema: "Prevención y control inicial de incendios. Manejo de extintores.", brigada: "incendios" },
  { mes: 7, tema: "Reanimación cardiopulmonar (RCP) y uso del desfibrilador externo automático (DEA).", brigada: "primeros-auxilios" },
  { mes: 8, tema: "Atención de heridas, hemorragias, quemaduras y lesiones osteomusculares.", brigada: "primeros-auxilios" },
  { mes: 9, tema: "Respuesta ante sismos y otras amenazas identificadas en la institución.", brigada: "evacuacion" },
  { mes: 10, tema: "Simulacro de evacuación y respuesta ante emergencias.", brigada: "todas" },
  { mes: 11, tema: "Manejo de emergencias con población escolar y atención a personas con movilidad reducida.", brigada: "movilidad" },
  { mes: 12, tema: "Evaluación de competencias, retroalimentación y lecciones aprendidas.", brigada: "todas" },
].map((c) => ({
  lugar: "Oficinas",
  ejecutada: false,
  programadas: null,
  asistentes: null,
  aprobados: null,
  fechaEjecucion: null,
  ...c,
}));

const PROGRAMA_CAPACITACION = {
  responsable: "Rectoría, con el apoyo del docente encargado y los líderes de las brigadas escolares.",
  objetivo:
    "Diseñar, planificar y desarrollar actividades de capacitación y formación para el personal de la institución y los integrantes de las brigadas escolares, para fortalecer sus conocimientos, habilidades y competencias en la prevención, preparación y respuesta ante emergencias.",
  alcance:
    "Directivos, docentes, personal administrativo y de servicios generales, estudiantes brigadistas y demás partes interesadas en la prevención y atención de emergencias.",
  metas: [
    { valor: "80 %", texto: "de las capacitaciones programadas, cumplidas." },
    { valor: "3,0 / 5,0", texto: "de calificación promedio mínima en las evaluaciones." },
    { valor: "80 %", texto: "de cobertura del personal y participantes previstos." },
  ],
  recursos: [
    { tipo: "Humanos", texto: "Rectoría, docentes, personal de apoyo, capacitadores y organismos de socorro." },
    { tipo: "Económicos", texto: "Presupuesto asignado a capacitación y formación." },
    { tipo: "Tecnológicos", texto: "Computador, videoproyector, internet, plataforma web y material audiovisual." },
    { tipo: "Físicos", texto: "Aulas, espacios de capacitación, elementos de demostración y equipos de emergencia." },
  ],
};

/* ---------------------------------------------------------------------
   DOCUMENTOS DESCARGABLES
   --------------------------------------------------------------------- */
const FORMATOS = [
  { titulo: "Inspección de extintores", desc: "Ubicación, tipo, agente extintor, capacidad, 12 puntos de revisión y fecha de vencimiento.", archivo: "descargas/formatos/inspeccion-extintores.xlsx", tipo: "xlsx", peso: "31 KB", color: "naranja" },
  { titulo: "Inspección de botiquín (áreas fijas)", desc: "22 elementos del botiquín con cantidad, vencimiento y unidades reemplazadas.", archivo: "descargas/formatos/inspeccion-botiquin.xls", tipo: "xls", peso: "472 KB", color: "rojo" },
  { titulo: "Inspección mensual de camilla", desc: "Estado de ubicación, señalización, limpieza, velcros, inmovilizadores y correas.", archivo: "descargas/formatos/inspeccion-camilla.xlsx", tipo: "xlsx", peso: "29 KB", color: "rojo" },
  { titulo: "Inspección de condiciones HSEQ", desc: "Lista de chequeo de 12 categorías, incluida la respuesta ante emergencias.", archivo: "descargas/formatos/inspeccion-condiciones-hseq.xlsx", tipo: "xlsx", peso: "50 KB", color: "verde" },
  { titulo: "Reporte y guion de simulacro", desc: "Planeación del simulacro, tiempos de reacción, lecciones aprendidas y plan de acción.", archivo: "descargas/formatos/registro-simulacro.xls", tipo: "xls", peso: "141 KB", color: "verde" },
  { titulo: "Formato de asistencia", desc: "Registro de charlas, inducciones, capacitaciones y talleres.", archivo: "descargas/formatos/formato-asistencia.docx", tipo: "docx", peso: "48 KB", color: "azul" },
  { titulo: "Constancia de evaluación", desc: "Evaluación de capacitaciones: aprobado desde el 80 %.", archivo: "descargas/formatos/constancia-evaluacion.xlsx", tipo: "xlsx", peso: "39 KB", color: "azul" },
  { titulo: "Registro fotográfico de inspecciones", desc: "Fichas de evidencia: elemento, ubicación, hallazgo y recomendación.", archivo: "descargas/formatos/registro-fotografico.docx", tipo: "docx", peso: "15 KB", color: "morado" },
];

const DOCUMENTOS = {
  cartilla: { archivo: "descargas/cartilla-brigadas.pdf", peso: "192 KB" },
  cronogramaActividades: { archivo: "descargas/cronograma-actividades-2027.xlsx", peso: "49 KB" },
  cronogramaCapacitaciones: { archivo: "descargas/cronograma-capacitaciones-2027.xlsx", peso: "44 KB" },
};

/* ---------------------------------------------------------------------
   GALERÍA DE INSPECCIONES
   Para agregar una foto: guardar la imagen en img/galeria/ y poner la
   ruta en "foto", p. ej. foto: "img/galeria/extintor-bloque-a.jpg"
   --------------------------------------------------------------------- */
const GALERIA = [
  { elemento: "Extintor", ubicacion: "", hallazgo: "", recomendacion: "", foto: null },
  { elemento: "Señalización", ubicacion: "", hallazgo: "", recomendacion: "", foto: null },
  { elemento: "Camillas", ubicacion: "", hallazgo: "", recomendacion: "", foto: null },
  { elemento: "Botiquines", ubicacion: "", hallazgo: "", recomendacion: "", foto: null },
];

/* ---------------------------------------------------------------------
   HALLAZGOS Y ACCIONES DE MEJORA
   Ejemplo de registro:
   { fecha: "2027-03-15", hallazgo: "Extintor del bloque B vencido",
     accion: "Solicitar recarga", responsable: "Brigada de incendios",
     fechaLimite: "2027-03-30", estado: "abierta" }   // o "cerrada"
   --------------------------------------------------------------------- */
const HALLAZGOS = [];

/* Fotografías del antes y después (rutas a imágenes en img/galeria/) */
const ANTES_DESPUES = [];
