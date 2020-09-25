import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {EstablecimientoUpdateDto} from "../establecimiento/dto/establecimiento.update-dto";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";

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

        const stringConsulta = `&cedula=${parametrosCuerpo.cedula}`
            + `&nombreUsuario=${parametrosCuerpo.nombreUsuario}`
            + `&apellidoUsuario=${parametrosCuerpo.apellidoUsuario}`
            + `&correoUsuario=${parametrosCuerpo.correoUsuario}`
            + `&contrasenaUsuario=${parametrosCuerpo.contrasenaUsuario}`
            + `&fechaNacimiento=${parametrosCuerpo.fechaNacimiento}`

        if (!(parametrosCuerpo.cedula && parametrosCuerpo.nombreUsuario
            && parametrosCuerpo.apellidoUsuario && parametrosCuerpo.correoUsuario
            && parametrosCuerpo.contrasenaUsuario && parametrosCuerpo.fechaNacimiento)) {
            const mensajeError = 'Existen Campos vacíos'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + stringConsulta)
        }

        let respuesta;
        try {
            respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(usuarioValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/usuario/principal?error=Usuario Creado')
        } else {
            console.log('ERROR', errores)
            const mensajeError = 'Error Creando Usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const usuarioEditado = {
            idUsuario: Number(parametrosRuta.id),
            cedula: parametrosCuerpo.cedula,
            nombreUsuario: parametrosCuerpo.nombreUsuario,
            apellidoUsuario: parametrosCuerpo.apellidoUsuario,
            correoUsuario: parametrosCuerpo.correoUsuario,
            contrasenaUsuario: parametrosCuerpo.contrasenaUsuario,
            fechaNacimiento: parametrosCuerpo.fechaNacimiento,
        } as UsuarioEntity;

        const usuarioValido = new UsuarioUpdateDto();
        usuarioValido.nombreUsuario = parametrosCuerpo.nombreUsuario;
        usuarioValido.apellidoUsuario = parametrosCuerpo.apellidoUsuario;
        usuarioValido.correoUsuario = parametrosCuerpo.correoUsuario;
        usuarioValido.contrasenaUsuario = parametrosCuerpo.contrasenaUsuario;

        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/principal?error=Usuario Editado')
        } catch (e) {
            const mensajeError = 'Error Editando Usuario'
            return res.redirect('/usuario/principal?error=' + mensajeError)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/principal?error=Usuario eliminado')
        } catch (e) {
            console.log(e)
            return res.redirect('/usuario/principal?error=Error eliminando usuario')
        }
    }


    /*------------VISTAS------------*/
    @Get('principal')
    async principal(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Mostrando Usuarios'
            return res.redirect('/usuario/principal?error=' + mensajeError)
        }
        if (resultadoEncontrado) {
            return res.render(
                'usuario/principal',
                {
                    error: parametrosConsulta.error,
                    arregloUsuarios: resultadoEncontrado,
                }
            )
        } else {
            const mensajeError = 'Error Mostrando Usuarios'
            return res.redirect('/usuario/principal?error=' + mensajeError);
        }
    }

    @Get('vista/crear')
    crearCupon(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                cedula: parametrosConsulta.cedula,
                nombreUsuario: parametrosConsulta.nombreUsuario,
                apellidoUsuario: parametrosConsulta.apellidoUsuario,
                correoUsuario: parametrosConsulta.correoUsuario,
                contrasenaUsuario: parametrosConsulta.contrasenaUsuario,
                fechaNacimiento: parametrosConsulta.fechaNacimiento,
            }
        )
    }

    @Get('vista/editar/:id')
    async editarUsuario(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        } catch (e) {
            console.log('Error del servidor')
            return res.redirect('/usuario/principal?error= Error buscando usuario')
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado,
                }
            )
        }
    }


}
