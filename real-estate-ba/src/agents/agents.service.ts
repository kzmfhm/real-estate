import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const existingAgent = await this.agentRepository.findOne({
      where: { email: createAgentDto.email },
    });

    if (existingAgent) {
      throw new ConflictException('An agent with this email already exists.');
    }
    const newAgent = this.agentRepository.create(createAgentDto);
    return this.agentRepository.save(newAgent);
  }

  findAll(){
    return this.agentRepository.find()
  }

  findOne(id:number){
    return this.agentRepository.findOneBy({id})
  }
}
