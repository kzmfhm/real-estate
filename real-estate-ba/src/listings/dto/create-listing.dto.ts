import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CustomFieldDto {
  @IsInt()
  fieldId: number;

  @IsString()
  value: string;
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @IsInt({ each: true })
  agentIds: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields?: CustomFieldDto[];
}