import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FieldType } from '../entities/field.entity';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldType)
  type: FieldType;
}