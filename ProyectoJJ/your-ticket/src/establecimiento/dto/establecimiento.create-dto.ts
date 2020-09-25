import {IsAlphanumeric, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class EstablecimientoCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    nombreEstablecimiento: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    pathImagenEstablecimiento: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    categoriaEstablecimiento: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(45)
    telefonoEstablecimiento: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    direccionEstablecimiento: string;
}