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
    cascade: ['insert', 'update'], 
  })
  
  @JoinTable() 
  agents: Agent[];

  @OneToMany(() => ListingField, (listingField) => listingField.listing, {
    cascade: true,
  })
  customFields: ListingField[];
}