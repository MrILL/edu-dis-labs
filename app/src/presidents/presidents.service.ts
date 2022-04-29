import { Injectable, NotFoundException } from '@nestjs/common';
import { PresidentsRepository } from './presidents.repository';
import { President } from './president.entity';
import { CreatePresidentDto } from './dto/create-president.dto';
import { UpdatePresidentDto } from './dto/update-president.dto';

@Injectable()
export class PresidentsService {
  constructor(private readonly presidentsRepository: PresidentsRepository) {}

  create(payload: CreatePresidentDto): President {
    return this.presidentsRepository.create(payload);
  }

  findAll(): President[] {
    const presidents = this.presidentsRepository.findAll();
    if (!presidents || presidents.length === 0) {
      throw new NotFoundException('Presidents not found');
    }

    return presidents;
  }

  findOne(id: number | string): President {
    const president = this.presidentsRepository.findOne(id);
    if (!president) {
      throw new NotFoundException('President not found');
    }

    return president;
  }

  update(id: number | string, payload: UpdatePresidentDto): void {
    const prevPresident = this.findOne(id);

    this.presidentsRepository.update(prevPresident, payload);
  }

  remove(id: number | string): void {
    const prevPresident = this.findOne(id);

    this.presidentsRepository.remove(prevPresident);
  }
}
