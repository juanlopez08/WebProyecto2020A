import {IsAlphanumeric, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";


export class CuponUpdateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    pathImagenCupon: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    pathCodigoQRCupon: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    informacionCupon: string;

    @IsNotEmpty()
    @IsIn(['activo', 'inactivo'])
    estadoCupon: string;

    @IsNotEmpty()
    @IsNumber()
    cantidadUsos: number;
}