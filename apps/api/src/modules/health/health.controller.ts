import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { HealthResponse } from '@zdakids/types';
import { PrismaService } from '../../database/prisma.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Check API and database health' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'ok',
        service: 'zdakids-api',
        database: 'up',
        timestamp: '2026-09-25T12:00:00.000Z',
      },
    },
  })
  async check(): Promise<HealthResponse> {
    return {
      status: 'ok',
      service: 'zdakids-api',
      database: (await this.prisma.isHealthy()) ? 'up' : 'down',
      timestamp: new Date().toISOString(),
    };
  }
}
