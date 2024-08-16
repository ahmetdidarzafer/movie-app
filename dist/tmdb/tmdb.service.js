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
exports.TmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const config_1 = require("@nestjs/config");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TmdbService = class TmdbService {
    constructor(httpService, configService, movieRepository) {
        this.httpService = httpService;
        this.configService = configService;
        this.movieRepository = movieRepository;
        this.apiKey = this.configService.get('API_KEY');
        this.baseUrl = 'https://api.themoviedb.org/3';
    }
    getMovieDetails(movieId) {
        const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe((0, operators_1.map)(response => response.data));
    }
    searchMovies(query) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
        return this.httpService.get(url).pipe((0, operators_1.map)(response => response.data));
    }
    getPopularMovies() {
        const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe((0, operators_1.map)(response => response.data)).toPromise();
    }
    async getTopRatedMovies() {
        try {
            const url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`;
            const result = await this.httpService.axiosRef.get(url)['data'];
            this.saveMoviesToDB(result.results);
            return result.results;
        }
        catch (error) {
            throw error;
        }
    }
    saveMoviesToDB(movies) {
        try {
            this.movieRepository.save(movies);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.TmdbService = TmdbService;
exports.TmdbService = TmdbService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService, typeorm_2.Repository])
], TmdbService);
//# sourceMappingURL=tmdb.service.js.map