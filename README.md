# Brigadas Escolares · I.E. John F. Kennedy

Página web del proyecto de grado **"Fortalecimiento de la brigada mediante herramientas de planificación, seguimiento y gestión tecnológica"**, de la Institución Educativa John F. Kennedy (Puerto Boyacá, Boyacá).

- **Autoras:** Isabella Panchano Calderón y Yesly Gisella Acosta García (11°B)
- **Docente:** Dioselina Mena
- **Sitio publicado:** https://brigadas-jfkennedy.netlify.app

## ¿Qué es?

Es una página estática (HTML, CSS y JavaScript, sin frameworks) que reúne la información de las brigadas de emergencia del colegio:

1. **Conoce las brigadas:** las 5 brigadas, sus funciones y cómo actuar ante una emergencia
2. **Organización:** la estructura de mando y los integrantes
3. **Cronograma de actividades:** las inspecciones y actividades del año (P = programada, E = ejecutada)
4. **Plan de capacitaciones:** 12 capacitaciones, una por mes
5. **Formatos de inspección:** formatos SGI-HSEQ para descargar
6. **Seguimiento y resultados:** 4 indicadores que se calculan solos, con meta del 80 %

## Cómo funciona

El contenido se administra desde una **hoja de Google**, sin tocar código. La página lee 4 pestañas (Brigadistas, Actividades, Capacitaciones y Hallazgos) y, si la hoja no responde, usa los datos de respaldo de `web/js/datos.js`.

```
web/
├── index.html        estructura de las secciones
├── css/estilos.css   diseño (escritorio y celular)
├── js/config.js      enlace de la hoja de Google (vacío = desconectada)
├── js/datos.js       datos de respaldo y textos fijos
├── js/sheets.js      lectura de la hoja de Google
├── js/app.js         arma las secciones y calcula los indicadores
├── img/              escudo, infografía y organigrama
└── descargas/        cartilla, cronogramas y formatos
```

## Ver en local

```bash
python -m http.server 5500 --directory web
```

Luego abrir http://localhost:5500

## Publicar cambios

```bash
netlify deploy --prod --dir web --site <SITE_ID>
```

Los cambios de **contenido** se hacen en la hoja de Google y no requieren volver a publicar.

## Documentación

| Archivo | Para qué |
|---|---|
| `GUIA_GOOGLE_SHEETS.md` | Conectar, desconectar y llenar la hoja de Google |
| `plantilla/…(para copiar).xlsx` | Plantilla con las 4 pestañas compatibles |
| `web/LEEME.md` | Detalle técnico de la carpeta web |
