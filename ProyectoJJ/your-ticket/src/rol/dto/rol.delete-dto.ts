import {IsAlphanumeric, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RolDeleteDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    tipoRol: string;
}