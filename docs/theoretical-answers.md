# Respuestas teóricas.

## 1. Escalabilidad: suite de 500 tests
Organizaría las pruebas por dominio y tipo, manteniendo fixtures y helpers reutilizables para evitar duplicar lógica. También usaría tags para separar smoke, regresión y escenarios críticos. En CI evaluaría la ejecución en paralelo y, si el volumen lo justifica, dividiría la suite en grupos. Para saber dónde optimizar, mediría la duración, los bugs intermitentes y la cobertura de los escenarios importantes.

## 2. Flakiness
Primero intentaría reproducir el bug y compararía los traces, screenshots, videos y logs de las ejecuciones exitosas y fallidas. Revisaría las esperas, los selectores, el estado del entorno y las posibles dependencias externas o problemas de concurrencia. Los retries pueden ayudar a identificar bugs intermitentes, pero no deberían ocultar su causa. Si fuera necesario deshabilitar temporalmente un test, dejaría documentados el motivo, la evidencia y la condición para volver a habilitarlo.

## 3. POM
Si tuviera que modificar un selector o una acción del botón, intentaría hacerlo en un solo lugar: el Page Object correspondiente. Los tests llamarían a un método, por ejemplo "searchPage.search()", sin necesitar conocer los detalles del selector. Si encontrara el mismo selector o la misma lógica repetidos fuera del Page Object, revisaría esa duplicación para centralizarla.

## 4. Uso responsable de IA
Usaría la IA como apoyo para proponer escenarios, revisar código o explorar alternativas, pero antes de aceptar una solución comprobaría la lógica, las aserciones, los datos y los casos negativos. También ejecutaría las pruebas y revisaría sus resultados, prestando atención a las esperas fijas y a la posible exposición de información sensible. No aprobaría código que no pudiera explicar ni delegaría en la IA la decisión final sobre los riesgos que puede asumir el producto.

## 5. Responsabilidad no delegable del QA Senior
El QA debe entender qué se está validando, identificar los riesgos relevantes y aportar evidencia para decidir si una versión está en condiciones de liberarse. La IA puede ayudar a encontrar escenarios que quizá no se tuvieron en cuenta, pero corresponde al equipo verificar los requisitos y decidir qué riesgos son aceptables. Por ejemplo, que un test pase no alcanza si falta validar una condición crítica de seguridad o de pago.

## 6. Fallas de red en CI/CD
Si una ejecución falla por un problema de red, primero revisaría los logs y traces para determinar si se trata de un problema de infraestructura o de un bug funcional. Si el error parece transitorio, repetiría la ejecución de forma controlada, con una cantidad limitada de retries, conservando el resultado original. Si el bug persiste, lo dejaría visible como tal para que el equipo pueda investigarlo, en lugar de ocultarlo con reintentos automáticos.
