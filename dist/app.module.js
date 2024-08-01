"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const users_module_1 = require("./users/users.module");
const movies_module_1 = require("./movies/movies.module");
const movie_entity_1 = require("./movies/entities/movie.entity");
const auth_middleware_1 = require("./middleware/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('movies');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'db',
                port: 5432,
                username: 'azafer',
                password: 'ahmet123',
                database: 'movie_db',
                entities: [user_entity_1.User, movie_entity_1.Movie],
                synchronize: true,
                logging: true
            }),
            users_module_1.UsersModule,
            movies_module_1.MoviesModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map