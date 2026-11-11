# Página web — Brigadas Escolares I.E. John F. Kennedy

Sitio estático (HTML, CSS y JavaScript, sin frameworks). No necesita base de datos ni servidor especial.

## Estructura

```
web/
├── index.html          ← la página (7 secciones)
├── css/estilos.css     ← diseño
├── js/datos.js         ← TODA la información del sitio (editar aquí)
├── js/app.js           ← lógica que arma las secciones
├── img/                ← escudo, organigrama, infografía (y galeria/ para fotos)
└── descargas/          ← cartilla PDF, cronogramas Excel y formatos de inspección
```

## Verla en el computador

Doble clic en `index.html`, o desde esta carpeta:

```bash
python -m http.server 5500
```

y abrir http://localhost:5500

## Cómo actualizarla (todo en `js/datos.js`)

| Quiero… | Qué editar |
|---|---|
| Corregir nombres de brigadistas | `BRIGADAS` → `docentes` / `estudiantes` |
| Marcar una actividad como ejecutada | `ACTIVIDADES` → agregar el mes en `ejecutado: [3]` |
| Registrar una capacitación hecha | `CAPACITACIONES` → `ejecutada: true`, `programadas`, `asistentes`, `aprobados` (con `mes` correspondiente) |
| Agregar foto a la galería | Guardar la foto en `img/galeria/` y poner la ruta en `GALERIA` → `foto`, más ubicación, hallazgo y recomendación |
| Registrar un hallazgo | Agregar un objeto a `HALLAZGOS` (hay ejemplo en el archivo) |
| Fotos antes/después | `ANTES_DESPUES: [{ foto: "img/galeria/x.jpg", texto: "Antes: ..." }]` |
| Foto de los brigadistas | Reemplazar el bloque `foto-pendiente` en `index.html` por `<img src="img/brigadistas.jpg" alt="...">` |

Los indicadores de "Seguimiento y resultados" se recalculan solos con esos datos.

## Publicarla gratis en internet

- **Netlify Drop** (lo más fácil): entrar a app.netlify.com/drop y arrastrar la carpeta `web`.
- **GitHub Pages**: subir la carpeta a un repositorio y activar Pages.

## Pendientes de contenido

- Validar nombres del organigrama (hay errores de escritura y nombres repetidos) y autorización para publicar nombres de estudiantes menores de edad.
- Foto de los brigadistas, fotos de la galería y datos reales de seguimiento.

## Conexión con Google Sheets

La página puede leer su contenido de una hoja de Google (pestañas Brigadistas, Actividades, Capacitaciones, Galeria, Hallazgos, AntesDespues). Se activa en `js/config.js` y la lectura está en `js/sheets.js`. Si la hoja falla, se usa `js/datos.js`. La guía completa está en `../GUIA_GOOGLE_SHEETS.md`.
