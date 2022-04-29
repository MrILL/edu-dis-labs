---
title Розроблення веб-сервера за допомогою NestJS
---
# Розроблення веб-сервера за допомогою NestJS
<!-- TODO highligh changes -->

## Філософія

**FIX** In recent years, thanks to Node.js, JavaScript has become the “lingua franca” of the web for both front and backend applications. This has given rise to awesome projects like Angular, React and Vue, which improve developer productivity and enable the creation of fast, testable, and extensible frontend applications. However, while plenty of superb libraries, helpers, and tools exist for Node (and server-side JavaScript), none of them effectively solve the main problem of - Architecture.

**FIX** Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular и использует IOC для выстраивания зависимостей между модулями. Также в проекте будет частично использоваться Onion-архитектура

<!-- TODO пояснить про то что юзается DDO архитектура и IOC -->

## Підготовлення проекту

Для початку роботи необхідно встановити [Node.js](https://nodejs.org/uk/)

Перевірити це встановлення за допомогою команд:

```bash
node --version    
v16.13.2
     
npm --version              
8.1.2  
```

**FIX** To get started, you can either scaffold the project with the [Nest CLI](https://docs.nestjs.com/cli/overview)

To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. 

При вибору пакетного менеджеру будемо використовувати **npm**

```bash
npm i -g @nestjs/cli
nest new project-name
```

Створилася папка `project-name` з наступною структурою:

```bash
.
├─ src/
|  ├─ app.controller.spec.ts
|  ├─ app.controller.ts
|  ├─ app.module.ts
|  ├─ app.service.ts
|  └─ main.ts
├─ test/
|  ├─ app.e2e-spec.ts
|  └─ jest-e2e.ts
├─ .eslintrc.js
├─ .gitignore
├─ .prettierc
├─ nest-cli.json
├─ package.json
├─ tsconfig.build.json
└─ tsconfig.json
```
 
<!-- TODO рассказать про архитектуру неста, Domain Drive Design -->

Призначення каталогів та файлів:

<!-- TODO list -->
`src/` — весь код  
`src/app.controller.spec.ts` — юніт тести для контроллеру модуля app  
`src/app.controller.ts` — код контроллера  
`src/app.module.ts` — код модуля для IoC NestJS де імортуються зовнішні модулі, визначаються контроллери, сервіси та провайдери модуля та сервіси які модуль може експортувати  
`src/main.ts` — вхідна точка коду  
<!-- TODO test files overview -->

Інші файли які знаходяться в руті виконують функцію налаштування певних засобів роботи з кодом.

## Встановлення залежностей

Бойлерплейт NestJS заздалегідь попіклувався про базові залежності які пов'язані з cli, кодогенерацією, ядром NestJS, тестуванням, тайпскриптом та іншим.

```json
{
  "name": "project-name",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/platform-express": "^8.0.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.0.0",
    "@nestjs/schematics": "^8.0.0",
    "@nestjs/testing": "^8.0.0",
    "@types/express": "^4.17.13",
    "@types/jest": "27.4.1",
    "@types/node": "^16.0.0",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^27.2.5",
    "prettier": "^2.3.2",
    "source-map-support": "^0.5.20",
    "supertest": "^6.1.3",
    "ts-jest": "^27.0.3",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "^3.10.1",
    "typescript": "^4.3.5"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

Щоб не йти вріз з Dependency Injection використовуючи на кшталт `process.env` для доступу до змінних середовища будемо використовувати модуль `@nestjs/config`, який при необхідності можна буде замінити своїм, який наприклад підтягує налаштування з окремого сервера.

```bash
npm i --save @nestjs/config @nestjs/serve-static cookie-parser

npm i -D @types/cookie-parser
```

Відповідно у файл `package.json` додасться відповідні строчки:

```json{4,8,9}
  ...
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/config": "^2.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/mapped-types": "*",
    "@nestjs/platform-express": "^8.0.0",
    "@nestjs/serve-static": "^2.2.2",
    "cookie-parser": "^1.4.6",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0"
  },
  ...
```

## Перший запуск та конфігурування серверу

У бойлерплейті вже визначений певний функціонал:
**FIX** The main.ts includes an async function, which will bootstrap our application:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

**FIX** To create a Nest application instance, we use the core NestFactory class. NestFactory exposes a few static methods that allow creating an application instance. The create() method returns an application object, which fulfills the INestApplication interface. This object provides a set of methods which are described in the coming chapters. In the main.ts example above, we simply start up our HTTP listener, which lets the application await inbound HTTP requests.

**FIX** Note that a project scaffolded with the Nest CLI creates an initial project structure that encourages developers to follow the convention of keeping each module in its own dedicated directory

**FIX** Nest aims to be a platform-agnostic framework. Platform independence makes it possible to create reusable logical parts that developers can take advantage of across several different types of applications. Technically, Nest is able to work with any Node HTTP framework once an adapter is created. There are two HTTP platforms supported out-of-the-box: express and fastify. You can choose the one that best suits your needs.

**FIX** We're gonna use express as platform -- it have broad support of **Express is a well-known minimalist web framework for node. It's a battle tested, production-ready library with lots of resources implemented by the community. The @nestjs/platform-express package is used by default. Many users are well served with Express, and need take no action to enable it.**

**FIX** Each application has at least one module, a root module — in our case it's `AppModule`. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. While very small applications may theoretically have just the root module, this is not the typical case. We want to emphasize that modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

**FIX** The @Module() decorator takes a single object whose properties describe the module:

**FIX** 
providers	the providers that will be instantiated by the Nest injector and that may be shared at least across this module
controllers	the set of controllers defined in this module which have to be instantiated
imports	the list of imported modules that export the providers which are required in this module
exports	the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider  itself or just its token (provide value)

<!-- TODO пояснить что тут происходит и какие изменения надо сделать -->

Now we can import the ConfigModule. Typically, we'll import it into the root AppModule and control its behavior using the `.forRoot()` static method. During this step, environment variable key/value pairs are parsed and resolved.  

Also for same logging style and some additional feature we may also use out-in-the-box module `Logger` by adding it to providers to use it though whole app

```typescript
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
```

The most simple way to log port message on app run would be:

```typescript
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8080;
  const logger: Logger = app.get(Logger);

  await app.listen(port);

  logger.log(`PORT: ${port}`);
}

