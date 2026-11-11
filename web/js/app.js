/* =========================================================
   Brigadas Escolares · lógica de la página
   Lee los datos de js/datos.js y construye cada sección.
   ========================================================= */
(async function () {
  "use strict";

  // Primero se trae el contenido (Google Sheets si está conectado, si no datos.js)
  const fuente = await cargarContenido();

  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const META = 80;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icono = (id, clase = "") => `<svg class="ico ${clase}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const inicial = (nombre) => nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : null);
  const porId = Object.fromEntries(BRIGADAS.map((b) => [b.id, b]));

  /* --- Fecha de referencia para el cronograma --- */
  const hoy = new Date();
  const anio = SITIO.anioCronograma;
  const mesActual = hoy.getFullYear() === anio ? hoy.getMonth() + 1 : null;
  // Meses ya terminados dentro del año del cronograma (para marcar pendientes vencidas)
  const mesesCerrados = hoy.getFullYear() < anio ? 0 : hoy.getFullYear() > anio ? 12 : hoy.getMonth();

  document.querySelectorAll(".anio").forEach((el) => (el.textContent = anio));

  /* ======================= CIFRAS ======================= */
  const totalBrigadistas = new Set(
    BRIGADAS.flatMap((b) => [...b.docentes, ...b.estudiantes.map((e) => e.nombre)]).concat(PUNTO_ENCUENTRO)
  ).size;
  const totalProgramadas = ACTIVIDADES.reduce((s, a) => s + a.planeado.length, 0);

  $("#cifras").innerHTML = [
    [BRIGADAS.length, "brigadas organizadas"],
    [totalBrigadistas, "integrantes entre docentes y estudiantes"],
    [totalProgramadas, `actividades programadas en ${anio}`],
    [CAPACITACIONES.length, `capacitaciones en ${anio}`],
  ].map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join("");

  /* ======================= 1. BRIGADAS ======================= */
  $("#listaBrigadas").innerHTML = BRIGADAS.map((b) => `
    <button class="brigada" data-color="${b.color}" data-brigada="${b.id}" aria-haspopup="dialog">
      <span class="brigada__icono">${icono(b.icono)}</span>
      <h3>${esc(b.nombre)}</h3>
      <p>${esc(b.descripcion)}</p>
      <span class="brigada__mas">Ver funciones →</span>
    </button>`).join("");

  $("#listaResponsabilidades").innerHTML = RESPONSABILIDADES.map((r) => `<li>${icono("check")}<span>${esc(r)}</span></li>`).join("");
  $("#listaPasos").innerHTML = COMO_ACTUAR.map((p) => `<li><strong>${esc(p.titulo)}</strong><span>${esc(p.texto)}</span></li>`).join("");

  const modal = $("#modalBrigada");
  function abrirBrigada(id) {
    const b = porId[id];
    if (!b) return;
    modal.dataset.color = b.color;
    $("#modalContenido").innerHTML = `
      <header class="modal__cabeza">
        <span class="brigada__icono">${icono(b.icono)}</span>
        <div><small>Brigada de</small><h2 id="modalTitulo">${esc(b.nombre)}</h2></div>
        <button class="cerrar" data-cerrar aria-label="Cerrar">${icono("cerrar")}</button>
      </header>
      <div class="modal__texto">
        <p>${esc(b.descripcion)}</p>
        <h3>Funciones principales</h3>
        <ul class="lista-check">${b.funciones.map((f) => `<li>${icono("check")}<span>${esc(f)}</span></li>`).join("")}</ul>
        <h3>Integrantes</h3>
        <ul class="chips">${[...b.docentes, ...b.estudiantes.map((e) => e.nombre + (e.grado ? ` · ${e.grado}` : ""))].map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
      </div>`;
    modal.showModal();
  }

  /* ======================= 2. ORGANIZACIÓN ======================= */
  $("#nombreCoordinadora").textContent = COORDINADORA;

  const persona = (nombre, grado) =>
    `<li class="persona"><span class="persona__inicial" aria-hidden="true">${inicial(nombre)}</span><span>${esc(nombre)}</span>${grado ? `<small>${esc(grado)}</small>` : ""}</li>`;

  $("#listaIntegrantes").innerHTML = BRIGADAS.map((b) => `
    <article class="equipo" data-color="${b.color}">
      <header class="equipo__cabeza">${icono(b.icono)}<h3>${esc(b.nombre)}</h3></header>
      <div class="equipo__cuerpo">
        <div><h4>Docentes</h4><ul>${b.docentes.map((d) => persona(d)).join("")}</ul></div>
        <div><h4>Estudiantes</h4><ul>${b.estudiantes.map((e) => persona(e.nombre, e.grado)).join("")}</ul></div>
      </div>
    </article>`).join("") + `
    <article class="equipo" data-color="todas">
      <header class="equipo__cabeza">${icono("ubicacion")}<h3>Docentes punto de encuentro</h3></header>
      <div class="equipo__cuerpo"><ul>${PUNTO_ENCUENTRO.map((d) => persona(d)).join("")}</ul></div>
    </article>`;

  /* ======================= 3. ACTIVIDADES ======================= */
  const P = PROGRAMA_ACTIVIDADES;
  $("#objetivoActividades").textContent = P.objetivo;
  $("#resumenActividades").innerHTML = [
    ["Meta", P.meta],
    [`Indicador · ${P.frecuencia}`, P.indicador],
    ["Responsables", P.responsables],
  ].map(([t, v]) => `<div class="dato"><small>${esc(t)}</small><p>${esc(v)}</p></div>`).join("");

  const ejecutadoEn = (a, m) => a.ejecutado.includes(m);
  const programadasMes = MESES.map((_, i) => ACTIVIDADES.filter((a) => a.planeado.includes(i + 1)).length);
  const ejecutadasMes = MESES.map((_, i) => ACTIVIDADES.filter((a) => a.planeado.includes(i + 1) && ejecutadoEn(a, i + 1)).length);

  function celda(a, m) {
    const plan = a.planeado.includes(m);
    const hecho = ejecutadoEn(a, m);
    const activo = m === mesActual ? ' class="mes-activo"' : "";
    if (hecho) return `<td${activo}><i class="punto punto--hecho" title="Ejecutada en ${MESES[m - 1]}"></i><span class="sr">Ejecutada</span></td>`;
    if (plan && m <= mesesCerrados) return `<td${activo}><i class="punto punto--vencida" title="Programada en ${MESES[m - 1]}, sin registro de ejecución"></i><span class="sr">Sin registro</span></td>`;
    if (plan) return `<td${activo}><i class="punto punto--plan" title="Programada para ${MESES[m - 1]}"></i><span class="sr">Programada</span></td>`;
    return `<td${activo}></td>`;
  }

  const tabla = $("#tablaActividades");
  tabla.insertAdjacentHTML("beforeend", `
    <thead><tr>
      <th scope="col">#</th>
      <th scope="col" class="col-actividad">Actividad</th>
      ${MES_CORTO.map((m, i) => `<th scope="col" data-mes="${i + 1}"${i + 1 === mesActual ? ' class="mes-activo"' : ""}>${m}</th>`).join("")}
      <th scope="col">Total</th>
    </tr></thead>
    <tbody>
      ${ACTIVIDADES.map((a) => `
        <tr data-meses="${a.planeado.join(",")}">
          <td class="col-n">${a.n}</td>
          <td class="col-actividad">${esc(a.actividad)}</td>
          ${MESES.map((_, i) => celda(a, i + 1)).join("")}
          <td><b>${a.planeado.filter((m) => ejecutadoEn(a, m)).length}/${a.planeado.length}</b></td>
        </tr>`).join("")}
    </tbody>
    <tfoot>
      <tr><td></td><td class="col-actividad">Programadas</td>${programadasMes.map((n) => `<td>${n}</td>`).join("")}<td>${totalProgramadas}</td></tr>
      <tr><td></td><td class="col-actividad">Ejecutadas</td>${ejecutadasMes.map((n) => `<td>${n}</td>`).join("")}<td>${ejecutadasMes.reduce((s, n) => s + n, 0)}</td></tr>
    </tfoot>`);

  // Filtro por mes
  const filtro = $("#filtroMeses");
  filtro.innerHTML = `<button type="button" data-mes="0" aria-pressed="true">Todo el año</button>` +
    MES_CORTO.map((m, i) => `<button type="button" data-mes="${i + 1}" aria-pressed="false">${m}</button>`).join("");

  filtro.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const mes = Number(btn.dataset.mes);
    filtro.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    tabla.querySelectorAll("tbody tr").forEach((tr) => {
      const meses = tr.dataset.meses.split(",").map(Number);
      tr.classList.toggle("oculta", mes !== 0 && !meses.includes(mes));
    });
  });

  $("#planAccion").innerHTML = P.planAccion.map((f) =>
    `<article><b>${esc(f.fase[0])}</b><h3>${esc(f.fase)}</h3><p>${esc(f.texto)}</p></article>`).join("");

  $("#dlActividades").href = DOCUMENTOS.cronogramaActividades.archivo;
  $("#dlCapacitaciones").href = DOCUMENTOS.cronogramaCapacitaciones.archivo;
  $("#btnCartilla").href = DOCUMENTOS.cartilla.archivo;

  /* ======================= 4. CAPACITACIONES ======================= */
  const PC = PROGRAMA_CAPACITACION;
  $("#objetivoCapacitacion").textContent = PC.objetivo;
  $("#responsableCapacitacion").textContent = PC.responsable;

  $("#calendarioCapacitaciones").innerHTML = CAPACITACIONES.map((c) => {
    const b = porId[c.brigada];
    const color = b ? b.color : "todas";
    const etiqueta = b ? b.nombre : "Todas las brigadas";
    const estado = c.ejecutada
      ? `<span class="insignia insignia--hecho">${icono("check")} Ejecutada</span>`
      : `<span class="insignia insignia--plan">Programada</span>`;
    return `
      <article class="mes${c.mes === mesActual ? " es-actual" : ""}" data-color="${color}">
        <header class="mes__cabeza">
          <span class="mes__nombre">${MESES[c.mes - 1]}</span>
          <span class="mes__num">${String(c.mes).padStart(2, "0")}</span>
        </header>
        <div class="mes__cuerpo">
          <p class="mes__tema">${esc(c.tema)}</p>
          <span class="insignia insignia--brigada">${b ? icono(b.icono) : icono("todas")} ${esc(etiqueta)}</span>
          <div class="mes__pie"><span>${esc(c.lugar)}</span>${estado}</div>
        </div>
      </article>`;
  }).join("");

  $("#listaMetas").innerHTML = PC.metas.map((m) => `<li><b>${esc(m.valor)}</b><span>${esc(m.texto)}</span></li>`).join("");
  $("#listaRecursos").innerHTML = PC.recursos.map((r) => `<dt>${esc(r.tipo)}</dt><dd>${esc(r.texto)}</dd>`).join("");

  /* ======================= 5. FORMATOS ======================= */
  $("#listaFormatos").innerHTML = FORMATOS.map((f) => `
    <a class="formato" data-color="${f.color}" href="${esc(f.archivo)}" download>
      <span class="formato__icono">${icono("archivo")}</span>
      <h3>${esc(f.titulo)}</h3>
      <p>${esc(f.desc)}</p>
      <span class="formato__pie">
        <span><span class="tipo tipo--${f.tipo}">${f.tipo.toUpperCase()}</span> ${esc(f.peso)}</span>
        <span class="formato__descargar">${icono("descarga")} Descargar</span>
      </span>
    </a>`).join("");

  /* ======================= 6. SEGUIMIENTO ======================= */
  const ejecutadasTotal = ejecutadasMes.reduce((s, n) => s + n, 0);
  const capEjecutadas = CAPACITACIONES.filter((c) => c.ejecutada);
  const capConDatos = capEjecutadas.filter((c) => c.programadas);
  const sum = (arr, k) => arr.reduce((s, x) => s + (Number(x[k]) || 0), 0);
  const cerradas = HALLAZGOS.filter((h) => h.estado === "cerrada").length;

  const indicadores = [
    {
      titulo: "Cumplimiento del cronograma",
      valor: pct(ejecutadasTotal, totalProgramadas),
      detalle: `${ejecutadasTotal} de ${totalProgramadas} actividades`,
      formula: "Ejecutadas con evidencia / programadas × 100",
    },
    {
      titulo: "Capacitaciones realizadas",
      valor: pct(capEjecutadas.length, CAPACITACIONES.length),
      detalle: `${capEjecutadas.length} de ${CAPACITACIONES.length} capacitaciones`,
      formula: "Ejecutadas / programadas × 100",
    },
    {
      titulo: "Cobertura de participación",
      valor: pct(sum(capConDatos, "asistentes"), sum(capConDatos, "programadas")),
      detalle: capConDatos.length ? `${sum(capConDatos, "asistentes")} de ${sum(capConDatos, "programadas")} personas` : "Sin capacitaciones registradas",
      formula: "Asistentes / convocados × 100",
    },
    {
      titulo: "Cierre de acciones de mejora",
      valor: pct(cerradas, HALLAZGOS.length),
      detalle: HALLAZGOS.length ? `${cerradas} de ${HALLAZGOS.length} acciones cerradas` : "Sin hallazgos registrados",
      formula: "Acciones cerradas / total de acciones × 100",
    },
  ];

  $("#listaIndicadores").innerHTML = indicadores.map((ind) => {
    const v = ind.valor;
    const col = v === null ? "#c3ccd9" : v >= META ? "var(--verde)" : v >= 50 ? "var(--naranja)" : "var(--rojo)";
    return `
      <article class="indicador">
        <h3>${esc(ind.titulo)}</h3>
        <div class="anillo" style="--p:${v ?? 0};--col:${col}"><span>${v === null ? "—" : v + "%"}</span></div>
        <p class="indicador__detalle">${esc(ind.detalle)}</p>
        <p class="indicador__formula">${esc(ind.formula)}</p>
        <span class="insignia insignia--plan indicador__meta">Meta ≥ ${META} %</span>
      </article>`;
  }).join("");

  // Gráfico mensual
  const maximo = Math.max(...programadasMes, 1);
  const grafico = $("#graficoMensual");
  grafico.setAttribute("aria-label", "Actividades programadas y ejecutadas por mes: " +
    MESES.map((m, i) => `${m} ${programadasMes[i]} programadas, ${ejecutadasMes[i]} ejecutadas`).join("; "));
  grafico.innerHTML = MESES.map((_, i) => `
    <div class="barra-mes">
      <div class="barra-mes__par">
        <div class="barra-mes__b barra-mes__b--plan" style="height:${(programadasMes[i] / maximo) * 85}%"><span>${programadasMes[i]}</span></div>
        <div class="barra-mes__b barra-mes__b--hecho" style="height:${(ejecutadasMes[i] / maximo) * 85}%"><span>${ejecutadasMes[i]}</span></div>
      </div>
    </div>`).join("");
  grafico.insertAdjacentHTML("afterend", `<div class="grafico__meses" aria-hidden="true">${MES_CORTO.map((m) => `<span>${m}</span>`).join("")}</div>`);

  // Hallazgos
  const vacio = (txt, ico = "archivo") => `<div class="vacio-estado">${icono(ico)}<p>${txt}</p></div>`;
  $("#tablaHallazgos").innerHTML = HALLAZGOS.length
    ? `<div class="tabla-envoltura"><table class="tabla-simple">
        <thead><tr><th>Fecha</th><th>Hallazgo</th><th>Acción de mejora</th><th>Responsable</th><th>Fecha límite</th><th>Estado</th></tr></thead>
        <tbody>${HALLAZGOS.map((h) => `<tr>
          <td>${esc(h.fecha)}</td><td>${esc(h.hallazgo)}</td><td>${esc(h.accion)}</td><td>${esc(h.responsable)}</td><td>${esc(h.fechaLimite)}</td>
          <td><span class="estado estado--${h.estado === "cerrada" ? "cerrada" : "abierta"}">${h.estado === "cerrada" ? "Cerrada" : "Abierta"}</span></td>
        </tr>`).join("")}</tbody></table></div>`
    : vacio("Aún no hay hallazgos registrados. Aquí aparecerán las condiciones encontradas en las inspecciones, con su responsable, fecha límite y estado de cierre.");

  /* ======================= PIE ======================= */
  const estado = $("#fuenteDatos");
  if (estado) {
    const hora = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    estado.textContent = fuente.origen === "google"
      ? `Información sincronizada con Google Sheets · ${hora}` + (fuente.fallos.length ? ` (sin conexión: ${fuente.fallos.join(", ")})` : "")
      : fuente.error ? "No se pudo leer Google Sheets · mostrando información guardada" : "";
  }

  $("#pieAutoras").innerHTML = `${SITIO.autoras.map(esc).join("<br>")}<br><small>${esc(SITIO.grado)} · ${esc(SITIO.docente)}</small>`;

  /* ======================= INTERACCIÓN ======================= */
  // Menú móvil
  const menuBtn = $("#menuBtn");
  const menu = $("#menu");
  menuBtn.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    menuBtn.setAttribute("aria-expanded", String(abierto));
    menuBtn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("abierto");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Sombra de la barra al hacer scroll
  const barra = $("#barra");
  const sombra = () => barra.classList.toggle("con-sombra", window.scrollY > 8);
  window.addEventListener("scroll", sombra, { passive: true });
  sombra();

  // Enlace activo del menú
  const enlaces = [...menu.querySelectorAll('a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
  }

  // Visor de imágenes
  const visor = $("#visor");
  document.addEventListener("click", (e) => {
    const amp = e.target.closest("[data-ampliar]");
    if (amp) {
      $("#visorImg").src = amp.dataset.ampliar;
      $("#visorImg").alt = amp.dataset.titulo || "";
      $("#visorTitulo").textContent = amp.dataset.titulo || "";
      visor.showModal();
      return;
    }
    const brig = e.target.closest("[data-brigada]");
    if (brig) { abrirBrigada(brig.dataset.brigada); return; }
    const cerrar = e.target.closest("[data-cerrar]");
    if (cerrar) cerrar.closest("dialog").close();
  });

  // Cerrar ventanas al tocar fuera
  [modal, visor].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));
})();
