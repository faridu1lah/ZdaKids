export type SupportedLocale = 'en' | 'ps';

export interface HealthResponse {
  status: 'ok';
  service: string;
  database: 'up' | 'down';
  timestamp: string;
}
