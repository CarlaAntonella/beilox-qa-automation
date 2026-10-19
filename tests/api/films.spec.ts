import { test, expect } from '@playwright/test';
import { SWAPI_BASE_URL } from '../../helpers/env';
import { getJson } from '../../helpers/api-client';
import { assertErrorBody, assertResponseTime, assertSchema } from '../../helpers/api-assertions';
import schema from '../../schemas/films.schema.json';

test('GET /films/1 devuelve una pelicula valida', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/films/1`);
  expect(result.status).toBe(200);
  assertResponseTime(result.durationMs);
  assertSchema(schema, result.body);
});

test('GET /films/999999 maneja un recurso inexistente', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/films/999999`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});

test('GET /films/not-a-number maneja un identificador invalido', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/films/not-a-number`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});
