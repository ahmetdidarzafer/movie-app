import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { PopularMoviesDto } from './dto/popular-movies.dto';

@Injectable()
export class TmdbService {
  private readonly apiKey: string = 'b0f26a52c899527a0ae8bd2aa6a05329';
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) {}

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
}
