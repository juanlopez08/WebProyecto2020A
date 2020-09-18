import {IsAlphanumeric, IsNotEmpty, MaxLength} from "class-validator";

export class EstablecicmientoCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(60)
    nombreEstablecimiento: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(60)
    categoriaEstablecimiento: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(45)
    telefonoEstablecimiento: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(60)
    direccionEstablecimiento: string;
}