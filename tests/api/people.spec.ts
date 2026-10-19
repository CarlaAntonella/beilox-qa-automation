import { test, expect } from '@playwright/test';
import { SWAPI_BASE_URL } from '../../helpers/env';
import { getJson } from '../../helpers/api-client';
import { assertErrorBody, assertResponseTime, assertSchema } from '../../helpers/api-assertions';
import schema from '../../schemas/people.schema.json';

test('GET /people/1 devuelve una persona valida', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/people/1`);
  expect(result.status).toBe(200);
  assertResponseTime(result.durationMs);
  assertSchema(schema, result.body);
});

test('GET /people/999999 maneja un recurso inexistente', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/people/999999`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});

test('GET /people/not-a-number maneja un identificador invalido', async ({ request }) => {
  const result = await getJson(request, `${SWAPI_BASE_URL}/people/not-a-number`);
  expect([400, 404]).toContain(result.status);
  assertResponseTime(result.durationMs);
  assertErrorBody(result.body);
});
