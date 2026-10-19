import { test as base, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

type TestFixtures = {
  searchPage: SearchPage;
};

export const test = base.extend<TestFixtures>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  }
});

export { expect };
