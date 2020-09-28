import {IsAlphanumeric, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";


export class CuponUpdateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    pathImagenCupon: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    pathCodigoQRCupon: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    informacionCupon: string;

    @IsNotEmpty()
    @IsIn(['Activo', 'Inactivo'])
    estadoCupon: string;

    @IsNotEmpty()
    @IsNumber()
    cantidadUsos: number;
}