bootstrap();
```

From NestJS IoC container we getting instance of `ConfigService` and `Logger` to use them outside application at 

<!-- TODO пояснить как делаеться нормальное извлекание порта из енвешника -->

Once the installation process is complete, you can run the following command at your OS command prompt to start the application listening for inbound HTTP requests:

```bash
npm run start
```

This command starts the app with the HTTP server listening on the port defined in the src/main.ts file. Once the application is running, open your browser and navigate to http://localhost:3000/. You should see the Hello World! message.

To watch for changes in your files, you can run the following command to start the application:

```bash
npm run start:dev
```

We'll get next messages:

```bash
npm run start:dev

> project-name@0.0.1 start:dev
> nest start --watch

[17:17:32] Starting compilation in watch mode...

[17:17:34] Found 0 errors. Watching for file changes.

[Nest] 28052  - 26.04.2022, 17:17:34     LOG [NestFactory] Starting Nest application...
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [InstanceLoader] ConfigHostModule dependencies initialized +21ms
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [InstanceLoader] AppModule dependencies initialized +0ms       
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms    
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [RoutesResolver] AppController {/}: +25ms
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [RouterExplorer] Mapped {/, GET} route +2ms
[Nest] 28052  - 26.04.2022, 17:17:34     LOG [NestApplication] Nest application successfully started +2ms   
[Nest] 28052  - 26.04.2022, 17:17:34     LOG PORT: 3000
```

Бачимо, що при запуску `npm start:dev` виконується відповідний скрипт у `package.json` та виводить завантеження інстансів модулів, роутер резолвери і т.д. Але зокрема бачимо в кінці логу наш лог порту, у данному випадку 3000, оскільки у змінних середовища знайшло відповідне значення `PORT`.  

При роботі з кодом необов'язково самостійно закривати процесс та відкривати, оскільки NestCLI під побою використовує nodemon або щось накшталт його, тому при зміні коду сервер автоматично закривається, білдиться та запускається.

Тепер в браузері робимо запит за адресою <a href="http://localhost:3000">http://localhost:3000</a>, та маємо наступну відповідь від сервера:

<center>
    <img src="/1.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Сервер пряцює та навіть відповідає на GET запит до рута що являється частиною бойлерплейту.

## Налаштування проміжного ПЗ. Доступ до статичних файлів

NestSJ, як і Express та інші фреймворки, по суті, являються собою інструментами серійного виклику функцій проміжної обробки певних отриманих даних та запитів.

Функції проміжної обробки (middleware) - це функції, які мають доступ до об'єкту запиту ```request```, об'єкту відповіді ```response``` і наступної функції проміжної обробки ```next``` в циклі оброблення запиту.
Функції проміжної обробки можуть виконувати такі завдання:
- Виконання будь-якого коду.
- Внесення змін до об'єкти запитів і відповідей.
- Завершення циклу "запит-відповідь".
- Виклик наступної функції тимчасової роботи з стека.

Якщо поточна функція проміжної обробки завершує цикл "запит-відповідь", вона повинна викликати ```next()``` для передачі управління наступної функції проміжної обробки. В іншому випадку запит зависне.


<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml
actor Client
participant app
participant middleware1
participant middleware2
participant middleware3

Client -> app: request
app -> middleware1: ctx, next
middleware1 -> middleware1
app <-- middleware1: next()
app -> middleware2: ctx, next
middleware2 -> middleware2
app <-- middleware2: next()
app -> middleware3: ctx, next
middleware3 -> middleware3: ctx.body = ...
app <-- middleware3
Client <-- app: response
@enduml

</center>

У NestJS є декілька видів мідлварів, які під своєю назвою попросту полегшують сприятнення 
<!-- TODO https://docs.nestjs.com/faq/request-lifecycle -->

Однією з вбудованих функцій проміжної обробки є функція оброблення запитів до статичного контенту за допомогою інструмента 
<a href="https://docs.nestjs.com/recipes/serve-static">`@nestjs/serve-static`</a> 
, яка дозволяє налаштувати доступ до статичних файлів.

<!-- TODO https://docs.nestjs.com/recipes/serve-static -->

Додамо до `app.module.ts` наступне:

```js {3,4,11-21}
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return [
          {
            rootPath: join(__dirname, '../..', config.get('STATIC_PATH')),
          },
        ];
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
```

:::warning
Маємо шлях `'../..'`, а не `'..'` тому що при транспіляції typescript зберігає вже js код у папці `dist` тому для доступу з директорії `dist/src` потрібен ще одне повернення.
:::

Як видно, використовується не просто метод `ServeStaticModule.forRoot()`, а його асинхронна версія, оскільки нам потрібно с сервісу налаштування вилучити `STATIC_PATH`, що являє собою значення в змінних середовища `./assets`.

В каталозі `./assets` створимо файл `index.html`:

```html
<body>
    <h1> EDU JACE server </h1>
