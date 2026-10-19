import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { request as playwrightRequest, expect } from '@playwright/test';
import { SWAPI_BASE_URL } from '../helpers/env';
import { validateSchema } from '../helpers/schema-validator';
import peopleSchema from '../schemas/people.schema.json';
import planetsSchema from '../schemas/planets.schema.json';
import filmsSchema from '../schemas/films.schema.json';

const resources = [
  { name: 'people', url: `${SWAPI_BASE_URL}/people/1`, schema: peopleSchema },
  { name: 'planets', url: `${SWAPI_BASE_URL}/planets/1`, schema: planetsSchema },
  { name: 'films', url: `${SWAPI_BASE_URL}/films/1`, schema: filmsSchema }
] as const;

async function main(): Promise<void> {
  const api = await playwrightRequest.newContext();
  const output: Record<string, unknown> = {};

  try {
    for (const resource of resources) {
      const response = await api.get(resource.url);
      expect(response.status(), `${resource.name} happy path status`).toBe(200);
      const body: unknown = await response.json();
      const validation = validateSchema(resource.schema, body);
      expect(validation.valid, validation.errors.join('\n')).toBe(true);
      output[resource.name] = body;
    }

    await mkdir(resolve('data'), { recursive: true });
    await writeFile(
      resolve('data/api-happy-path.json'),
      `${JSON.stringify(output, null, 2)}\n`,
      'utf8'
    );
    process.stdout.write('Saved happy-path bodies to data/api-happy-path.json\n');
  } finally {
    await api.dispose();
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
