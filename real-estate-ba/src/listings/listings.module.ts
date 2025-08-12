// src/listings/listings.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { Listing } from './entities/listing.entity';
import { Agent } from '../agents/entities/agent.entity';
import { ListingField } from './entities/listing-field.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, Agent, ListingField])
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
