# Beilox — QA Automation Challenge

Este proyecto contiene la automatización de pruebas de interfaz y API desarrollada para el challenge de Beilox. Está implementado con Playwright y TypeScript, y utiliza AJV para validar las respuestas de la API mediante esquemas JSON.

La solución busca mantener una estructura clara, reutilizar componentes y separar la lógica de automatización de los escenarios de prueba, facilitando tanto el mantenimiento como la incorporación de nuevos casos.

# Requisitos e instalación

Para ejecutar el proyecto se necesita Node.js y npm.

Cloná o descargá el repositorio y ejecutá los siguientes comandos desde la carpeta del proyecto:

npm install
npx playwright install chromium

Para crear el archivo de configuración local, copiá ".env.example" como ".env". En Windows PowerShell podés hacerlo con:

Copy-Item .env.example .env

El archivo ".env" permite configurar las URLs y otros valores del entorno sin modificar el código.

# Ejecución de las pruebas

Los comandos principales están definidos en "package.json":

npm run typecheck
npm run test:api
npm run save:happy-path
npm run test:ui
npm run test:report

- "npm run typecheck": comprueba los tipos de TypeScript.
- "npm run test:api": ejecuta las pruebas automatizadas de API.
- "npm run save:happy-path": obtiene y guarda las respuestas exitosas de referencia en archivos JSON.
- "npm run test:ui": ejecuta las pruebas de interfaz.
- "npm run test:report": permite consultar el reporte de Playwright generado por las ejecuciones.

Durante las validaciones realizadas para el challenge, se obtuvieron 9 pruebas de API aprobadas y 4 pruebas de interfaz aprobadas.

# Organización del proyecto

El proyecto está organizado por responsabilidades para que cada parte de la automatización sea fácil de localizar y mantener.

- "tests/api": contiene los escenarios de prueba de API.
- "tests/ui": contiene los escenarios de prueba de interfaz.
- "pages": reúne los Page Objects, que encapsulan los selectores y las acciones sobre las páginas.
- "fixtures": contiene los recursos compartidos y la configuración reutilizable de las pruebas mediante "test.extend".
- "helpers": incluye utilidades comunes, como el cliente de API y las aserciones reutilizables.
- "schemas": contiene los esquemas JSON utilizados por AJV para validar las respuestas.
- "scripts": incluye el proceso de generación de datos de referencia.
- "data": almacena las respuestas exitosas guardadas en formato JSON.
- "docs": reúne las respuestas teóricas del challenge, la documentación del uso de IA y MCP, y las consideraciones de escalabilidad en CI/CD.
- ".github/workflows": contiene la configuración de GitHub Actions.

Para las pruebas de interfaz se utiliza el patrón Page Object Model (POM), que permite centralizar las interacciones con las páginas y evitar la repetición de selectores y acciones en los tests.

En las pruebas de API, el cliente y las validaciones compartidas se encuentran separados de los escenarios. AJV permite comprobar la estructura de las respuestas a partir de los esquemas definidos para cada recurso.

El script "scripts/save-happy-path.ts" obtiene las respuestas exitosas de los recursos "people", "planets" y "films", las valida y guarda sus cuerpos en archivos JSON dentro de "data".

# Uso de inteligencia artificial y MCP

Durante el desarrollo utilicé un asistente de IA como apoyo para analizar la estructura del proyecto, resolver dudas técnicas y evaluar alternativas de implementación. Las sugerencias se utilizaron como ayuda para el trabajo, mientras que las decisiones y los resultados se contrastaron con el código y las ejecuciones realizadas.

También incorporé dos servidores MCP para explorar el proyecto y una página web de referencia:

 Filesystem MCP: lo utilicé para inspeccionar la estructura de carpetas, localizar archivos relevantes y consultar la configuración del proyecto, incluido "package.json".

Playwright MCP: lo utilicé para abrir y explorar la página pública de Central de Pasajes, observar su estructura y consultar los elementos visibles de la interfaz. La exploración se limitó a la navegación y observación de la página; no inicié sesión, envié formularios ni realicé compras.

Una decisión deliberada fue no utilizar las respuestas de la IA como evidencia de que las pruebas funcionaban. Para comprobar su resultado, ejecuté los comandos del proyecto y revisé los resultados obtenidos.

También evalué Atlassian Jira MCP como una posible herramienta complementaria. Podría resultar útil en un proyecto con gestión de defectos, para consultar tickets y relacionarlos con los escenarios y las evidencias de prueba. No lo incorporé porque el alcance de este challenge no requería trabajar con Jira.

El archivo "docs/ai-mcp-usage.md" contiene el registro específico de estas herramientas y de las decisiones tomadas durante su utilización.

# Ejecución en CI/CD

El proyecto incluye un workflow de GitHub Actions en ".github/workflows/playwright.yml" para automatizar la ejecución de las pruebas.

La configuración contempla una ejecución programada mediante el cron "0 18 * * 1", correspondiente a los lunes a las 18:00 UTC, es decir, las 15:00 en Argentina bajo el huso horario UTC-3.

Esta integración permite ejecutar la automatización dentro del pipeline y consultar sus resultados, facilitando la detección temprana de Bugs y el mantenimiento de la suite.

# Documentación complementaria

Dentro de "docs" se encuentran los siguientes archivos:

- "theoretical-answers.md": respuestas teóricas del challenge.
- "ai-mcp-usage.md": registro del uso de inteligencia artificial y servidores MCP.
- "ci-scaling.md": consideraciones para escalar la automatización en CI/CD. 
- "implementation-roadmap.md": Escalabilidad y evolución de la suite.  