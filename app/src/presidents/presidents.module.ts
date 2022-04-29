import { Module } from '@nestjs/common';
import { PresidentsService } from './presidents.service';
import { PresidentsController } from './presidents.controller';
import { PresidentsRepository } from './presidents.repository';

@Module({
  controllers: [PresidentsController],
  providers: [PresidentsService, PresidentsRepository],
})
export class PresidentsModule {}
