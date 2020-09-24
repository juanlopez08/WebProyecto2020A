import {Controller, Get} from "@nestjs/common";
import {EstablecimientoService} from "./establecimiento.service";

@Controller('establecimiento')
export class EstablecimientoController {

    constructor(
        private readonly _establecimientoService : EstablecimientoService
    ) {
    }

    @Get('buscar')
    async mostrarTodos() {
        try {
            const respuesta = await this._establecimientoService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e)
        }
        //return this.arregloUsuarios;
    }

}