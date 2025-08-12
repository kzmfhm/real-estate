import { Field } from '../../fields/entities/field.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';

@Entity()
export class ListingField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Listing, (listing) => listing.customFields, { onDelete: 'CASCADE' })
  listing: Listing;

  @ManyToOne(() => Field, { eager: true, onDelete: 'CASCADE' }) // eager loads the Field info automatically
  field: Field;
}