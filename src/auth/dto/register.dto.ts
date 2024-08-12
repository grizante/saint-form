import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}