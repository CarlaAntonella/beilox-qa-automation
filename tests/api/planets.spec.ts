import { test, expect } from '@playwright/test';
import { SWAPI_BASE_URL } from '../../helpers/env';
import { getJson } from '../../helpers/api-client';
import { assertErrorBody, assertResponseTime, assertSchema } from '../../helpers/api-assertions';
import schema from '../../schemas/planets.schema.json';

test('GET /planets/1 devuelve un planeta valido', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/planets/1`);
  expect(result.status).toBe(200);
  assertResponseTime(result.durationMs);
  assertSchema(schema, result.body);
});

test('GET /planets/999999 maneja un recurso inexistente', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/planets/999999`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});

test('GET /planets/not-a-number maneja un identificador invalido', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/planets/not-a-number`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});
