import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {CuponService} from "./cupon.service";
import {CuponCreateDto} from "./dto/cupon.create-dto";
import {validate, ValidationError} from "class-validator";
import {EstablecimientoService} from "../establecimiento/establecimiento.service";
import {CuponUpdateDto} from "./dto/cupon.update-dto";
import {CuponEntity} from "./cupon.entity";
import {UsuarioGuardaCuponService} from "../usuarioGuardaCupon/usuarioGuardaCupon.service";
import {UsuarioGuardaCuponCreateDto} from "../usuarioGuardaCupon/dto/usuarioGuardaCupon.create-dto";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";
import {type} from "os";

@Controller('cupon')
export class CuponController {

    constructor(
        private readonly _cuponService: CuponService,
        private readonly _establecimientoService: EstablecimientoService,
        private readonly _usuarioGuardaCuponService: UsuarioGuardaCuponService,
    ) {
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const cuponValido = new CuponCreateDto()
        cuponValido.pathImagenCupon = parametrosCuerpo.pathImagenCupon;
        cuponValido.pathCodigoQRCupon = parametrosCuerpo.pathCodigoQRCupon;
        cuponValido.informacionCupon = parametrosCuerpo.informacionCupon;
        cuponValido.estadoCupon = parametrosCuerpo.estadoCupon;
        cuponValido.cantidadUsos = Number(parametrosCuerpo.cantidadUsos);

        let stringConsulta = `&pathImagenCupon=${parametrosCuerpo.pathImagenCupon}`
            + `&pathCodigoQRCupon=${parametrosCuerpo.pathCodigoQRCupon}`
            + `&informacionCupon=${parametrosCuerpo.informacionCupon}`
            + `&estadoCupon=${parametrosCuerpo.estadoCupon}`
            + `&cantidadUsos=${parametrosCuerpo.cantidadUsos}`
            + `&establecimiento=${parametrosCuerpo.establecimiento}`

        if (!(parametrosCuerpo.pathImagenCupon && parametrosCuerpo.pathCodigoQRCupon
            && parametrosCuerpo.informacionCupon && parametrosCuerpo.estadoCupon
            && parametrosCuerpo.cantidadUsos && parametrosCuerpo.establecimiento)) {
            const mensajeError = 'Existen Campos vacíos'
            return res.redirect('/cupon/vista/crear?error=' + mensajeError + stringConsulta)
        }
        let respuesta
        try {
            respuesta = await this._cuponService.crearUno(parametrosCuerpo)
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Cupon'
            return res.redirect('/cupon/vista/crear?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(cuponValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/cupon/principal?error=Cupon Creado');
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Creando Cupon';
            return res.redirect('/cupon/vista/crear?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const idCupon = Number(parametrosRuta.id)
        const cuponEditado = {
            idCupon: idCupon,
            pathImagenCupon: parametrosCuerpo.pathImagenCupon,
            pathCodigoQRCupon: parametrosCuerpo.pathCodigoQRCupon,
            informacionCupon: parametrosCuerpo.informacionCupon,
            estadoCupon: parametrosCuerpo.estadoCupon,
            cantidadUsos: Number(parametrosCuerpo.cantidadUsos),
        } as CuponEntity;

        const cuponValido = new CuponUpdateDto()
        cuponValido.pathImagenCupon = cuponEditado.pathImagenCupon;
        cuponValido.pathCodigoQRCupon = cuponEditado.pathCodigoQRCupon;
        cuponValido.informacionCupon = cuponEditado.informacionCupon;
        cuponValido.estadoCupon = cuponEditado.estadoCupon;
        cuponValido.cantidadUsos = Number(cuponEditado.cantidadUsos);

        let stringConsulta = `&pathImagenCupon=${parametrosCuerpo.pathImagenCupon}`
            + `&pathCodigoQRCupon=${parametrosCuerpo.pathCodigoQRCupon}`
            + `&informacionCupon=${parametrosCuerpo.informacionCupon}`
            + `&estadoCupon=${parametrosCuerpo.estadoCupon}`
            + `&cantidadUsos=${parametrosCuerpo.cantidadUsos}`

        let respuesta
        try {
            respuesta = await this._cuponService.editarUno(cuponEditado);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Editando Cupon'
            return res.redirect('/cupon/vista/editar/' + idCupon + '?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(cuponValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/cupon/principal?error=Cupon Editado')
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Editando Cupon'
            return res.redirect('/cupon/vista/editar/' + idCupon + '?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._cuponService.eliminarUno(id)
            return res.redirect('/cupon/principal?error=Cupón eliminado')
        } catch (e) {
            console.log(e)
            return res.redirect('/cupon/principal?error=Error eliminando cupón')
        }
    }

    @Post('guardar/:id')
    async guardarCupon(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Session() session,
        @Res() res,
    ) {
        let cuponYaGuardado;
        const idCupon = Number(parametrosRuta.id)
        if (typeof session.correoUsuario != 'undefined') {
            const cuponValido = new UsuarioGuardaCuponCreateDto();
            cuponValido.cantidadUsos = parametrosCuerpo.cantidadUsos;

            cuponYaGuardado = await this._usuarioGuardaCuponService.buscarUnoGuardado(idCupon, Number(session.idUsuario))

            if (!cuponYaGuardado) {
                const cuponGuardado = {
                    cantidadUsos: cuponValido.cantidadUsos,
                    cupon: parametrosRuta.id,
                    usuario: session.idUsuario,
                } as UsuarioGuardaCuponEntity;

                await this._usuarioGuardaCuponService.crearUno(cuponGuardado)

                return res.redirect('/cuponesGuardados?error=Cupon Guardado')
            }
        } else {
            return res.redirect('/cupon/vista/informacion/' + parametrosRuta.id + '?error=Debe estar logeado')
        }
    }

    @Post('quitar/:id')
    async quitarCupon(
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        let cuponYaGuardado;
        const idCupon = Number(parametrosRuta.id);
        const idUsuario = Number(session.idUsuario)
        cuponYaGuardado = await this._usuarioGuardaCuponService.buscarUnoGuardado(idCupon, idUsuario);
        await this._usuarioGuardaCuponService.eliminarUno(cuponYaGuardado.idUsuarioGuardaCupon);
        return res.redirect('/cuponesGuardados?error=Cupon removido');
    }


    /*------------VISTAS------------*/
    @Get('principal')
    async principal(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this._cuponService.buscarTodos(parametrosConsulta.busqueda);
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Mostrando Cupones'
            return res.redirect('/cupon/principal?error=' + mensajeError)
        }
        if (resultadoEncontrado) {
            return res.render(
                'cupon/principal',
                {
                    error: parametrosConsulta.error,
                    arregloCupones: resultadoEncontrado,
                    logeado: session.correoUsuario,
                }
            )
        } else {
            const mensajeError = 'Error Mostrando Cupones'
            return res.redirect('/cupon/principal?error=' + mensajeError);
        }
    }

    @Get('vista/crear')
    crearCupon(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        return res.render(
            'cupon/crear',
            {
                error: parametrosConsulta.error,
                idCupon: parametrosConsulta.idCupon,
                pathImagenCupon: parametrosConsulta.pathImagenCupon,
                pathCodigoQRCupon: parametrosConsulta.pathCodigoQRCupon,
                informacionCupon: parametrosConsulta.informacionCupon,
                estadoCupon: parametrosConsulta.estadoCupon,
                cantidadUsos: parametrosConsulta.cantidadUsos,
                establecimiento: parametrosConsulta.establecimiento,
                logeado: session.correoUsuario,
            }
        )
    }

    @Get('vista/editar/:id')
    async editarCupon(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        const id = Number(parametrosRuta.id)
        let cuponEncontrado
        try {
            cuponEncontrado = await this._cuponService.buscarUno(id)
        } catch (e) {
            console.log('Error del servidor')
            return res.redirect('/cupon/principal?error= Error buscando cupon')
        }
        if (cuponEncontrado) {
            return res.render(
                'cupon/crear',
                {
                    error: parametrosConsulta.error,
                    cupon: cuponEncontrado,
                    logeado: session.correoUsuario,
                }
            )
        }
    }

    @Get('vista/informacion/:id')
    async informacion(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session,
    ) {
        const idCupon = Number(parametrosRuta.id);
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._cuponService.buscarUno(idCupon)
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Mostrando Información del Cupón'
            return res.redirect('/cupon/principal?error=' + mensajeError);
        }

        const cuponGuardado = await this._usuarioGuardaCuponService.buscarUnoGuardado(idCupon, Number(session.idUsuario))

        let existeCuponGuardado
        if (cuponGuardado) {
            existeCuponGuardado = true;
        } else {
            existeCuponGuardado = false
        }

        if (resultadoEncontrado) {
            return res.render(
                'cupon/informacion',
                {
                    error: parametrosConsulta.error,
                    cupon: resultadoEncontrado,
                    cuponGuardado: existeCuponGuardado,
                    logeado: session.correoUsuario,
                }
            )
        } else {
            const mensajeError = 'Error Mostrando Información del Cupón'
            return res.redirect('/cupon/principal?error=' + mensajeError)
        }

    }
}