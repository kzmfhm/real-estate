
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from 'src/listings/entities/listing.entity';
import { AgentField } from './agent-field.entity';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Listing, (listing) => listing.agents)
  listings: Listing[];

  @OneToMany(() => AgentField, (agentField) => agentField.agent, {
    cascade: true, // Automatically save/remove agentFields when an agent is saved/removed
  })
  customFields: AgentField[];
}