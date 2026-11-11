/* =========================================================
   Lectura del contenido desde Google Sheets
   ---------------------------------------------------------
   Si en js/config.js hay una hoja configurada, se leen sus
   pestañas y se reemplaza la información de js/datos.js.
   Si una pestaña no se puede leer, esa sección conserva los
   datos locales (la página nunca queda vacía por un error).
   ========================================================= */

const PESTANAS = ["Brigadistas", "Actividades", "Capacitaciones", "Hallazgos"];

const norm = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const texto = (t) => String(t ?? "").trim();
const numero = (t) => {
  const v = parseFloat(String(t ?? "").replace(",", "."));
  return Number.isFinite(v) ? v : null;
};

function extraerIdHoja(valor) {
  const v = texto(valor);
  if (!v) return "";
  const m = v.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : v;
}

/* CSV → filas (soporta comillas, comas y saltos de línea dentro de celdas) */
function parsearCSV(csv) {
  const filas = [];
  let fila = [], celda = "", comillas = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (comillas) {
      if (c === '"' && csv[i + 1] === '"') { celda += '"'; i++; }
      else if (c === '"') comillas = false;
      else celda += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") { fila.push(celda); celda = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && csv[i + 1] === "\n") i++;
      fila.push(celda); filas.push(fila); fila = []; celda = "";
    } else celda += c;
  }
  if (celda !== "" || fila.length) { fila.push(celda); filas.push(fila); }
  return filas;
}

/* Devuelve una lista de objetos { encabezadoNormalizado: valor } */
async function leerPestana(idHoja, nombre, ms = 9000) {
  const url = `https://docs.google.com/spreadsheets/d/${idHoja}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(nombre)}&_=${Date.now()}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const csv = await r.text();
    if (/^\s*</.test(csv)) throw new Error("La hoja no es pública (compártela como 'Cualquier persona con el enlace')");
    const [cab = [], ...resto] = parsearCSV(csv);
    const claves = cab.map(norm);
    return resto
      .map((f) => Object.fromEntries(claves.map((k, i) => [k, texto(f[i])])))
      .filter((o) => Object.values(o).some((v) => v !== ""));
  } finally {
    clearTimeout(t);
  }
}

function exigir(filas, nombre, campos) {
  // Si la pestaña tiene filas, deben existir las columnas esperadas
  if (filas.length && !campos.every((c) => c in filas[0])) {
    throw new Error(`La pestaña "${nombre}" no tiene las columnas esperadas: ${campos.join(", ")}`);
  }
}

const reemplazar = (arr, nuevos) => arr.splice(0, arr.length, ...nuevos);

const CLAVE_BRIGADA = { "primeros-auxilios": "auxilio", evacuacion: "evacua", incendios: "incendio", comunicaciones: "comunica", movilidad: "movilidad" };
function buscarBrigada(nombre) {
  const n = norm(nombre);
  if (!n) return null;
  return BRIGADAS.find((b) => n === norm(b.nombre) || n.includes(CLAVE_BRIGADA[b.id] || norm(b.nombre))) || null;
}

function enlaceFoto(url) {
  const u = texto(url);
  if (!u) return null;
  const m = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m && /drive\.google\.com|docs\.google\.com/.test(u) ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600` : u;
}

const MESES_N = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function mesNumero(v) {
  const n = numero(v);
  if (n && n >= 1 && n <= 12) return Math.round(n);
  const i = MESES_N.indexOf(norm(v).slice(0, 3));
  return i >= 0 ? i + 1 : null;
}

