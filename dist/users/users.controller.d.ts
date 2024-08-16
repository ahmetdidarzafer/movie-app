import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDTO } from "./dto/login.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getAll(): Promise<import("./entities/user.entity").User[]>;
    findOneByUsername(username: string): Promise<import("./entities/user.entity").User>;
    login(loginDto: LoginDTO): Promise<{
        message: string;
        token: string;
        user: import("./entities/user.entity").User;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & import("./entities/user.entity").User;
    }>;
    update(username: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    }>;
    remove(username: string, deleteUserDto: DeleteUserDto): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    }>;
}
