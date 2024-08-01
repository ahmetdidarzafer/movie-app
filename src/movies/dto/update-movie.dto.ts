import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto{
    @IsNotEmpty()
    @ApiProperty({description: "moviename"})
    readonly moviename: string;

    @IsNotEmpty()
    @ApiProperty({description: "director"})
    readonly director: string;

    @IsNotEmpty()
    @ApiProperty({description: "year"})
    readonly year: number;

    @IsNotEmpty()
    @ApiProperty({description: "imdbrating"})
    readonly imdbrating: string;
}
