# Estrategia de escalabilidad de CI/CD

Si la suite crece y empieza a tardar más en ejecutarse, evaluaría algunos cambios para mantener tiempos razonables y resultados confiables.

- Separar smoke y regresión: utilizaría tags y jobs diferentes para ejecutar rápidamente las pruebas críticas y reservar la suite completa para las ejecuciones de regresión.
- Distribuir las pruebas: evaluaría el sharding de Playwright y la distribución por navegador o proyecto para reducir el tiempo total de ejecución.
- Controlar la concurrencia: ajustaría la cantidad de workers según los recursos disponibles en el runner y las necesidades del entorno, evitando sobrecargarlo.
- Conservar evidencias: configuraría la publicación de traces, screenshots y reportes como artefactos de CI para facilitar el análisis de los bugs.
- Proteger la configuración: almacenaría las credenciales y los secretos en GitHub Actions Secrets o Environments, sin incluirlos en el repositorio.
- Gestionar los reintentos: mantendría una cantidad limitada de retries y conservaría información sobre el Bug original para distinguir los errores transitorios de los problemas funcionales.
- Definir métricas de seguimiento: mediría la duración de las ejecuciones y la frecuencia de bugs intermitentes para detectar cuándo hace falta optimizar la suite o revisar su estabilidad.

La idea es incorporar estas mejoras a medida que sean necesarias, priorizando la confiabilidad de los resultados y el tiempo de ejecución sin perder visibilidad sobre los errores.