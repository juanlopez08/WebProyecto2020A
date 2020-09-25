import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class UsuarioLoginDto {

    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail()
    correoUsuario: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    contrasenaUsuario: string;
}