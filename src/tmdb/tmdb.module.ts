import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TmdbService } from './tmdb.service';
import { TmdbController } from './tmdb.controller';
import { Movie } from './entities/movie.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Movie]),TypeOrmModule.forFeature([User])],
  providers: [TmdbService],
  controllers: [TmdbController],
  exports: [TmdbService],
})
export class TmdbModule {}