</body> 
```

Створимо глобальный префікс щоб не було колізій зі статичними файлами та було ясно зрозуміло де API серверу:

```typescript{8}
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8080;
  const logger: Logger = app.get(Logger);

  await app.listen(port);

  logger.log(`PORT: ${port}`);
}

bootstrap();
```

Перезавантажимо сторінку за адресою <a href="http://localhost:3000">http://localhost:3000</a>. Побачимо відповідь сервера:

<center>
    <img src="/2.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

## Оброблення запитів

Маршрутизація визначає, як сервер відповідає на клієнтський запит до конкретної адреси (end point), яким є URI (або шлях), і певного методу запиту HTTP (GET, POST і т.п.).

Кожен маршрут може мати одну або кілька функцій обробки, які виконуються при зіставленні маршруту.

KOA підтримує всі методи маршрутизації, що відповідають методам стандартним HTTP (get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, та багато інших).

Шляхи маршрутів можуть бути рядками, шаблонами рядків або регулярними виразами:
- ```/``` - рядок, що позначає кореневий маршрут;
- ```/about``` - рядок, що позначає маршрут ```/about``` (наприклад, [http://localhost:8080/about](http://localhost:8080/about));
- ```/ab?cd``` - шаблон рядка, в якому є необов'язкове включення ```b``` (```acd```,```abcd```);
- ```/ab+cd``` - шаблон рядка, в якому є одне або декілька включень ```b``` (```abcd```,```abbcd```,```abbbcd```, ...);
- ```/ab*cd``` - шаблон рядка, в якому є будь-яка комбінація символів після ```b``` (```abcd```,```abxcd```,```ab123cd```, ...);
- ```/a/``` - регулярний вираз, який відповідає рядку з літерою ```a```;
- ```/.*fly$/``` - регулярний вираз, який відповідає рядку, якій закінчується на ```fly```.

In NestJs controllers are responsible for handling incoming requests and returning responses to the client.

A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

In order to create a basic controller, we use classes and decorators. Decorators associate classes with required metadata and enable Nest to create a routing map (tie requests to the corresponding controllers).

Уявімо, що наш сервер буде надавати доступ до даних про президентів Сполучених Штатів.

::: tip
Простіше за все буде використовувати 
<a href="https://docs.nestjs.com/cli/overview#project-structure">Nest CLI</a> що дозволяє уникнути переписування шаблонного коду и почати відразу від дописування згенерованого модуля. Сама команда генерації CRUD модуля виглядала б наступним чином:

```bash
nest g res presidents
```
:::

Своримо за шляхом `src/` папку `presidents`, де буде весь код модулю.

Створимо файл `president.entity.ts` який буде собою представляти модель данних:

```typescript
export class President {
  id: number;
  name: string;
  photo: string;
}
```

Змоделюємо сховище даних. Для цього за шляхом `src/presidents/` створимо файл `presidents.dataset.ts`:

```typescript
import { President } from './president.entity';

