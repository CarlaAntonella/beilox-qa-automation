import { APIRequestContext } from '@playwright/test';

export interface ApiResult {
  status: number;
  durationMs: number;
  body: unknown;
  headers: Record<string, string>;
}

export async function getJson(
  request: APIRequestContext,
  url: string
): Promise<ApiResult> {
  const startedAt = Date.now();
  const response = await request.get(url);
  const durationMs = Date.now() - startedAt;
  const body: unknown = await response.json().catch(() => null);

  return {
    status: response.status(),
    durationMs,
    body,
    headers: response.headers()
  };
}
