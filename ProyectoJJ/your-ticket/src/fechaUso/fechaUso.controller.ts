import {Controller} from "@nestjs/common";
import {FechaUsoService} from "./fechaUso.service";

@Controller('fechaUso')
export class FechaUsoController {

    constructor(
        private readonly _fechaUsoService : FechaUsoService
    ) {
    }

}