import { TmdbService } from './tmdb.service';
import { PopularMoviesDto } from './dto/popular-movies.dto';
import { Movie } from './entities/movie.entity';
export declare class TmdbController {
    private readonly tmdbService;
    constructor(tmdbService: TmdbService);
    getMovieDetails(id: number): import("rxjs").Observable<any>;
    searchMovies(query: string): import("rxjs").Observable<any>;
    getPopularMovies(): Promise<PopularMoviesDto>;
    getTopRatedMovies(): Promise<Movie[]>;
}
