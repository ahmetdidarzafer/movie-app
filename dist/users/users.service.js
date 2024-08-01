"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getAll() {
        return await this.userRepository.find();
    }
    async create(createUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = hashedPassword;
            const savedUser = await this.userRepository.save(createUserDto);
            if (savedUser == null || savedUser == undefined) {
                throw new common_1.HttpException("Kullanıcı oluşturulamadı", 400);
            }
            return { message: "Kullanıcı oluşturuldu", user: savedUser };
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginDto) {
        try {
            const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
            if (user == undefined || user == null) {
                throw new common_1.HttpException("User not found", 404);
            }
            const result = await bcrypt.compare(loginDto.password, user.password);
            console.log(result);
            if (result == false) {
                throw new common_1.HttpException('Login Failed', 401);
            }
            const token = this.jwtService.sign({ id: user.id }, { expiresIn: '15d', privateKey: "adkjfbndabsnfknjadhfjvmnöamdhjmngöhkdahjfbmdajhlhön" });
            return { message: "Login Successful", token: token };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const usertoFind = await this.userRepository.findOne({ where: { id: id } });
            if (usertoFind == null || usertoFind == undefined) {
                throw new common_1.HttpException("User not found", 404);
            }
            return usertoFind;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateUserDto) {
        try {
            const userToUpdate = await this.userRepository.findOne({ where: { id: id } });
            const hashedOldPassword = await bcrypt.hash(updateUserDto.old_password, 10);
            if (userToUpdate == null || userToUpdate == undefined || userToUpdate.password != hashedOldPassword) {
                throw new common_1.HttpException("Old password does not match or there is no user to update", 404);
            }
            const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashedPassword;
            this.userRepository.merge(userToUpdate, updateUserDto);
            await this.userRepository.save(userToUpdate);
            return userToUpdate;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map