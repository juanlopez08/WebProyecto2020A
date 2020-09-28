import {Body, Controller, Param, Post, Query, Res, Session} from "@nestjs/common";
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

    /*------------VISTAS------------*/


}