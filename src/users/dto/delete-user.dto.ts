import { ApiProperty } from "@nestjs/swagger";


export class DeleteUserDto{
   @ApiProperty({type:"string"})
   password:string
}