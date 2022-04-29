import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreatePresidentDto } from './dto/create-president.dto';
import { UpdatePresidentDto } from './dto/update-president.dto';
import { President } from './president.entity';
import Presidents from './presidents.dataset';

@Injectable()
export class PresidentsRepository {
  create(payload: CreatePresidentDto): President {
    const newPresident = Object.assign(new President(), payload, {
      id: v4(),
    });

    Presidents.push(newPresident);

    return newPresident;
  }

  findAll(): President[] {
    return Presidents;
  }

  findOne(id: number | string): President {
    return Presidents.find((curPresident) => curPresident.id == id);
  }

  update(president: President, payload: UpdatePresidentDto): void {
    const presidentI = Presidents.findIndex(({ id }) => id == president.id);

    const newPresident = Object.assign(president, payload);

    Presidents[presidentI] = newPresident;
  }

  remove(president: President): void {
    const presidentI = Presidents.findIndex(({ id }) => id == president.id);

    Presidents.splice(presidentI, 1);
  }
}
