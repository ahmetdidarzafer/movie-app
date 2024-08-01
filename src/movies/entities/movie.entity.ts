import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    moviename: string;

    @Column()
    director: string;

    @Column()
    year: number;

    @Column()
    imdbrating: string;
}
