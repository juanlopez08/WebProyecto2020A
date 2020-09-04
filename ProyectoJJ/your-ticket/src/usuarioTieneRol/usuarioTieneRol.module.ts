import {Module} from "@nestjs/common";
import {UsuarioTieneRolService} from "./usuarioTieneRol.service";
import {UsuarioTieneRolController} from "./usuarioTieneRol.controller";

@Module({
    controllers: [
        UsuarioTieneRolController
    ],
    imports: [],
    providers: [
        UsuarioTieneRolService
    ],
})
export class UsuarioTieneRolModule {

}