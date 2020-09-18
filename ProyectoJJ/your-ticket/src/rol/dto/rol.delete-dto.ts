import {IsAlphanumeric, IsNotEmpty, MaxLength} from "class-validator";

export class RolDeleteDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(45)
    tipoRol: string;
}