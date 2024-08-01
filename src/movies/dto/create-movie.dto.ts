import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateMovieDto {
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
