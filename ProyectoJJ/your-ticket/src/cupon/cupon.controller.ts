import {BadRequestException, Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {CuponService} from "./cupon.service";
import {CuponCreateDto} from "./dto/cupon.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('cupon')
export class CuponController {

    constructor(
        private readonly _cuponService: CuponService
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
            return res.redirect('/cupon/crear?error=' + mensajeError + stringConsulta)
        }
        let respuesta
        try {
            respuesta = await this._cuponService.crearUno(parametrosCuerpo);
        } catch (e) {
            console.log(e);
            const mensajeError = 'Error Creando Cupon'
            return res.redirect('/cupon/crear?error=' + mensajeError + stringConsulta)
        }
        const errores: ValidationError[] = await validate(cuponValido);
        if (errores.length < 1 && respuesta) {
            return res.redirect('/inicio');
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Error Creando Cupon'
            return res.redirect('/cupon/crear?error=' + mensajeError + stringConsulta)
        }
    }


    /*------------VISTAS------------*/
    @Get('crear')
    crearCupon(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'cupon/crear',
            {
                error: parametrosConsulta.error,
                pathImagenCupon: parametrosConsulta.pathImagenCupon,
                pathCodigoQRCupon: parametrosConsulta.pathCodigoQRCupon,
                informacionCupon: parametrosConsulta.informacionCupon,
                estadoCupon: parametrosConsulta.estadoCupon,
                cantidadUsos: parametrosConsulta.cantidadUsos,
                establecimiento: parametrosConsulta.establecimiento
            }
        )
    }
}