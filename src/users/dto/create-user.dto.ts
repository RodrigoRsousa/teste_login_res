import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;


  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  @ApiProperty()
  passwordConfirmation: string;
}