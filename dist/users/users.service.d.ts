import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DeleteUserDto } from './dto/delete-user.dto';
export declare class UsersService {
    private userRepository;
    private readonly jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    getAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & User;
    }>;
    login(loginDto: LoginDTO): Promise<{
        message: string;
        token: string;
        user: User;
    }>;
    findOneByUsername(username: string): Promise<User>;
    updatePassword(username: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: User;
    }>;
    remove(username: string, deleteUserDto: DeleteUserDto): Promise<{
        message: string;
        user: User;
    }>;
}
