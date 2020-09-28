import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";
import {ArticuloService} from "../articulo/articulo.service";
import {CuponService} from "../cupon/cupon.service";
import {ArticuloEnCuponCreateDto} from "./dto/articuloEnCupon.create-dto";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {validate, ValidationError} from "class-validator";

@Controller('articuloEnCupon')
export class ArticuloEnCuponController {

    constructor(
        private readonly _articuloEnCuponService: ArticuloEnCuponService,
        private readonly _articuloService: ArticuloService,
        private readonly _cuponService: CuponService,
    ) {
    }

    @Post('asignar/:id')
    async asignarArticulo(
        @Param() parametrosRuta,
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        let resultadoArticulo;
        let resultadoCupones;
        const idArticulo = Number(parametrosRuta.id)
        try {
            resultadoArticulo = await this._articuloService.buscarUno(idArticulo);
        } catch (e) {
            console.log(e)
            return res.redirect('/articulo/principal?error=No se pudo asignar el artículo')
        }
        try {
            resultadoCupones = await this._cuponService.buscarTodos('');
        } catch (e) {
            console.log(e);
            return res.redirect('/articulo/principal?error=No se pudo asignar el artículo')
        }
        return res.render(
            'articulo/asignar',
            {
                error: parametrosConsulta.error,
                logeado: session.correoUsuario,
                articulo: resultadoArticulo,
                arregloCupones: resultadoCupones,
            }
        )
    }

    @Post('asignarDesdeVista/:id')
    async asignarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const articuloValido = new ArticuloEnCuponCreateDto()
        articuloValido.porcentaje = Number(parametrosCuerpo.porcentaje)
        articuloValido.valor = Number(parametrosCuerpo.valor)

        if (parametrosCuerpo.porcentaje && parametrosCuerpo.valor) {
            const mensajeError = 'Solo debe elegir porcentaje o valor'
            return res.redirect('/articulo/principal?error=' + mensajeError)
        }

        const nuevoRegistro = {
            articulo: parametrosRuta.id,
            cupon: parametrosCuerpo.idCupon,
            porcentaje: Number(parametrosCuerpo.porcentaje),
            valor: Number(parametrosCuerpo.valor),
        } as ArticuloEnCuponEntity;

        let respuesta
        try {
            respuesta = await this._articuloEnCuponService.crearUno(nuevoRegistro)
        } catch (e) {
            console.log(e)
            return res.redirect('/articulo/principal?error=No se pudo asignar el artículo')
        }

        const errores: ValidationError[] = await validate(articuloValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/articulo/principal?error=Artículo Asignado')
        } else {
            console.log('ERRORES:', errores)
            return res.redirect('/articulo/principal?error=No se pudo asignar el artículo')
        }
    }


    @Post('quitar/:idArticulo/:idCupon')
    async quitarCupon(
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        let articuloYaAsignado;
        const idArticulo = Number(parametrosRuta.idArticulo);
        const idCupon = Number(parametrosRuta.idCupon);
        try {
            articuloYaAsignado = await this._articuloEnCuponService.buscarUno(idCupon, idArticulo)
        } catch (e) {
            console.log(e)
            return res.redirect('/inicio?error=No se encontró el artículo deseado');
        }
        if (articuloYaAsignado) {
            await this._articuloEnCuponService.eliminarUno(articuloYaAsignado.idArtEnCup)
            return res.redirect('/inicio?error=Artículo removido');
        } else {
            return res.redirect('/inicio?error=No existe ese artículo');
        }

    }

    /*------------VISTAS------------*/
    @Get('vista/articulos/:id')
    async articulosEnCupon(
        @Session() session,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        let respuesta;
        let cupon;
        const idCupon = Number(parametrosRuta.id);
        try {
            respuesta = await this._articuloEnCuponService.buscarTodosPorCupon(idCupon)
        } catch (e) {
            console.log(e)
            return res.redirect('/cupon/principal?error=Este Cupón no tiene artículos asignados')
        }
        try {
            cupon = await this._cuponService.buscarUno(idCupon);
        } catch (e) {
            console.log(e)
            return res.redirect('/cupon/principal?error=Error buscando cupón');
        }
        if (respuesta && cupon) {
            return res.render(
                'articulo/asignados',
                {
                    error: undefined,
                    logeado: session.correoUsuario,
                    arregloArticulosAsignados: respuesta,
                    cupon: cupon,
                }
            )
        } else {
            return res.redirect('/cupon/principal?error=Este Cupón no tiene artículos asignados.')
        }
    }


}