/* ---------- Aplicar cada pestaña sobre los datos de la página ---------- */
const APLICAR = {
  Brigadistas(filas) {
    exigir(filas, "Brigadistas", ["brigada", "rol", "nombre"]);
    BRIGADAS.forEach((b) => { b.docentes = []; b.estudiantes = []; });
    const punto = [];
    filas.forEach((f) => {
      if (!f.nombre) return;
      const rol = norm(f.rol);
      if (rol.includes("coordin")) { COORDINADORA = f.nombre; return; }
      if (rol.includes("punto")) { punto.push(f.nombre); return; }
      const b = buscarBrigada(f.brigada);
      if (!b) return;
      if (rol.includes("estudiante")) b.estudiantes.push({ nombre: f.nombre, grado: f.grado || "" });
      else b.docentes.push(f.nombre);
    });
    reemplazar(PUNTO_ENCUENTRO, punto);
  },

  Actividades(filas) {
    exigir(filas, "Actividades", ["actividad", "ene"]);
    reemplazar(ACTIVIDADES, filas.filter((f) => f.actividad).map((f, i) => {
      const planeado = [], ejecutado = [];
      MESES_N.forEach((m, j) => {
        const v = norm(f[m]);
        if (v === "p" || v === "e") planeado.push(j + 1);
        if (v === "e") ejecutado.push(j + 1);
      });
      return { n: numero(f.n) || i + 1, actividad: f.actividad, planeado, ejecutado };
    }));
  },

  Capacitaciones(filas) {
    exigir(filas, "Capacitaciones", ["mes", "tema"]);
    reemplazar(CAPACITACIONES, filas.filter((f) => f.tema && mesNumero(f.mes)).map((f) => {
      const b = buscarBrigada(f.brigada);
      return {
        mes: mesNumero(f.mes),
        tema: f.tema,
        brigada: b ? b.id : "todas",
        lugar: f.lugar || "",
        ejecutada: norm(f.estado).startsWith("ejecut"),
        programadas: numero(f.personasprogramadas),
        asistentes: numero(f.asistentes),
        aprobados: numero(f.aprobadosnota30),
        fechaEjecucion: f.fechadeejecucion || null,
      };
    }).sort((a, b) => a.mes - b.mes));
  },

  Galeria(filas) {
    exigir(filas, "Galeria", ["elemento"]);
    reemplazar(GALERIA, filas.filter((f) => f.elemento).map((f) => ({
      elemento: f.elemento,
      ubicacion: f.ubicacion || "",
      hallazgo: f.hallazgo || "",
      recomendacion: f.recomendacion || "",
      foto: enlaceFoto(f.foto || f.fotoenlace || f.subelafoto),
    })));
  },

  Hallazgos(filas) {
    exigir(filas, "Hallazgos", ["hallazgo"]);
    reemplazar(HALLAZGOS, filas.filter((f) => f.hallazgo).map((f) => ({
      fecha: f.fecha || "",
      hallazgo: f.hallazgo,
      accion: f.acciondemejora || "",
      responsable: f.responsable || "",
      fechaLimite: f.fechalimite || "",
      estado: norm(f.estado).startsWith("cerrad") ? "cerrada" : "abierta",
    })));
  },

  AntesDespues(filas) {
    exigir(filas, "AntesDespues", ["foto"]);
    reemplazar(ANTES_DESPUES, filas.filter((f) => f.foto).map((f) => ({ foto: enlaceFoto(f.foto), texto: f.descripcion || "" })));
  },
};

/* Punto de entrada: devuelve de dónde salieron los datos */
async function cargarContenido() {
  const id = extraerIdHoja(typeof CONFIG !== "undefined" ? CONFIG.GOOGLE_SHEET : "");
  if (!id) return { origen: "local" };

  const res = await Promise.allSettled(PESTANAS.map((p) => leerPestana(id, p)));
  const fallos = [];
  res.forEach((r, i) => {
    const nombre = PESTANAS[i];
    try {
      if (r.status === "rejected") throw r.reason;
      APLICAR[nombre](r.value);
    } catch (e) {
      fallos.push(nombre);
      console.warn(`[Google Sheets] No se pudo usar la pestaña "${nombre}":`, e.message || e);
    }
  });
  return { origen: fallos.length === PESTANAS.length ? "local" : "google", fallos, error: fallos.length === PESTANAS.length };
}
