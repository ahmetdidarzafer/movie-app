
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'boolean' })
    adult: boolean;

    @Column({ type: 'text', nullable: true })
    backdrop_path: string;

    @Column('int', { array: true,  })
    genre_ids: number[];

    @Column({ type: 'varchar', length: 255, })
    original_language: string;

    @Column({ type: 'varchar', length: 255, })
    original_title: string;

    @Column({ type: 'text', nullable: true })
    overview: string;

    @Column({ type: 'float' })
    popularity: number;

    @Column({ type: 'text', nullable: true })
    poster_path: string;

    @Column({ type: 'date' })
    release_date: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'boolean' })
    video: boolean;

    @Column({ type: 'float' })
    vote_average: number;

    @Column({ type: 'int' })
    vote_count: number;
    @ManyToMany(() => User, user => user.favoritedMovies)
    users: User[] //| number[]
}
