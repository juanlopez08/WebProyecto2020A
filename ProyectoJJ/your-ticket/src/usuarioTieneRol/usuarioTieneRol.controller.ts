import {Controller} from "@nestjs/common";
import {UsuarioTieneRolService} from "./usuarioTieneRol.service";

@Controller('usuarioTieneRol')
export class UsuarioTieneRolController {

    constructor(
        private readonly _usuarioTieneRolService : UsuarioTieneRolService
    ) {
    }

}