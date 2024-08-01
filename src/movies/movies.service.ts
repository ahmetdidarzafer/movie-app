import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie)private readonly moviesRepository:Repository<Movie>){}
  
  async create(createMovieDto: CreateMovieDto) {
    const newUser = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(newUser)  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: number) {
    try {
      const movietoFind = await this.moviesRepository.findOne({ where: { id: id } });
      if(movietoFind==null || movietoFind==undefined ){
        throw new  HttpException("Movie not found",404)
      }
      return movietoFind;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      const movietoUpdate = await this.moviesRepository.findOne({ where: { id: id } });
      if(movietoUpdate==null || movietoUpdate==undefined ){
        throw new  HttpException("There is No User to Update",404)
      }
      Object.assign(movietoUpdate, updateMovieDto);

      await this.moviesRepository.save(movietoUpdate);


      return movietoUpdate;
    } 
    catch (error) {
      
    }
  }

  async remove(id: number) {
    await this.moviesRepository.delete(id);
  }
}
