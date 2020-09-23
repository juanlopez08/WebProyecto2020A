import {BadRequestException, Body, Controller, Get, Post, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const usuarioValido = new UsuarioCreateDto();
        usuarioValido.cedula = parametrosCuerpo.cedula;
        usuarioValido.nombreUsuario = parametrosCuerpo.nombreUsuario;
        usuarioValido.apellidoUsuario = parametrosCuerpo.apellidoUsuario;
        usuarioValido.correoUsuario = parametrosCuerpo.correoUsuario;
        usuarioValido.contrasenaUsuario = parametrosCuerpo.contrasenaUsuario;
        usuarioValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        try {
            const errores: ValidationError[] = await validate(usuarioValido);
            if (errores.length > 0){
                console.log('ERROR', errores)
            }else{
                const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
                return respuesta;
            }
        } catch (e) {
            console.log(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }

//    VISTAS

}
