import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class UsuarioGuardaCuponCreateDto {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cantidadUsos: number
}