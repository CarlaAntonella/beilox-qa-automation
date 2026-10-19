import { expect } from '@playwright/test';
import { ApiResult } from './api-client';
import { validateSchema } from './schema-validator';

export function assertResponseTime(durationMs: number): void {
  // A generous initial threshold for a public API; tune using measured CI baselines.
  expect(durationMs, 'response time should be under 10 seconds').toBeLessThan(10_000);
}

export function assertSchema(schema: object, body: unknown): void {
  const result = validateSchema(schema, body);
  expect(result.valid, result.errors.join('\n')).toBe(true);
}

export function assertErrorBody(body: unknown): void {
  expect(body, 'error response should have a body').not.toBeNull();
}

export function assertStatus(result: ApiResult, expectedStatus: number): void {
  expect(result.status).toBe(expectedStatus);
}
