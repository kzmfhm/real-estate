import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './entities/agent.entity';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  findAll(){
    return this.agentsService.findAll();
  }

  @Get(':id')
    findPOne(@Param('id') id:string){
      return this.agentsService.findOne(+id);
    }
}
