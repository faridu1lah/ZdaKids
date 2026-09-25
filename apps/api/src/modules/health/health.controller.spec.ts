import { HealthController } from './health.controller.js';
import type { PrismaService } from '../../database/prisma.service.js';

describe('HealthController', () => {
  it('reports API and database health', async () => {
    const prisma = { isHealthy: vi.fn().mockResolvedValue(true) };
    const controller = new HealthController(prisma as unknown as PrismaService);

    await expect(controller.check()).resolves.toMatchObject({
      status: 'ok',
      service: 'zdakids-api',
      database: 'up',
    });
  });
});
