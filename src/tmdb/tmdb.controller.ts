import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PopularMoviesDto, MovieDto, TopRatedMoviesDto } from './dto/popular-movies.dto';

@ApiTags('TMDB')
@Controller('movies')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('movie/:id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiParam({ name: 'id', description: 'ID of the movie' })
  getMovieDetails(@Param('id') id: number) {
    return this.tmdbService.getMovieDetails(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by query' })
  @ApiQuery({ name: 'query', description: 'Search term for the movie' })
  searchMovies(@Query('query') query: string) {
    return this.tmdbService.searchMovies(query);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies' })
  getPopularMovies(): Promise<PopularMoviesDto> {
    return this.tmdbService.getPopularMovies();
  }
  @Get('topRated')
  @ApiOperation({ summary: 'Get top rated movies' })
  getTopRatedMovies(): Promise<TopRatedMoviesDto> {
    return this.tmdbService.getTopRatedMovies();
  }
}
