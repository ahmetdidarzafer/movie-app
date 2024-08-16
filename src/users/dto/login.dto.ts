import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail } from "class-validator";


export class LoginDTO{
   @ApiProperty({type:"string"})
   @IsEmail()
   email :string
   @ApiProperty({type:"string"})
   password:string
}