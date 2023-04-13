
import { IsString, IsNotEmpty, IsEmail, Length, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: "the user' email" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsBoolean()
  @ApiProperty({ description: "the user's active" })
  isActives?: boolean;

  @IsString()
  @ApiProperty({ description: "the user's img" })
  image?: string;

  @IsNumber()
  @ApiProperty({ description: "the user's availableProjects" })
  availableProjects?: number;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}