export default [
  {
    id: 1,
    name: 'Barrac Obama',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/274px-President_Barack_Obama.jpg',
  },
  {
    id: 2,
    name: 'Donald Trump',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg',
  },
  {
    id: 3,
    name: 'Joe Biden',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg',
  },
] as President[];
```

Далі створимо `presidents.repository.ts`, який буде виконувати логіку шару доступу між сховищем реальних данних та бізнес логікою:

```typescript
import { Injectable } from '@nestjs/common';
import Presidents from './presidents.dataset';

@Injectable()
export class PresidentsRepository {
  findAll() {
    return Presidents;
  }
}
```

`@Injectable()` показує що данний клас може ін'єктуватися у інші модулі, контроллери та провайдери. Наразі даний клас реалізовує лише доступність до всіх президентів.

::: tip 
У нашому випадку це в маніпуляція данними локального файла, але завдяки архітектури, при необхідності зміни сховища на БД, потребується лише переписати код репозиторія
:::

Далі створимо `presidents.service.ts`, що буде виконувати певну бізнес логіку маніпулюючи даними свого одноіменного репозиторія або даними які повертають інші сервіси:

```typescript{6}
import { Injectable } from '@nestjs/common';
import { PresidentsRepository } from './presidents.repository';

@Injectable()
export class PresidentsService {
  constructor(private readonly presidentsRepository: PresidentsRepository) {}

  findAll() {
    return this.presidentsRepository.findAll();
  }
}
```

На виділеній строчці видно приклад як створюється залежність сервісу від репозиторія, або аналогічно цьому односторонній зв'язок інших двух других елементів DI.

Далі створимо контроллер `presidents.controller.ts` який буде використовувати лише свій одноіменний сервіс та являє собою інтерфейсом API:

```typescript
import { Controller, Get } from '@nestjs/common';
import { PresidentsService } from './presidents.service';

@Controller('presidents')
export class PresidentsController {
  constructor(private readonly presidentsService: PresidentsService) {}

  @Get()
  findAll() {
    return this.presidentsService.findAll();
  }
}
```

Для визначення який тип HTTP запиту використовуються декоратори `@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`.

Далі щоб використовувати цей контроллер потрібно створити модуль `presidents.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { PresidentsService } from './presidents.service';
import { PresidentsController } from './presidents.controller';
import { PresidentsRepository } from './presidents.repository';

