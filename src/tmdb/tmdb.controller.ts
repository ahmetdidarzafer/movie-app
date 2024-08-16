import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PopularMoviesDto, MovieDto, TopRatedMoviesDto } from './dto/popular-movies.dto';
import { Movie } from './entities/movie.entity';

interface favoriteMovieDto {
  movieId: number
}
@ApiTags('TMDB')
@Controller('movies')
@ApiBearerAuth()
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) { }

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
  getTopRatedMovies(): Promise<Movie[]> {
    return this.tmdbService.getTopRatedMovies();
  }
  @Post('addFavorite')
  @ApiOperation({ summary: 'Add movie to user favorites' })
  addFavorite(@Body() dto: favoriteMovieDto, @Request() req) {
    console.log(dto)
    const userId = req.body.id; // Kullanıcının ID'sini almak
    return this.tmdbService.addToFavorites(userId, dto.movieId);
  }
}
