"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TmdbModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const tmdb_service_1 = require("./tmdb.service");
const tmdb_controller_1 = require("./tmdb.controller");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_1 = require("@nestjs/typeorm");
let TmdbModule = class TmdbModule {
};
exports.TmdbModule = TmdbModule;
exports.TmdbModule = TmdbModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, typeorm_1.TypeOrmModule.forFeature([movie_entity_1.Movie])],
        providers: [tmdb_service_1.TmdbService],
        controllers: [tmdb_controller_1.TmdbController],
        exports: [tmdb_service_1.TmdbService],
    })
], TmdbModule);
//# sourceMappingURL=tmdb.module.js.map