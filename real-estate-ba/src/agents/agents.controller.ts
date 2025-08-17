import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service'; 
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 

@Controller('agents')
export class AgentsController {
  constructor(
    private readonly agentsService: AgentsService, 
    @InjectRepository(Agent) 
    private agentsRepository: Repository<Agent>,
  ) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  async findAll(): Promise<Agent[]> {
    return this.agentsRepository.find({ relations: ['customFields', 'customFields.field'] });
  }

  @Get(':id')
  findPOne(@Param('id') id: string): Promise<Agent | null> {
    return this.agentsRepository.findOne({ where: { id: +id }, relations: ['customFields', 'customFields.field'] });
  }
}
