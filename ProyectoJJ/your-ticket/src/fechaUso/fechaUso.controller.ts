import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {FechaUsoService} from "./fechaUso.service";
import {UsuarioGuardaCuponService} from "../usuarioGuardaCupon/usuarioGuardaCupon.service";
import {validate, ValidationError} from "class-validator";
import {UsuarioGuardaCuponUpdateDto} from "../usuarioGuardaCupon/dto/usuarioGuardaCupon.update-dto";
import {FechaUsoEntity} from "./fechaUso.entity";

@Controller('fechaUso')
export class FechaUsoController {

    constructor(
        private readonly _fechaUsoService: FechaUsoService,
        private readonly _usuarioGuardaCuponService: UsuarioGuardaCuponService,
    ) {
    }

    @Post('utilizar/:id')
    async utilizar(
        @Param() parametrosRuta,
        @Session() session,
        @Res() res,
    ) {
        let resultadoCupon;
        let resultadoFechaUso;
        let resultadoUsuarioGuardaCupon;
        const idCupon = parametrosRuta.id;
        const idUsuario = session.idUsuario;

        const fechaActual = new Date()
        const stringFechaActual = fechaActual.getFullYear()
            + '-' + (fechaActual.getUTCMonth() + 1)
            + '-' + fechaActual.getUTCDate()

        try {
            resultadoCupon = await this._usuarioGuardaCuponService.buscarUnoGuardado(idCupon, idUsuario);
        } catch (e) {
            console.log(e)
            res.redirect('/inicio?error=Primero debe guardar el cupón')
        }

        if (resultadoCupon) {

            resultadoCupon.cantidadUsos -= 1;

            const nuevoRegistro = {
                fechaUso: stringFechaActual,
                usuarioGuardaCupon: resultadoCupon.idUsuarioGuardaCupon,
            } as FechaUsoEntity;

            const cuponGuardadoValido = new UsuarioGuardaCuponUpdateDto();
            cuponGuardadoValido.cantidadUsos = resultadoCupon.cantidadUsos;

            try {
                const errores: ValidationError[] = await validate(cuponGuardadoValido);
                if (errores.length < 1) {
                    try {
                        resultadoUsuarioGuardaCupon = await this._usuarioGuardaCuponService.editarUno(resultadoCupon)
                    } catch (e) {
                        console.log(e)
                        const mensaje = 'Error al registrar el uso 2'
                        res.redirect('/cupon/principal?error=' + mensaje);
                    }
                    try {
                        resultadoFechaUso = await this._fechaUsoService.crearUno(nuevoRegistro)
                    } catch (e) {
                        console.log(e)
                        const mensaje = 'Error al registrar el uso'
                        res.redirect('/cupon/principal?error=' + mensaje);
                    }
                } else {
                    console.log('ERROR', errores);
                    res.redirect('/cupon/vista/informacion/' + idCupon + '?error=Le quedan 0 usos posibles.');
                }
            } catch (e) {
                console.log(e)
                const mensaje = 'Error al registrar el uso'
                res.redirect('/cupon/principal?error=' + mensaje)
            }
        } else {
            res.redirect('/inicio?error=Primero debe guardar el cupón')
        }

        if (resultadoFechaUso && resultadoUsuarioGuardaCupon) {
            const mensaje = 'Le quedan ' + resultadoCupon.cantidadUsos + ' uso(s) posibles'
            res.redirect('/cupon/vista/informacion/' + idCupon + '?error=' + mensaje)
        } else {
            const mensaje = 'Error al registrar el uso';
            res.redirect('/cupon/principal?error=' + mensaje)
        }
    }


    /*------------VISTAS------------*/
    @Get()
    async historial(
        @Query() parametrosConsulta,
        @Session() session,
        @Res() res,
    ) {
        let historial;
        const idUsuario = session.idUsuario;
        let arregloFechas = [];
        try {
            historial = await this._fechaUsoService.buscarTodos()
            historial.forEach((fechaUso) => {
                if (fechaUso.usuarioGuardaCupon.usuario.idUsuario === idUsuario) {
                    arregloFechas.push(fechaUso);
                }
            })
            
            return res.render(
                'fechaUso/historial',
                {
                    error: parametrosConsulta.error,
                    logeado: session.correoUsuario,
                    arregloFechas: arregloFechas,
                }
            )
        } catch (e) {
            console.log(e)
            res.redirect('/inicio?error=Todavía no ha utilizado ningún cupón')
        }
    }
}