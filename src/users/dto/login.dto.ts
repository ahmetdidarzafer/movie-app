import { ApiProperty } from "@nestjs/swagger";


export class LoginDTO{
   @ApiProperty({type:"string"})
   email :string
   @ApiProperty({type:"string"})
   password:string
}