@Module({
  controllers: [PresidentsController],
  providers: [PresidentsService, PresidentsRepository],
})
export class PresidentsModule {}
```

Тут визначаються всі контроллери, провайдери(сервіси, репозиторії та інше), залежності модулів. 

Останнє, для використання модуля президентів додамо до імпорту у загальний модуль:

```typescript{23}
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresidentsModule } from './presidents/presidents.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return [
          {
            rootPath: join(__dirname, '../..', config.get('STATIC_PATH')),
          },
        ];
      },
    }),
    PresidentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
```

Таким чином, наш сервер має обробник запитів за шляхом [http://localhost:3000/api/presidents](http://localhost:3000/api/presidents). В браузері звернемося за цією адресою і отримаємо відповідь:

<center>
    <img src="/3.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>


## Оброблення параметрів запиту

Додаткові параметри запиту можна передавати декількома способами:
- за допомогою частини шляху;
- за допомогою `queryString`;
- за допомогою `body`;
- за допомогою  `cookie`.

Якщо в якості шляху використовувати спеціальний шаблон з параметрами `/prePath/:param1/:param2/postPath`, тоді доступ до параметрів запиту (`param1`, `param2`) може здійснюватися за допомогою декоратора `@Param()` (`@Param('param1')`, `@Param('param2')`).

`QueryString` є частиною уніфікованого покажчика ресурсу (URL) , який присвоює значення зазначених параметрів. Рядок запиту зазвичай включає поля, додані до базової URL-адреси веб-браузером або іншим клієнтським додатком.
Типова URL-адреса, що містить `queryString`, така: [https://example.com/over/there?name=ferret](https://example.com/over/there?name=ferret). В цьому випадку, шлях - це `/over/there`, а  `queryString` - `name=ferret`. Знак питання використовується як роздільник і не є частиною `query`. Доступ до параметрів, які передані через `queryString` здійснюється за допомогою декоратора `@Query()`.  

В запитах `POST`,`PUT` та інших (окрім `GET`) можна використати тіло запиту (`body`) для передачі додаткових атрибутів. Коли ви передаєте атрибути в `body`, ви передаєте атрибути як частину об'єкта, описаного як `json`.
NestJS підтримує "з коробки" вилучення тілу з запита за подомогою декоратора `@Body()`.

`HTTP-cookie` - у комп'ютерній термінології поняття, яке використовується для опису інформації у вигляді текстових або бінарних даних, отриманих від веб-сайту на веб-сервері, яка зберігається у клієнта, тобто браузера, а потім відправлена на той самий сайт, якщо його буде повторно відвідано. Таким чином веб-сервер помічає браузер користувача при відвідуванні. Кукі створюються за ініціативою скриптового сценарію на стороні веб-браузера. При наступному візиті сервер буде знати, що користувач вже тут був. За допомогою кукі-технології можна вивчити вподобання відвідувача. Кукі є одним із найточніших засобів визначення унікального користувача. Для зручності оброблення `cookies` використовують спеціальне middleware [cookie-parser](https://www.npmjs.com/package/cookie-parser), яке аналізує Cookie заголовок та заповнює `req.cookies` об’єктом, який закріплений за іменами файлів cookie.

Для перевірки способів передачі параметрів в запитах, доповнемо файл `app.controller.ts`:

```typescript {13-41}
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('echo/:param')
  echoGet(
    @Param('param') params,
    @Query() query,
    @Body() body,
    @Req() request,
  ): any {
    return {
      param: params,
      queryString: query,
      body: body,
      cookie: request.cookies,
    };
  }

  @Post('echo/:param')
  echoPost(
    @Param('param') params,
    @Query() query,
    @Body() body,
    @Req() request,
  ): any {
    return {
      param: params,
      queryString: query,
      body: body,
      cookie: request.cookies,
    };
  }
}
```


В браузері здійснимо запит за адресою [http://localhost:3000/api/echo/1?name=Barrac&isCurrent=true](http://localhost:3000/api/echo/1?name=Barrac&isCurrent=true):

<center>
    <img src="/5.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Як бачимо, ```body``` - це пустий об'єкт, тому що в запитах ```GET``` ```body``` не підтримується.

Для реалізації запиту ```POST``` скористаємося [Postman](https://www.postman.com/):

<center>
    <img src="/4.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
