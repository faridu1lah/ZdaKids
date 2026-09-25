import { Platform } from 'react-native';
import type { HealthResponse } from '@zdakids/types';

const emulatorApiUrl = Platform.select({
  android: 'http://10.0.2.2:3000/api',
  default: 'http://localhost:3000/api',
});

export const apiUrl = (
  process.env.EXPO_PUBLIC_API_URL ?? emulatorApiUrl
).replace(/\/$/, '');

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export function getHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>('/health');
}
