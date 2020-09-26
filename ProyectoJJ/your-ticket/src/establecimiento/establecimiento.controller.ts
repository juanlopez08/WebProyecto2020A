import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {EstablecimientoService} from "./establecimiento.service";
import {CuponService} from "../cupon/cupon.service";
import {validate, ValidationError} from "class-validator";
import {EstablecimientoCreateDto} from "./dto/establecimiento.create-dto";
import {EstablecimientoUpdateDto} from "./dto/establecimiento.update-dto";
import {EstablecimientoEntity} from "./establecimiento.entity";

@Controller('establecimiento')
export class EstablecimientoController {

    constructor(
        private readonly _establecimientoService: EstablecimientoService,
        private readonly _cuponService: CuponService,
    ) {
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const establecimientoValido = new EstablecimientoCreateDto()
        establecimientoValido.nombreEstablecimiento = parametrosCuerpo.nombreEstablecimiento;
        establecimientoValido.pathImagenEstablecimiento = parametrosCuerpo.pathImagenEstablecimiento;
        establecimientoValido.categoriaEstablecimiento = parametrosCuerpo.categoriaEstablecimiento;
        establecimientoValido.telefonoEstablecimiento = parametrosCuerpo.telefonoEstablecimiento;
        establecimientoValido.direccionEstablecimiento = parametrosCuerpo.direccionEstablecimiento;

        let stringConsulta = `&nombreEstablecimiento=${parametrosCuerpo.nombreEstablecimiento}`
            + `&pathImagenEstablecimiento=${parametrosCuerpo.pathImagenEstablecimiento}`
            + `&categoriaEstablecimiento=${parametrosCuerpo.categoriaEstablecimiento}`
            + `&telefonoEstablecimiento=${parametrosCuerpo.telefonoEstablecimiento}`
            + `&direccionEstablecimiento=${parametrosCuerpo.direccionEstablecimiento}`

        if (!(parametrosCuerpo.nombreEstablecimiento && parametrosCuerpo.pathImagenEstablecimiento
            && parametrosCuerpo.categoriaEstablecimiento && parametrosCuerpo.telefonoEstablecimiento
            && parametrosCuerpo.direccionEstablecimiento)) {
            const mensajeError = 'Existen Campos vacíos'
            return res.redirect('/establecimiento/vista/crear?error=' + mensajeError + stringConsulta)
        }
        let respuesta
        try {
            respuesta = await this._establecimientoService.crearUno(parametrosCuerpo)
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Establecimiento'
            return res.redirect('/establecimiento/vista/crear?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(establecimientoValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/establecimiento/principal?error=Establecimiento Creado');
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Creando Establecimiento';
            return res.redirect('/establecimiento/vista/crear?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const idEstablecimiento = Number(parametrosRuta.id)
        const establecimientoEditado = {
            idEstablecimiento: idEstablecimiento,
            nombreEstablecimiento: parametrosCuerpo.nombreEstablecimiento,
            pathImagenEstablecimiento: parametrosCuerpo.pathImagenEstablecimiento,
            categoriaEstablecimiento: parametrosCuerpo.categoriaEstablecimiento,
            telefonoEstablecimiento: parametrosCuerpo.telefonoEstablecimiento,
            direccionEstablecimiento: parametrosCuerpo.direccionEstablecimiento,
        } as EstablecimientoEntity;

        const establecimientoValido = new EstablecimientoUpdateDto()
        establecimientoValido.nombreEstablecimiento = establecimientoEditado.nombreEstablecimiento;
        establecimientoValido.pathImagenEstablecimiento = establecimientoEditado.pathImagenEstablecimiento;
        establecimientoValido.categoriaEstablecimiento = establecimientoEditado.categoriaEstablecimiento;
        establecimientoValido.telefonoEstablecimiento = establecimientoEditado.telefonoEstablecimiento;
        establecimientoValido.direccionEstablecimiento = establecimientoEditado.direccionEstablecimiento;

        let stringConsulta = `&nombreEstablecimiento=${parametrosCuerpo.nombreEstablecimiento}`
            + `&pathImagenEstablecimiento=${parametrosCuerpo.pathImagenEstablecimiento}`
            + `&categoriaEstablecimiento=${parametrosCuerpo.categoriaEstablecimiento}`
            + `&telefonoEstablecimiento=${parametrosCuerpo.telefonoEstablecimiento}`
            + `&direccionEstablecimiento=${parametrosCuerpo.direccionEstablecimiento}`

        let respuesta
        try {
            respuesta = await this._establecimientoService.editarUno(establecimientoEditado);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Establecimiento'
            return res.redirect('/establecimiento/vista/editar/' + idEstablecimiento + '?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(establecimientoValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/establecimiento/principal?error=Cupon Editado')
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Editando Establecimiento';
            return res.redirect('/establecimiento/vista/editar/' + idEstablecimiento + '?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._establecimientoService.eliminarUno(id)
            return res.redirect('/establecimiento/principal?error=Establecimiento eliminado')
        } catch (e) {
            console.log(e)
            return res.redirect('/establecimiento/principal?error=Error eliminando establecimiento, posiblemente aun existan cupones asociados')
        }
    }


    /*------------VISTAS------------*/
    @Get('principal')
    async principal(
        @Query() parametrosConsulta,
        @Res() res,
    ) {
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this._establecimientoService.buscarTodos(parametrosConsulta.busqueda);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Mostrando Establecimientos'
            return res.redirect('/establecimiento/principal?error=' + mensajeError)
        }
        if (resultadoEncontrado) {
            return res.render(
                'establecimiento/principal',
                {
                    error: parametrosConsulta.error,
                    arregloEstablecimientos: resultadoEncontrado,
                }
            )
        } else {
            const mensajeError = 'Error Mostrando Establecimientos'
            return res.redirect('/establecimiento/principal?error=' + mensajeError)
        }
    }

    @Get('vista/crear')
    crearEstablecimiento(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'establecimiento/crear',
            {
                error: parametrosConsulta.error,
                nombreEstablecimiento: parametrosConsulta.nombreEstablecimiento,
                pathImagenEstablecimiento: parametrosConsulta.pathImagenEstablecimiento,
                categoriaEstablecimiento: parametrosConsulta.categoriaEstablecimiento,
                telefonoEstablecimiento: parametrosConsulta.telefonoEstablecimiento,
                direccionEstablecimiento: parametrosConsulta.direccionEstablecimiento,
            }
        )
    }

    @Get('vista/editar/:id')
    async editarEstablecimiento(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const id = Number(parametrosRuta.id)
        let establecimientoEncontrado;
        try {
            establecimientoEncontrado = await this._establecimientoService.buscarUno(id)
        } catch (e) {
            console.log('Error del servidor')
            return res.redirect('/establecimiento/principal?error= Error buscando establecimiento')
        }
        if (establecimientoEncontrado) {
            return res.render(
                'establecimiento/crear',
                {
                    error: parametrosConsulta.error,
                    establecimiento: establecimientoEncontrado,
                }
            )
        }
    }

    @Get('/:id/cupones')
    async cuponPrincipal(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        let resultadoEncontrado;
        try {
            const idEstablecimiento = Number(parametrosRuta.id)
            if (parametrosConsulta.busqueda) {
                resultadoEncontrado = await this._cuponService.buscarTodosPorEstablecimiento(idEstablecimiento, parametrosConsulta.busqueda);
            } else {
                resultadoEncontrado = await this._cuponService.buscarTodosPorEstablecimiento(idEstablecimiento, '');
            }
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Buscando Cupones';
            return res.redirect('/establecimiento/principal?error=' + mensajeError)
        }
        if (resultadoEncontrado) {
            return res.render(
                'cupon/principal',
                {
                    error: parametrosConsulta.error,
                    arregloCupones: resultadoEncontrado,
                    establecimiento: parametrosRuta.id,
                }
            )
        } else {
            const mensajeError = 'Error Buscando Cupones'
            return res.redirect('/establecimiento/principal?error=' + mensajeError)
        }
    }
}