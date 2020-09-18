import {Module} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";
import {UsuarioGuardaCuponController} from "./usuarioGuardaCupon.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";

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