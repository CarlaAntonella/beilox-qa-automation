# Escalabilidad y evolución de la suite 

La idea es que la automatización pueda crecer junto con el proyecto sin volverse difícil de mantener. Para eso, organizaría el trabajo en etapas, incorporando mejoras a medida que aumente la cantidad de pruebas y las necesidades del equipo.

## Etapa 1 — Base y organización   

Mantendría una estructura clara, separando las pruebas por dominio y tipo. Los fixtures y helpers permitirían reutilizar la lógica común, mientras que los Page Objects centralizarían las interacciones con la interfaz. Así, agregar escenarios nuevos no implicaría repetir código en cada test. 

## Etapa 2 — API
Ampliaría la cobertura de los servicios y mantendría las validaciones de las respuestas mediante esquemas JSON. También incorporaría casos negativos para comprobar cómo responde la API ante errores, datos inválidos y situaciones fuera del flujo esperado.

## Etapa 3 — UI
A medida que crezca la suite, revisaría los selectores y las aserciones para que las pruebas sean estables y representen comportamientos reales. También buscaría reducir las dependencias entre escenarios y reutilizar las acciones comunes sin perder claridad.

## Etapa 4 — CI/CD
Integraría la ejecución de las pruebas en el pipeline para contar con resultados automáticos y repetibles. Si el volumen de casos lo requiere, evaluaría la ejecución en paralelo y la distribución de la suite en grupos. El objetivo sería reducir el tiempo de ejecución sin perder visibilidad sobre los bugs. 

## Etapa 5 — Mantenimiento y datos
Con una suite más grande, prestaría especial atención a los bugs intermitentes, la calidad de los datos de prueba y el mantenimiento de los escenarios. Revisaría los resultados para identificar patrones de error, eliminar duplicaciones y priorizar los casos que aporten mayor cobertura de riesgos.

La evolución de la suite se apoyaría en métricas como el tiempo de ejecución, la frecuencia de fallos intermitentes y la cobertura de los escenarios críticos. Esos datos permitirían decidir qué optimizar primero y dónde conviene invertir el esfuerzo de mantenimiento.