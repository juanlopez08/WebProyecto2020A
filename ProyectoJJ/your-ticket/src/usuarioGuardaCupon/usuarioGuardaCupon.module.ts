import {Module} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";
import {UsuarioGuardaCuponController} from "./usuarioGuardaCupon.controller";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [
        UsuarioGuardaCuponController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UsuarioGuardaCuponEntity,
                ],
                'default'
            )
    ],
    providers: [
        UsuarioGuardaCuponService
    ],
})
export class UsuarioGuardaCuponModule {

}