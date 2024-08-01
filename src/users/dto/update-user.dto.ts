import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({description: 'old password'})
  old_password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'new password' })
  password: string;
}