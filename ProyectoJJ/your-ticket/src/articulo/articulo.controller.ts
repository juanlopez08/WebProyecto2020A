import {Controller} from "@nestjs/common";
import {ArticuloService} from "./articulo.service";

@Controller('articulo')
export class ArticuloController {

    constructor(
        private readonly _articuloService: ArticuloService
    ) {
    }

}