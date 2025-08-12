import { Field } from '../../fields/entities/field.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Agent } from './agent.entity';

@Entity()
export class AgentField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Agent, (agent) => agent.customFields, { onDelete: 'CASCADE' })
  agent: Agent;

  @ManyToOne(() => Field, { eager: true, onDelete: 'CASCADE' })
  field: Field;
}