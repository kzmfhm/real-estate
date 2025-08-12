// ... imports for Injectable, InjectRepository, Repository, etc.
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
    // You must also inject ListingField repository
    @InjectRepository(ListingField)
    private readonly listingFieldRepository: Repository<ListingField>,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    const { agentIds, customFields, ...listingDetails } = createListingDto;

    // 1. Fetch the related Agent entities
    const agents = await this.agentRepository.findBy({ id: In(agentIds) });
    if (agents.length !== agentIds.length) {
      throw new Error('One or more agents not found');
    }

    // 2. Create the new Listing entity
    const listing = this.listingRepository.create({
      ...listingDetails,
      agents, // Assign the full agent objects
    });

    // 3. Handle custom fields if they exist
    if (customFields && customFields.length > 0) {
        listing.customFields = customFields.map(cf => 
            this.listingFieldRepository.create({
                value: cf.value,
                field: { id: cf.fieldId } // Just need to link by ID
            })
        );
    }
    
    // 4. Save the listing. TypeORM and the `cascade` options will handle saving everything.
    return this.listingRepository.save(listing);
  }

  // To fetch a listing with all its data:
  findOne(id: number) {
    return this.listingRepository.findOne({
        where: { id },
        relations: ['agents', 'customFields', 'customFields.field']
    });
  }
  
  // ... other methods for findAll, update, delete
}