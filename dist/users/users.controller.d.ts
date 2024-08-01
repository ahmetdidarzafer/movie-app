import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDTO } from "./dto/login.dto";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    login(loginDto: LoginDTO): Promise<{
        message: string;
        token: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & import("./entities/user.entity").User;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<void>;
}
