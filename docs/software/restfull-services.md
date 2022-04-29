---
title RESTfull сервіси
---
# RESTfull сервіси

REST (Representational State Transfer) використовує HTTP як протокол передачі даних для запитів і відповідей. API-інтерфейс RESTful може не відповідати всім офіційним характеристикам REST, зазначеним доктором Роєм Філдінгом , який вперше описав цю модель. Отже, API є «RESTful» або «REST-подібними». (Деякі розробники наполягають на використанні терміну «RESTful», коли API не відповідає всім характеристикам REST, але більшість людей просто називають їх «REST API»).

API REST можуть використовувати будь-який формат повідомлень, який хочуть використовувати розробники API, включаючи XML, JSON, Atom, RSS, CSV, HTML і інші. Незважаючи на різноманітність параметрів формату повідомлень, більшість API REST використовують JSON (нотацію об'єктів JavaScript) в якості формату повідомлень за замовчуванням. Вони використовують JSON, тому що він забезпечує легкий, простий і більш гнучкий формат повідомлень, який збільшує швидкість зв'язку.

Відмінною рисою REST є те, що API-інтерфейси REST фокусуються на ресурсах (тобто на речах, а не на дії) і способах доступу до ресурсів. Ресурси, як правило, є різними типами інформації. Ви отримуєте доступ до ресурсів через URL (Uniform Resource Locators), так само, як перехід за URL-адресою у вашому браузері дозволяє підключитися до інформаційного ресурсу. URL-адреси супроводжуються методом, який вказує, як ви хочете взаємодіяти з ресурсом. Загальні методи включають ```GET``` (читання), ```POST``` (створення), ```PUT``` (оновлення) і ```DELETE``` (видалення). Кінцева точка зазвичай включає параметри запиту, які визначають більш детальну інформацію про подання ресурсу. Наприклад, можна вказати (в параметрі запиту) обмеження на відображення 5 примірників ресурсу:

```
http://localhost:3000/api/presidents?limit=5&format=json
```

Кінцева точка показує весь шлях до ресурсу. Однак в документації ви зазвичай поділяєте цей URL на більш конкретні частини:
- Базовий шлях (базовий URL або хост) відноситься до загального шляху до API. У наведеному вище прикладі базовий шлях - [http://localhost:3000/api](localhost:3000/api);
- Відношення кінцевої точки до кінцевого шляху цієї точки. У наведеному прикладі це ```/presidents```;
- ```?limit=5&format=json``` частина кінцевої точки містить параметри рядка запиту для цієї точки.

У наведеному вище прикладі кінцева точка отримає ресурс ```homes``` і обмежить результат до 5 примірників. Буде повернуто відповідь в форматі JSON.

Можна мати кілька кінцевих точок, які посилаються на один і той же ресурс. Ось один з варіантів:

```
http://localhost:3000/api/presidents/{id}
```

Наведена URL-адреса може бути кінцевою точкою, яка витягує ресурс, що містить певний ідентифікатор.

## Підготовлення проекту

За основу будемо брати попередній проект. Але зробимо кілька ключових змін.

Оскільки будемо використовувати `uuid`, але вже зберігаються певні строчки, де `id: number`, тому змінюємо на `id: number | string" та далі будемо використовувати саме таке визначення.

`president.entity.ts`:

```typescript{2}
export class President {
  id: number | string;
  name: string;
  photo: string;
}
```

## Написання DTO

DTO (Data Trasfer Object) - це об’єкт, який визначає спосіб надсилання даних по мережі. Ми можемо визначити схему DTO за допомогою інтерфейсів TypeScript або простих класів. Цікаво, що ми рекомендуємо використовувати тут класи. Чому? Класи є частиною стандарту JavaScript ES6, і тому вони зберігаються як реальні сутності в скомпільованому JavaScript. З іншого боку, оскільки інтерфейси TypeScript видаляються під час транспіляції, Nest не може посилатися на них під час виконання. Це важливо, оскільки такі функції, як Pipes, надають додаткові можливості, коли вони мають доступ до метатипу змінної під час виконання.

У нас буде тільки DTO для створення та оновлення екзеплярів президентів та будуть зберігатися за шляхом `src/presidents/dto/`.

`create-president.dto.ts`:

```typescript
import { OmitType } from '@nestjs/mapped-types';
import { President } from '../president.entity';

export class CreatePresidentDto extends OmitType(President, ['id'] as const) {}
```

Використувуючи можливості typescript ми розширюємо класс `President` але при цьому за допомогою OmitType вилучаємо поле `id` та не додаємо нових полів, тому по своїм полям `CreatePresidentDto` аналогічний `President` але без `id`.

Схоже пишемо у `update-president.dto.ts`:

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreatePresidentDto } from './create-president.dto';

export class UpdatePresidentDto extends PartialType(CreatePresidentDto) {}
```

Тут ми визначаємо що `UpdatePresidentDto` по своїм полям аналогічний `CreatePresidentDto`, але `PartialType` означає, що кожне поле являється не обов'язковим.

## Розроблення контролера

Допишем контролер, який реалізує весь CRUD-інтерфейс (Create, Read, Update, Delete) у доповнені до існуючого findAll, модуля `Presidents`:

```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePresidentDto } from './dto/create-president.dto';
import { UpdatePresidentDto } from './dto/update-president.dto';
import { President } from './president.entity';
import { PresidentsService } from './presidents.service';

@Controller('presidents')
export class PresidentsController {
  constructor(private readonly presidentsService: PresidentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreatePresidentDto): President {
    return this.presidentsService.create(payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): President[] {
    return this.presidentsService.findAll();
  }

  @Get(':president')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('president') id: number | string): President {
    return this.presidentsService.findOne(id);
  }

  @Patch(':president')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('president') id: number | string,
    @Body() payload: UpdatePresidentDto,
  ): void {
    return this.presidentsService.update(id, payload);
  }

  @Delete(':president')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('president') id: number | string): void {
    return this.presidentsService.remove(id);
  }
}
``` 

Спочатку імпортуємо усі необхідні декоратори, DTO для сворення та оновлення, модель та сервіс.

## Розроблення сервісу

В файлі `presidents.service.ts` визначаємо бізнес-логіку модулю, що в данний момент виконує лише функцію пов'язання контроллеру та репозиторію:

```typescript
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
    const president = this.findOne(id);
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
```

Варто зауважити що сервіс при виявленні пустих результатів кидає помилку `NotFoundException` з відповідним повідомленням.

## Розроблення репозиторію

В файлі `presidents.repository.ts` визначаємо логіку маніпуляції сховища:

```typescript
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
```

Для генерації `id` нових екземплярів використовуємо бібліотеку `uuid`. Оскільки по суті президенти зберігаються у вигляді масиву, то операції з ним відповідні.

Для зчитування є 2 відповідні методи: getAll - для всіх та getOne - для одного, який додатково приймає як параметр `id`. В обох випадках якщо нічого не знайдуть - повертають `undefined`.

`update` та `remove` нічого не повертають а лише відповідно викують оновлення та видалення з масиву сховища.

## Перевірка працездатності сервісу

В нашому сервісі використовується один ресурс [http://localhost:3000/presidents](http://localhost:3000/api/presidents), доступ до кінцевих точок здійснюється за двома шляхами:
- `presidents`;
- `presidents/:id`;

з допомогою методів HTTP-запитів `POST` (створення нового примірника), `GET` (зчитування моделі), `PATCH` (оновлення примірника), `DELETE` (видалення примірника).

Параметри запитів можуть передаватися за допомогою `params`, `query` та `body`. Наприклад, такі url:
[http://localhost:3000/api/presidents?id=1](http://localhost:3000/presidents?id=1) та [http://localhost:3000/api/presidents/1](http://localhost:3000/presidents/1) повинні повертати однаковий результат.

Запуск сервісу у режимі розробки здійснюється за допомогою команди:

```bash
npm start:dev
```

Для перевірки працездатності сервісу будемо використовувати [Postman](https://www.postman.com/).

Зробимо певне e2e тестування:

- зчитуємо всю колекцію
<center>
    <img src="/02_01.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- створюємо новий екземпляр
<center>
    <img src="/04_01.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- знову зчитуємо всю колекцію
<center>
    <img src="/04_02.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- отримуємо останній екземпляр
<center>
    <img src="/04_03.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

<!-- update -->
- оновлюємо останній екземпляр
<center>
    <img src="/04_04.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- перевіряємо зміну
<center>
    <img src="/04_05.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- видаляємо останній екземпляр
<center>
    <img src="/04_06.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

- перевіряємо видалення
<center>
    <img src="/04_08.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
<center>
    <img src="/04_07.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Також `PATCH` та `DELETE` методи також будуть повертати 404:
<center>
    <img src="/04_09.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
<center>
    <img src="/04_10.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
