import {IsAlphanumeric, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RolCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    tipoRol: string;
}