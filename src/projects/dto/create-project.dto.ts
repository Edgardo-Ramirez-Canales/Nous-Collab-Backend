import {
  IsString,
  IsNotEmpty,
 
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `project's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
   image: string;
}


