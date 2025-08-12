import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';


@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  create(createFieldDto: CreateFieldDto) {
    const field = this.fieldRepository.create(createFieldDto);
    return this.fieldRepository.save(field);
  }

  findAll() {
    return this.fieldRepository.find();
  }

  findOne(id: number) {
    return this.fieldRepository.findOneBy({ id });
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    await this.fieldRepository.update(id, updateFieldDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.fieldRepository.delete(id);
  }
}