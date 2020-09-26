import {Controller, Get, Param, Query, Res, Session} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";
import {CuponService} from "../cupon/cupon.service";
import {CuponEntity} from "../cupon/cupon.entity";

@Controller('cuponesGuardados')
export class UsuarioGuardaCuponController {

    constructor(
        private readonly _usuarioGuardaCuponService: UsuarioGuardaCuponService,
        private readonly _cuponService: CuponService,
    ) {
    }


    /*------------VISTAS------------*/
    @Get()
    async cuponPrincipal(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session,
    ) {
        let resultado;
        let arregloCupones = [];
        try {
            resultado = await this._usuarioGuardaCuponService.buscarTodos()
            resultado.forEach((cuponGuardado) => {
                if (cuponGuardado.usuario.idUsuario === session.idUsuario) {
                    arregloCupones.push(cuponGuardado.cupon);
                }
            })
            console.log('arreglo:', arregloCupones)
            if (arregloCupones.length > 0) {
                return res.render(
                    'cupon/principal',
                    {
                        error: parametrosConsulta.error,
                        arregloCupones: arregloCupones,
                    }
                )
            } else {
                const mensajeError = 'No tiene cupones guardados';
                return res.redirect('/inicio?error=' + mensajeError);
            }
        } catch (e) {

        }

    }
}