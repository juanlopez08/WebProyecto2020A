import {forwardRef, Module} from "@nestjs/common";
import {UsuarioGuardaCuponService} from "./usuarioGuardaCupon.service";
import {UsuarioGuardaCuponController} from "./usuarioGuardaCupon.controller";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CuponModule} from "../cupon/cupon.module";

@Module({
    controllers: [
        UsuarioGuardaCuponController
    ],
    imports: [
        forwardRef(() => CuponModule),
        TypeOrmModule
            .forFeature(
                [
                    UsuarioGuardaCuponEntity,
                ],
                'default'
            )
    ],
    providers: [
        UsuarioGuardaCuponService,
    ],
    exports: [
        UsuarioGuardaCuponService,
    ]

})
export class UsuarioGuardaCuponModule {

}