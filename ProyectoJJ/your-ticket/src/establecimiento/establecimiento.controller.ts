import {Controller} from "@nestjs/common";
import {EstablecimientoService} from "./establecimiento.service";

@Controller('establecimiento')
export class EstablecimientoController {

    constructor(
        private readonly _establecimientoService : EstablecimientoService
    ) {
    }

}