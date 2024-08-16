import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Movie } from 'src/tmdb/entities/movie.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @ManyToMany(() => Movie, movie => movie.users)
  @JoinTable({ name: "users-favorites", joinColumn: { name: "user" }, inverseJoinColumn: { name: "movie" } })
  favoritedMovies: Movie[] //| number[]
}