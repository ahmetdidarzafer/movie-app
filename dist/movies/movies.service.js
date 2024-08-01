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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_2 = require("typeorm");
let MoviesService = class MoviesService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    async create(createMovieDto) {
        const newUser = this.moviesRepository.create(createMovieDto);
        return await this.moviesRepository.save(newUser);
    }
    async findAll() {
        return await this.moviesRepository.find();
    }
    async findOne(id) {
        try {
            const movietoFind = await this.moviesRepository.findOne({ where: { id: id } });
            if (movietoFind == null || movietoFind == undefined) {
                throw new common_1.HttpException("Movie not found", 404);
            }
            return movietoFind;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateMovieDto) {
        try {
            const movietoUpdate = await this.moviesRepository.findOne({ where: { id: id } });
            if (movietoUpdate == null || movietoUpdate == undefined) {
                throw new common_1.HttpException("There is No User to Update", 404);
            }
            Object.assign(movietoUpdate, updateMovieDto);
            await this.moviesRepository.save(movietoUpdate);
            return movietoUpdate;
        }
        catch (error) {
        }
    }
    async remove(id) {
        await this.moviesRepository.delete(id);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map