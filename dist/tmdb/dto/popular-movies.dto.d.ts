import { Movie } from '../entities/movie.entity';
export declare class MovieDto {
    id: number;
    title: string;
    overview: string;
    poster_path?: string;
}
export declare class PopularMoviesDto {
    page: number;
    total_pages: number;
    total_results: number;
    results: MovieDto[];
}
export declare class TopRatedMoviesDto {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}
