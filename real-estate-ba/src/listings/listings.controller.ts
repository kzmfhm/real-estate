import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Patch } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { Listing } from './entities/listing.entity';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto): Promise<Listing> {
    return this.listingsService.update(+id, updateListingDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.listingsService.remove(+id);
  }
}