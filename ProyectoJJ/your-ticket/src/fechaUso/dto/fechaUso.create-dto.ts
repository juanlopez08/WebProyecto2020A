import {IsNotEmpty, IsString} from "class-validator";

export class FechaUsoCreateDto {

    @IsNotEmpty()
    @IsString()
    fechaUso: string;
}