import {Controller} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";

@Controller('usuarioGuardaCupon')
export class UsuarioGuardaCuponController {

    constructor(
        private readonly _usuarioGuardaCuponService : UsuarioGuardaCuponService
    ) {
    }

}