import { Listing } from './entities/listing.entity';
import { Agent } from '../agents/entities/agent.entity';
import { ListingField } from './entities/listing-field.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(): Promise<Listing[]> {
    return this.listingRepository.find({
        relations: ['agents', 'customFields', 'customFields.field']
    });
  }

  findOne(id: number): Promise<Listing | null> {
    return this.listingRepository.findOne({
        where: { id },
        relations: ['agents', 'customFields', 'customFields.field']
    });
  }

  async update(id: number, updateListingDto: UpdateListingDto): Promise<Listing> {
    const listing = await this.listingRepository.findOneBy({ id });

    if (!listing) {
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
    }

    const { agentIds, customFields, ...listingDetails } = updateListingDto;

    if (agentIds) {
      const agents = await this.agentRepository.findBy({ id: In(agentIds) });
      if (agents.length !== agentIds.length) {
        throw new NotFoundException('One or more agents not found');
      }
      listing.agents = agents;
    }

    if (customFields) {

      listing.customFields = customFields.map(cf => 
          this.listingFieldRepository.create({
              value: cf.value,
              field: { id: cf.fieldId },
              listing: listing 
          })
      );
    }

    Object.assign(listing, listingDetails);
    return this.listingRepository.save(listing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.listingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
    }
  }
}