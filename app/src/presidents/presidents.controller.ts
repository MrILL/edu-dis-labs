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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePresidentDto } from './dto/create-president.dto';
import { UpdatePresidentDto } from './dto/update-president.dto';
import { President } from './president.entity';
import { PresidentsService } from './presidents.service';

@ApiTags('presidents')
@Controller('presidents')
export class PresidentsController {
  constructor(private readonly presidentsService: PresidentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreatePresidentDto })
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
  @ApiBody({ type: UpdatePresidentDto })
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
