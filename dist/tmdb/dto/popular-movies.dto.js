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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopRatedMoviesDto = exports.PopularMoviesDto = exports.MovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const movie_entity_1 = require("../entities/movie.entity");
class MovieDto {
}
exports.MovieDto = MovieDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The movie ID' }),
    __metadata("design:type", Number)
], MovieDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The movie title' }),
    __metadata("design:type", String)
], MovieDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overview of the movie' }),
    __metadata("design:type", String)
], MovieDto.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Poster path of the movie' }),
    __metadata("design:type", String)
], MovieDto.prototype, "poster_path", void 0);
class PopularMoviesDto {
}
exports.PopularMoviesDto = PopularMoviesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The page number' }),
    __metadata("design:type", Number)
], PopularMoviesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PopularMoviesDto.prototype, "total_pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of results' }),
    __metadata("design:type", Number)
], PopularMoviesDto.prototype, "total_results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of popular movies',
        type: [MovieDto],
    }),
    __metadata("design:type", Array)
], PopularMoviesDto.prototype, "results", void 0);
class TopRatedMoviesDto {
}
exports.TopRatedMoviesDto = TopRatedMoviesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The page number' }),
    __metadata("design:type", Number)
], TopRatedMoviesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages' }),
    __metadata("design:type", Number)
], TopRatedMoviesDto.prototype, "total_pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of results' }),
    __metadata("design:type", Number)
], TopRatedMoviesDto.prototype, "total_results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of popular movies',
        type: [movie_entity_1.Movie],
    }),
    __metadata("design:type", Array)
], TopRatedMoviesDto.prototype, "results", void 0);
//# sourceMappingURL=popular-movies.dto.js.map