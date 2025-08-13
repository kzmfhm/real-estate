// src/listings/listings.controller.ts
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { Listing } from './entities/listing.entity';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto): Promise<Listing> {
    return this.listingsService.create(createListingDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Listing> {
    const listing = await this.listingsService.findOne(+id);
    
    if (!listing) {
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
    }

    return listing;
  }

  @Get()
  findAll(): Promise<Listing[]> {
    return this.listingsService.findAll();
  }


}