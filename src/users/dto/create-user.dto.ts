
import { IsString, IsNotEmpty, IsEmail, Length, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: "the user' email" })
  readonly nameUser: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: "the user' name" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly password: string;

  @IsNotEmpty()
  readonly role?: string="free";

  @IsBoolean()
  @ApiProperty({ description: "the user's active" })
  isActives?: boolean=true;

  @IsString()
  @ApiProperty({ description: "the user's img" })
  image?: string='';

  @IsNumber()
  @ApiProperty({ description: "the user's availableProjects" })
  availableProjects?: number=10;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}

