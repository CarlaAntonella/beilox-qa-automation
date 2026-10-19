import { Locator, Page, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly originInput: Locator;
  readonly destinationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.originInput = page.getByRole('combobox', {
      name: 'Ingresá desde dónde viajás',
    });

    this.destinationInput = page.getByRole('combobox', {
      name: 'Ingresá hacia dónde viajás',
    });

    this.searchButton = page.getByRole('button', {
      name: /buscar/i,
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectFormVisible(): Promise<void> {
    await expect(this.searchButton).toBeVisible();
    await expect(this.originInput).toBeVisible();
    await expect(this.destinationInput).toBeVisible();
  }

  async fillRoute(
    _origin: string,
    _destination: string,
  ): Promise<void> {
    // 1. Abrir el desplegable del origen.
    await this.originInput.click();

    // 2. Escribir "ros" en el buscador interno del desplegable.
    const originSearch = this.page
      .locator('input.select2-search__field:visible')
      .last();

    await expect(originSearch).toBeVisible({ timeout: 10000 });
    await originSearch.fill('ros');

    // 3. Seleccionar Rosario Terminal.
    const rosarioOption = this.page.getByText(
      /Rosario Terminal \(Santa Fe\) \(Argentina\)/i,
    ).last();

    await expect(rosarioOption).toBeVisible({ timeout: 10000 });
    await rosarioOption.click();

    // 4. Intercambiar origen y destino.
    const swapButton = this.page.locator('#btnChangePads');

    await expect(swapButton).toBeVisible({ timeout: 10000 });
    await swapButton.click();

    // 5. Volver al origen y buscar Buenos Aires.
    await this.originInput.click();

    const originSearchAgain = this.page
      .locator('input.select2-search__field:visible')
      .last();

    await expect(originSearchAgain).toBeVisible({ timeout: 10000 });
    await originSearchAgain.fill('buenos');

    // 6. Seleccionar Buenos Aires, Terminal Retiro.
    const buenosAiresOptionAgain = this.page.getByText(
      /Buenos Aires.*Terminal Retiro/i,
    ).last();

    await expect(buenosAiresOptionAgain).toBeVisible({ timeout: 10000 });
    await buenosAiresOptionAgain.click(); 

    // 10. Seleccionar la fecha actual si el campo está vacío.
    const departureDate = this.page.locator('#fechaPartida');

    await expect(departureDate).toBeVisible();

    const currentDate = new Date();
    const today = [
      String(currentDate.getDate()).padStart(2, '0'),
      String(currentDate.getMonth() + 1).padStart(2, '0'),
      currentDate.getFullYear(),
    ].join('-');

    const dateValue = await departureDate.inputValue();

    if (!dateValue) {
      await departureDate.fill(today);
    }

    // 11. Ejecutar la búsqueda.
    await this.searchButton.click();
  }

  async search(): Promise<void> {
  }
}