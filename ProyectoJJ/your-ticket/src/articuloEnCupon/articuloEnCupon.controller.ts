import {Controller} from "@nestjs/common";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";

@Controller('articuloEnCupon')
export class ArticuloEnCuponController {

    constructor(
        private readonly _articuloEnCuponService : ArticuloEnCuponService
    ) {
    }

}