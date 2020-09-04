import {Module} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";
import {UsuarioGuardaCuponController} from "./usuarioGuardaCupon.controller";

@Module({
    controllers: [
        UsuarioGuardaCuponController
    ],
    imports: [],
    providers: [
        UsuarioGuardaCuponService
    ],
})
export class UsuarioGuardaCuponModule {

}