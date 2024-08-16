import { HttpService } from '@nestjs/axios';
import { PopularMoviesDto } from './dto/popular-movies.dto';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
export declare class TmdbService {
    private readonly httpService;
    private configService;
    private readonly movieRepository;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService, configService: ConfigService, movieRepository: Repository<Movie>);
    getMovieDetails(movieId: number): import("rxjs").Observable<any>;
    searchMovies(query: string): import("rxjs").Observable<any>;
    getPopularMovies(): Promise<PopularMoviesDto>;
    getTopRatedMovies(): Promise<Movie[]>;
    private saveMoviesToDB;
}
