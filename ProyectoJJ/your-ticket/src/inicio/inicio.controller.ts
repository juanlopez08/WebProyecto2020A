import {Body, Controller, Get, Post, Query, Req, Res, Session} from "@nestjs/common";

@Controller('inicio')
export class InicioController {

    constructor() {
    }

//    MÉTODOS


    /*------------VISTAS------------*/
    @Get()
    inicio(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session,
    ) {
        return res.render(
            'inicio/inicio',
            {
                error: parametrosConsulta.error,
            }
        )
    }
}
