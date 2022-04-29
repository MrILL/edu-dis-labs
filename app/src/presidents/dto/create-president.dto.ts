import { OmitType } from '@nestjs/mapped-types';
import { President } from '../president.entity';

export class CreatePresidentDto extends OmitType(President, ['id'] as const) {}
