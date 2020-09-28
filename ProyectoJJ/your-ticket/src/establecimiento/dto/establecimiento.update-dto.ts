import {IsAlphanumeric, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class EstablecimientoUpdateDto {

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
    @IsAlphanumeric()
    @MaxLength(45)
    telefonoEstablecimiento: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    direccionEstablecimiento: string;
}