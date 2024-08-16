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
exports.TmdbController = void 0;
const common_1 = require("@nestjs/common");
const tmdb_service_1 = require("./tmdb.service");
const swagger_1 = require("@nestjs/swagger");
let TmdbController = class TmdbController {
    constructor(tmdbService) {
        this.tmdbService = tmdbService;
    }
    getMovieDetails(id) {
        return this.tmdbService.getMovieDetails(id);
    }
    searchMovies(query) {
        return this.tmdbService.searchMovies(query);
    }
    getPopularMovies() {
        return this.tmdbService.getPopularMovies();
    }
    getTopRatedMovies() {
        return this.tmdbService.getTopRatedMovies();
    }
};
exports.TmdbController = TmdbController;
__decorate([
    (0, common_1.Get)('movie/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get movie details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the movie' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TmdbController.prototype, "getMovieDetails", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search movies by query' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: 'Search term for the movie' }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TmdbController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiOperation)({ summary: 'Get popular movies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TmdbController.prototype, "getPopularMovies", null);
__decorate([
    (0, common_1.Get)('topRated'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top rated movies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TmdbController.prototype, "getTopRatedMovies", null);
exports.TmdbController = TmdbController = __decorate([
    (0, swagger_1.ApiTags)('TMDB'),
    (0, common_1.Controller)('movies'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [tmdb_service_1.TmdbService])
], TmdbController);
//# sourceMappingURL=tmdb.controller.js.map