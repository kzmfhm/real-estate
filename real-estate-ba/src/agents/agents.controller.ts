import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service'; // Assuming AgentsService handles repository interaction
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository
import { Repository } from 'typeorm'; // Import Repository

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
    // Eagerly load the customFields relationship, including the nested field entity
    return this.agentsRepository.find({ relations: ['customFields', 'customFields.field'] });
  }

  @Get(':id')
  // Changed return type to Promise<Agent | null> because findOne can return null
  findPOne(@Param('id') id: string): Promise<Agent | null> {
    // You might want to also load customFields for a single agent lookup
    return this.agentsRepository.findOne({ where: { id: +id }, relations: ['customFields', 'customFields.field'] });
  }
}
