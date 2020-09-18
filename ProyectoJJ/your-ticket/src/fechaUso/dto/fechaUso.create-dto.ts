import {IsDate, IsDateString, IsNotEmpty} from "class-validator";

export class FechaUsoCreateDto {

    @IsNotEmpty()
    @IsDate()
    @IsDateString()
    fechaUso: string;
}