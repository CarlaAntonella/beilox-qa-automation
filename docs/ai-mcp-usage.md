# Uso de inteligencia artificial y MCP

Durante el challenge utilicé un asistente de IA como apoyo para trabajar sobre el proyecto y dos servidores MCP para realizar tareas concretas. En cada caso, distinguí las sugerencias recibidas de las acciones que ejecuté y los resultados que pude comprobar.

# Asistente de IA utilizado

- Herramienta: asistente de IA integrado en el flujo de trabajo.
- Tareas: revisar la estructura del proyecto, analizar alternativas de automatización y mejorar la documentación técnica.
- Revisión manual: comprobé la configuración y los archivos del proyecto, ejecuté las pruebas y revisé los resultados obtenidos antes de documentarlos.

# Filesystem MCP

- Servidor: Filesystem MCP.
- Herramientas utilizadas: consulta de directorios, exploración de la estructura del proyecto y lectura de archivos.
- Acción concreta: inspeccioné la organización del repositorio y consulté "package.json" para identificar scripts y archivos relevantes.
- Resultado: pude localizar los componentes principales del proyecto y confirmar que "save:happy-path" ejecuta "scripts/save-happy-path.ts". Estas consultas no modificaron los archivos.

# Playwright MCP

- Servidor: Playwright MCP.
- Herramientas utilizadas: navegación, consulta de la estructura visible de la página y ejecución de JavaScript para inspeccionar información de la página.
- Acción concreta: abrí la página pública de Central de Pasajes y exploré sus elementos visibles.
- Resultado: pude observar la estructura general de la página y consultar información de su contenido. La exploración se limitó a la navegación y observación; no inicié sesión, envié formularios ni realicé compras.

# Una decisión que mantuve bajo mi propia validación

No tomé las respuestas de la IA como prueba de que la automatización funcionaba. Para comprobar los resultados, ejecuté los comandos del proyecto y revisé las salidas obtenidas. Considero importante distinguir entre implementar un test y verificar que realmente pasa.

# MCP que evalué para una posible etapa posterior

Consideré Atlassian Jira MCP como una herramienta que podría aportar valor en un proyecto con gestión de defectos. Permitiría consultar tickets y relacionarlos con los escenarios de prueba y sus evidencias.

No lo incorporé porque el alcance de este challenge no requería trabajar con Jira. Preferí utilizar herramientas que aportaran valor concreto a las tareas realizadas.