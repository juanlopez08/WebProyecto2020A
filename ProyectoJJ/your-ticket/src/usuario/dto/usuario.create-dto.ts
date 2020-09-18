import {IsAlpha, IsAlphanumeric, IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class UsuarioCreateDto {

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    nombreUsuario: string;

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    apellidoUsuario: string;

    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail()
    correoUsuario: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    contrasenaUsuario: string;

    @IsNotEmpty()
    @IsDate()
    @IsDateString()
    fechaNacimiento: string;
}