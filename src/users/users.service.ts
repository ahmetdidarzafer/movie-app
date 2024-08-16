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
import { DeleteUserDto } from './dto/delete-user.dto';
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
      const createdUser = await this.userRepository.findOne({where:{username : createUserDto.username}});
      const createdUserByMail = await this.userRepository.findOne({where:{email:createUserDto.email}});

      //BU KISIM ŞİFRE HASHLEMEK İÇİN KULLANLIR
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      //BU KISIM ŞİFRE HASHLEMEK İÇİN KULLANLIR
      createUserDto.password = hashedPassword;

      if(createdUserByMail == null || createdUserByMail == undefined){
        if(createdUser == null || createdUser == undefined){
        
          const savedUser = await this.userRepository.save(createUserDto);
  
          if (savedUser == null || savedUser == undefined) {
            throw new HttpException("Could not create user", 400)
          }
          return { message: "Kullanıcı Oluşturuldu", user: savedUser}
        }
      }
      throw new HttpException("Username or mail already in use", 400);
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
      return {message: "Login Successful", token:token, user: user};
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

  async updatePassword(username: string, updateUserDto: UpdateUserDto) {

    try {
      const userToUpdate = await this.userRepository.findOne({ where: { username: username } });
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

      return {message: "User password changed", user: userToUpdate};
    }
    catch (error) {
      throw error;
    }

  }

  async remove(username: string, deleteUserDto: DeleteUserDto) {
    try{
      const userToDelete = await this.userRepository.findOne({ where: { username: username } });
      if (userToDelete == null || userToDelete == undefined) {
        throw new HttpException("There is no user to delete", 404);
      }
      const result = await bcrypt.compare(deleteUserDto.password, userToDelete.password);

      if (result == false){
        throw new HttpException('Password does not match', 401);
      }
      await this.userRepository.delete(userToDelete.id);
      return {message: 'User deleted', user: userToDelete};
    }
    catch(error){
      throw error;
    }
  }
  
}
