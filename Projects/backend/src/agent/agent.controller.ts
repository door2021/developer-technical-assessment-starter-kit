import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AgentService } from './agent.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AgentContact } from './entities/agent-contact.entity';

@Controller('agent-contact')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async contactAgent(
    @Req() req: Request & { user?: { userId?: string } },
    @Body() body: { propertyId: number; message?: string },
  ): Promise<AgentContact> {
    const rawUserId = req.user?.userId ?? '0';
    const parsedUserId = Number(rawUserId);
    const userId = Number.isNaN(parsedUserId) ? 0 : parsedUserId;
    const { propertyId, message } = body;

    return this.agentService.createContact(userId, propertyId, message);
  }
}
