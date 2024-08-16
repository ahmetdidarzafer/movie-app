import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class MovieDto {
    @ApiProperty({ description: 'The movie ID' })
    id: number;
  
    @ApiProperty({ description: 'The movie title' })
    title: string;
  
    @ApiProperty({ description: 'Overview of the movie' })
    overview: string;
  
    @ApiProperty({ description: 'Poster path of the movie' })
    poster_path?: string;
  }


export class PopularMoviesDto {
  @ApiProperty({ description: 'The page number' })
  page: number;

  @ApiProperty({ description: 'Total number of pages' })
  total_pages: number;

  @ApiProperty({ description: 'Total number of results' })
  total_results: number;

  @ApiProperty({
    description: 'List of popular movies',
    type: [MovieDto],
  })
  results: MovieDto[];
}
export class TopRatedMoviesDto {
  @ApiProperty({ description: 'The page number' })
  page: number;

  @ApiProperty({ description: 'Total number of pages' })
  total_pages: number;

  @ApiProperty({ description: 'Total number of results' })
  total_results: number;

  @ApiProperty({
    description: 'List of popular movies',
    type: [Movie],
  })
  results: Movie[];
}


