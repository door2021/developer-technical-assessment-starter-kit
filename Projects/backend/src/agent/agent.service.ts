import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentContact } from './entities/agent-contact.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentContact)
    private readonly agentContactRepo: Repository<AgentContact>,
  ) {}

  async createContact(
    userId: number,
    propertyId: number,
    message?: string,
  ): Promise<AgentContact> {
    const contact = this.agentContactRepo.create({
      userId,
      propertyId,
      message,
    });
    return this.agentContactRepo.save(contact);
  }
}
