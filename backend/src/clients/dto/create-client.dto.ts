import { IsString, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;
}
