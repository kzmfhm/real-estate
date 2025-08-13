import { Listing } from './entities/listing.entity';
import { Agent } from '../agents/entities/agent.entity';
import { ListingField } from './entities/listing-field.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(ListingField)
    private readonly listingFieldRepository: Repository<ListingField>,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    const { agentIds, customFields, ...listingDetails } = createListingDto;


    const agents = await this.agentRepository.findBy({ id: In(agentIds) });
    if (agents.length !== agentIds.length) {
      throw new Error('One or more agents not found');
    }

    const listing = this.listingRepository.create({
      ...listingDetails,
      agents, 
    });

    if (customFields && customFields.length > 0) {
        listing.customFields = customFields.map(cf => 
            this.listingFieldRepository.create({
                value: cf.value,
                field: { id: cf.fieldId } 
            })
        );
    }
    
    return this.listingRepository.save(listing);
  }

  findOne(id: number) {
    return this.listingRepository.findOne({
        where: { id },
        relations: ['agents', 'customFields', 'customFields.field']
    });
  }
  
  findAll(): Promise<Listing[]> {
    return this.listingRepository.find({
        relations: ['agents', 'customFields', 'customFields.field']
    });
  }
}