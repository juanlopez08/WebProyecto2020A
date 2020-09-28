import {IsNotEmpty, IsNumber, IsPositive, Min} from "class-validator";

export class UsuarioGuardaCuponUpdateDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    cantidadUsos: number
}