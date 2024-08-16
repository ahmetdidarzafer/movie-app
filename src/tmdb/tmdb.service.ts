import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { PopularMoviesDto, TopRatedMoviesDto } from './dto/popular-movies.dto';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TmdbService {
  private readonly apiKey: string = this.configService.get<string>('API_KEY');
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(
    private readonly httpService: HttpService, private configService: ConfigService, @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>, @InjectRepository(User)
    private userRepository: Repository<User>,) { }

  getMovieDetails(movieId: number) {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.httpService.get(url).pipe(map(response => response.data));
  }

  searchMovies(query: string) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.httpService.get(url).pipe(map(response => response.data));
  }

  getPopularMovies(): Promise<PopularMoviesDto> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.httpService.get(url).pipe(map(response => response.data)).toPromise();
  }
  async getTopRatedMovies(): Promise<Movie[]> {
    try {
      const movies = await this.movieRepository.find({})
      return movies
    } catch (error) {
      console.error('Error fetching top rated movies:', error); // Log error for debugging
      throw error;
    }
  }
  async addToFavorites(userId: number, movieId: number): Promise<void> {
    try {
    
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoritedMovies']

      });
     
      if (!user) {
        throw new Error('User not found');
      }

      const movie = await this.movieRepository.findOne({ where: { id: movieId } });
      console.log(movie)
      if (!movie) {
        throw new Error('Movie not found');
      }

      if (!user.favoritedMovies.some(m => m.id === movieId)) {
        user.favoritedMovies.push(movie);
      }

      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      throw error;
    }
  }

  /*private saveMoviesToDB(movies: Movie[]) {
    try {
      console.log("SAVE MOVIES TO DB")
      console.log("MOVIES:"+JSON.stringify(movies))
      this.movieRepository.save(movies)
    } catch (error) {
      console.log(error)
    }
  }*/
}
