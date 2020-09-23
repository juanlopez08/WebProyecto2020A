import {Controller, Get, Res} from "@nestjs/common";

@Controller('inicio')
export class InicioController {

    constructor() {
    }

//    MÉTODOS


//    VISTAS

    @Get()
    inicio(
        @Res() res
    ) {
        return res.render(
            'inicio/inicio'
        )
    }

}
