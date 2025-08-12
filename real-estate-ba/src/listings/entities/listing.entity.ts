import { Agent } from '../../agents/entities/agent.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListingField } from './listing-field.entity';


@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @ManyToMany(() => Agent, (agent) => agent.listings, {
    cascade: ['insert', 'update'], // when saving a listing, its agents can be auto-inserted/updated
  })
  @JoinTable() // This side of the relationship is responsible for the join table
  agents: Agent[];

  @OneToMany(() => ListingField, (listingField) => listingField.listing, {
    cascade: true,
  })
  customFields: ListingField[];
}