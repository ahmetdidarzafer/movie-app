import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ValidationPipe, UsePipes } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";

@Controller('user')
@ApiBearerAuth()
@ApiTags("User")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getAllUsers')
  getAll(){
    return this.userService.getAll();
  }

  @Get('findUser/:id')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }
  @Post('login')
  login(@Body()loginDto:LoginDTO){
    return this.userService.login(loginDto);
  }
  
  @Post('signUp')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Patch('updateUser/:id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
 