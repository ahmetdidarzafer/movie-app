"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTmdbDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_tmdb_dto_1 = require("./create-tmdb.dto");
class UpdateTmdbDto extends (0, swagger_1.PartialType)(create_tmdb_dto_1.CreateTmdbDto) {
}
exports.UpdateTmdbDto = UpdateTmdbDto;
//# sourceMappingURL=update-tmdb.dto.js.map