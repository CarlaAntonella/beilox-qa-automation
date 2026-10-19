import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Búsqueda de pasajes en Central de Pasajes', () => {
  test('muestra el formulario de búsqueda', async ({ searchPage }) => {
    await searchPage.open();
    await searchPage.expectFormVisible();
  });

  test('permite buscar un pasaje desde Buenos Aires hasta Rosario', async ({
    searchPage,
    page,
  }) => {
    await searchPage.open();

    // Completar la ruta y seleccionar Rosario entre las sugerencias.
    await searchPage.fillRoute('Buenos Aires', 'ros');
    await searchPage.search();

    // Verificar que la página no quede en blanco.
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('mantiene el formulario visible al intentar buscar sin datos', async ({
    searchPage,
  }) => {
    await searchPage.open();
    await searchPage.search();

    await expect(searchPage.originInput).toBeVisible();
    await expect(searchPage.destinationInput).toBeVisible();
  });

  test('permite volver al buscador de Google con el navegador', async ({ page }) => {
  // Primera página del historial: Google.
  await page.goto('https://www.google.com/');

  // Segunda página del historial: Central de Pasajes.
  await page.goto('https://www.centraldepasajes.com.ar/');

  // Volver a la página anterior.
  await page.goBack();

  // Verificar que volvimos a Google.
  await expect(page).toHaveURL(/google\.com/);
  await expect(page.locator('body')).not.toBeEmpty();

  }); 

});