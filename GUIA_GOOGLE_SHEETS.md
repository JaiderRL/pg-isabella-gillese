# Guía: administrar la página web desde Google Sheets

La información de la página (brigadistas, cronogramas, capacitaciones y hallazgos) se puede manejar desde una **hoja de cálculo de Google**. Lo que se escribe en la hoja aparece en la página web, sin tocar código.

- **Página publicada:** https://brigadas-jfk.netlify.app (administración en https://app.netlify.com/projects/brigadas-jfk)
- **Hoja de pruebas (cuenta de Jaider):** https://docs.google.com/spreadsheets/d/10LQW-bDKkJ5MwuRIJ39o9MnA01lm_kYmRoO311Fp0vM/edit
- **Copia local de la plantilla:** `plantilla/Brigadas JFK - Contenido web.xlsx`

---

## 1. Conectar (se hace una sola vez)

**Paso 1. Tener la hoja en Google Drive.**
- Si es la hoja de pruebas, ya existe.
- Para la clienta: en su Google Drive, *Nuevo → Subir archivo →* `Brigadas JFK - Contenido web.xlsx`. Luego se abre y se elige *Archivo → Guardar como Hojas de cálculo de Google*.

**Paso 2. Compartirla en modo lectura.** Es lo que permite que la página la lea.
1. Abrir la hoja y hacer clic en **Compartir** (botón verde o azul arriba a la derecha).
2. En "Acceso general", cambiar *Restringido* por **Cualquier persona con el enlace**.
3. Dejar el rol en **Lector** y hacer clic en **Listo**.

> "Lector" significa que cualquiera con el enlace puede *ver* la hoja, pero **nadie puede modificarla**. Para que otra persona (la profesora, por ejemplo) pueda editar, se agrega su correo en el mismo cuadro de "Compartir" con el rol **Editor**.

**Paso 3. Poner el enlace en la página.**
1. Copiar el enlace de la hoja desde la barra del navegador.
2. Abrir el archivo `web/js/config.js` y pegarlo entre las comillas:
   ```js
   GOOGLE_SHEET: "https://docs.google.com/spreadsheets/d/XXXXXXXX/edit",
   ```
3. Guardar el archivo y volver a subir la página a internet (Netlify).

**Cómo saber que quedó conectada:** al final de la página, en el pie azul, aparece
*"Información sincronizada con Google Sheets · hora"*.

---

## 2. Desconectar

Abrir `web/js/config.js` y dejar las comillas vacías:

```js
GOOGLE_SHEET: "",
```

La página vuelve a mostrar la información guardada dentro de ella misma (`js/datos.js`), y el mensaje del pie desaparece.

**Otras formas de cortar la conexión, sin tocar archivos:**
- Volver a poner la hoja en *Compartir → Restringido*. La página detecta que no puede leerla, muestra la información guardada y en el pie aparece *"No se pudo leer Google Sheets · mostrando información guardada"*.
- Borrar la hoja o cambiarle el nombre a una pestaña tiene el mismo efecto, aunque en ese último caso solo se afecta la sección de esa pestaña.

**La página nunca queda vacía:** si Google falla, se usa la información guardada.

---

## 3. Uso del día a día (lo que hace la administradora)

Todo se hace en la hoja. Los cambios aparecen en la web al **recargar la página**. Google puede tardar **de 1 a 5 minutos** en entregar la versión nueva.

| Pestaña | Para qué | Cómo |
|---|---|---|
| **Brigadistas** | Integrantes | Una fila por persona. Columnas: Brigada (lista), Rol (Docente / Estudiante / Coordinadora / Punto de encuentro), Nombre y Grado |
| **Actividades** | Cronograma anual | En cada mes: **P** = programada, **E** = ejecutada. Al cambiar una P por E, la página la marca en verde y actualiza los porcentajes |
| **Capacitaciones** | Plan de capacitación | Al realizarla: Estado = **Ejecutada**, y llenar personas programadas, asistentes y aprobados |
| **Hallazgos** | Acciones de mejora | Una fila por hallazgo. Estado **Abierta** o **Cerrada** |

> Las pestañas *Galeria* y *AntesDespues* ya no se usan: la página no muestra fotos.

### Reglas para que no se dañe
- **No cambiar el nombre de las pestañas** ni los títulos de la fila 1.
- No dejar filas de título o notas en medio de los datos.
- En una misma columna, mantener el mismo tipo de dato: en "Asistentes" solo números, en los meses solo P o E.

---

## 4. Preguntas frecuentes

**¿Cualquiera puede cambiar la página?**
No. Solo quien tenga permiso de **Editor** en la hoja. Lo demás es solo lectura.

**¿Qué información queda pública?**
Todo lo que esté en la hoja, porque se comparte "con el enlace", y de todas formas aparece en la página. No se deben poner datos sensibles (cédulas, teléfonos). Para los nombres de estudiantes menores de edad se debe contar con autorización.

**Cambié algo y no aparece.**
Esperar unos minutos y recargar con **Ctrl + F5**. Revisar también que la pestaña y los títulos tengan su nombre original.

**¿Cuesta algo?**
No. Google Sheets y Drive son gratuitos.
