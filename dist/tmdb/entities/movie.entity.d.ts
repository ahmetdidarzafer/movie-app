import { User } from 'src/users/entities/user.entity';
export declare class Movie {
    id: number;
    adult: boolean;
    backdropPath: string;
    genreIds: number[];
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    users: User[] | number[];
}
