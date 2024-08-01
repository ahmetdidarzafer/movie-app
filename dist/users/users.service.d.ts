import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    getAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & User;
    }>;
    login(loginDto: LoginDTO): Promise<{
        message: string;
        token: string;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
