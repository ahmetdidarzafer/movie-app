import { HttpException, Injectable,Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(JwtService) private readonly jwtService:JwtService,
    private configService: ConfigService,
  ) { }
  async getAll(){
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userRepository.findOne({where:{username : createUserDto.username}})
      
      //BU KISIM ŞİFRE HASHLEMEK İÇİN KULLANLIR
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      //BU KISIM ŞİFRE HASHLEMEK İÇİN KULLANLIR
      createUserDto.password = hashedPassword;

      if(createUserDto.username == createdUser.username){
        throw new HttpException("This username already in use", 400);
      }

      const savedUser = await this.userRepository.save(createUserDto);

      if (savedUser == null || savedUser == undefined) {
        throw new HttpException("Could not create user", 400)
      }
      return { message: "User created", user: savedUser }
    } catch (error) {
      throw error
    }

  }

  async login(loginDto: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({ where: { email: loginDto.email } })
      if (user == undefined || user == null) {
        throw new HttpException("User not found", 404)
      }

      const result = await bcrypt.compare(loginDto.password, user.password);
      console.log(result);
      if (result == false){
        throw new HttpException('Login Failed', 401)
      }
      const token = this.jwtService.sign({id:user.id},{expiresIn:'15d',privateKey:this.configService.get<string>('JWT_SECRET')})
      return {message: "Login Successful", token:token};

   
    } catch (error) {
      throw error
    }
  }

  async findOneByUsername(username: string) {
    try {
      const usertoFind = await this.userRepository.findOne({ where: { username: username } });
      if (usertoFind == null || usertoFind == undefined) {
        throw new HttpException("User not found", 404)
      }
      return usertoFind;
    } catch (error) {
      throw error
    }

  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto) {

    try {
      const userToUpdate = await this.userRepository.findOne({ where: { id:id  } });
      if (userToUpdate == null || userToUpdate == undefined) {
        throw new HttpException("There is no user to update", 404);
      }
      const result = await bcrypt.compare(updateUserDto.old_password, userToUpdate.password);

      if (result == false){
        throw new HttpException('Old password does not match', 401);
      }
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
      //Object.assign(userToUpdate, updateUserDto);
      this.userRepository.merge(userToUpdate, updateUserDto);
      await this.userRepository.save(userToUpdate);

      return userToUpdate;
    }
    catch (error) {
      throw error;
    }

  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
  
}
