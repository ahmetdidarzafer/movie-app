import { PartialType } from '@nestjs/swagger';
import { CreateTmdbDto } from './create-tmdb.dto';

export class UpdateTmdbDto extends PartialType(CreateTmdbDto) {}
