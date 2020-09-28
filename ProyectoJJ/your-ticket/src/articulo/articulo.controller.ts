import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {ArticuloService} from "./articulo.service";
import {CuponCreateDto} from "../cupon/dto/cupon.create-dto";
import {validate, ValidationError} from "class-validator";
import {CuponEntity} from "../cupon/cupon.entity";
import {CuponUpdateDto} from "../cupon/dto/cupon.update-dto";
import {ArticuloCreateDto} from "./dto/articulo.create-dto";
import {ArticuloEntity} from "./articulo.entity";
import {ArticuloUpdateDto} from "./dto/articulo.update-dto";

@Controller('articulo')
export class ArticuloController {

    constructor(
        private readonly _articuloService: ArticuloService
    ) {
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const articuloValido = new ArticuloCreateDto()
        articuloValido.nombreArticulo = parametrosCuerpo.nombreArticulo;
        articuloValido.precioArticulo = Number(parametrosCuerpo.precioArticulo);
        articuloValido.descripcionArticulo = parametrosCuerpo.descripcionArticulo;

        let stringConsulta = `&nombreArticulo=${parametrosCuerpo.nombreArticulo}`
            + `&precioArticulo=${parametrosCuerpo.precioArticulo}`
            + `&descripcionArticulo=${parametrosCuerpo.descripcionArticulo}`

        if (!(parametrosCuerpo.nombreArticulo && parametrosCuerpo.precioArticulo
            && parametrosCuerpo.descripcionArticulo)) {
            const mensajeError = 'Existen Campos vacíos'
            return res.redirect('/articulo/vista/crear?error=' + mensajeError + stringConsulta)
        }

        let respuesta
        try {
            respuesta = await this._articuloService.crearUno(parametrosCuerpo)
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Articulo'
            return res.redirect('/articulo/vista/crear?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(articuloValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/articulo/principal?error=Artículo Creado');
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Creando Artículo';
            return res.redirect('/articulo/vista/crear?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const idArticulo = Number(parametrosRuta.id)
        const articuloEditado = {
            idArticulo: idArticulo,
            nombreArticulo: parametrosCuerpo.nombreArticulo,
            precioArticulo: Number(parametrosCuerpo.precioArticulo),
            descripcionArticulo: parametrosCuerpo.descripcionArticulo,
        } as ArticuloEntity;

        const articuloValido = new ArticuloUpdateDto()
        articuloValido.nombreArticulo = articuloEditado.nombreArticulo;
        articuloValido.precioArticulo = articuloEditado.precioArticulo;
        articuloValido.descripcionArticulo = articuloEditado.descripcionArticulo;

        let stringConsulta = `&nombreArticulo=${parametrosCuerpo.nombreArticulo}`
            + `&precioArticulo=${parametrosCuerpo.precioArticulo}`
            + `&descripcionArticulo=${parametrosCuerpo.descripcionArticulo}`

        let respuesta
        try {
            respuesta = await this._articuloService.editarUno(articuloEditado);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Editando Artículo'
            return res.redirect('/articulo/vista/editar/' + idArticulo + '?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(articuloValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/articulo/principal?error=Articulo Editado')
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Editando Artículo'
            return res.redirect('/articulo/vista/editar/' + idArticulo + '?error=' + mensajeError + stringConsulta)
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._articuloService.eliminarUno(id)
            return res.redirect('/articulo/principal?error=Cupón eliminado')
        } catch (e) {
            console.log(e)
            return res.redirect('/articulo/principal?error=Error eliminando artículo. No debe estar asignado a ningún cupón')
        }
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
            resultadoEncontrado = await this._articuloService.buscarTodos(parametrosConsulta.busqueda);
        } catch (e) {
            console.log(e)
            const mensajeError = 'Error Mostrando Artículos'
            return res.redirect('/articulo/principal?error=' + mensajeError)
        }
        if (resultadoEncontrado) {
            return res.render(
                'articulo/principal',
                {
                    error: parametrosConsulta.error,
                    arregloArticulos: resultadoEncontrado,
                    logeado: session.correoUsuario,
                }
            )
        } else {
            const mensajeError = 'Error Mostrando Artículos'
            return res.redirect('/articulo/principal?error=' + mensajeError);
        }
    }

    @Get('vista/crear')
    crearCupon(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        return res.render(
            'articulo/crear',
            {
                error: parametrosConsulta.error,
                nombreArticulo: parametrosConsulta.nombreArticulo,
                precioArticulo: parametrosConsulta.precioArticulo,
                descripcionArticulo: parametrosConsulta.descripcionArticulo,
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
        let articuloEncontrado
        try {
            articuloEncontrado = await this._articuloService.buscarUno(id)
        } catch (e) {
            return res.redirect('/articulo/principal?error= Error buscando articulo')
        }
        if (articuloEncontrado) {
            return res.render(
                'articulo/crear',
                {
                    error: parametrosConsulta.error,
                    articulo: articuloEncontrado,
                    logeado: session.correoUsuario,
                }
            )
        }
    }


}