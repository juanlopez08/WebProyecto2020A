import {Controller} from "@nestjs/common";
import {CuponService} from "./cupon.service";

@Controller('cupon')
export class CuponController {

    constructor(
        private readonly _cuponService : CuponService
    ) {
    }

}