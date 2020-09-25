import {Body, Controller, Get, Post, Req, Res, Session} from "@nestjs/common";

@Controller('inicio')
export class InicioController {

    constructor() {
    }

//    MÉTODOS


    /*------------VISTAS------------*/
    @Get()
    inicio(
        @Res() res,
        @Session() session,
    ) {
        return res.render(
            'inicio/inicio'
        )
    }
}
