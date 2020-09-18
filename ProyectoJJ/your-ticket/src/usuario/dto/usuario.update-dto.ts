import {IsAlpha, IsNotEmpty, IsString, MaxLength} from "class-validator";

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
    @IsString()
    @MaxLength(60)
    contrasenaUsuario: string;
}