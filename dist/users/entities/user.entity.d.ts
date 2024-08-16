import { Movie } from 'src/tmdb/entities/movie.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    favoritedMovies: Movie[] | number[];
}
