import {IsAlphanumeric, IsNotEmpty, MaxLength} from "class-validator";

export class RolCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(45)
    tipoRol: string;
}