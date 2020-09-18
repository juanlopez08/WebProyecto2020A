import {IsAlpha, IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class UsuarioUpdateDto {

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
}