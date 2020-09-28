import {forwardRef, Module} from "@nestjs/common";
import {CuponController} from "./cupon.controller";
import {CuponService} from "./cupon.service";
import {CuponEntity} from "./cupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstablecimientoModule} from "../establecimiento/establecimiento.module";
import {UsuarioGuardaCuponModule} from "../usuarioGuardaCupon/usuarioGuardaCupon.module";

@Module({
    controllers: [
        CuponController
    ],
    imports: [
        forwardRef(() => EstablecimientoModule),
        forwardRef(() => UsuarioGuardaCuponModule),
        TypeOrmModule
            .forFeature(
                [
                    CuponEntity,
                ],
                'default'
            )
    ],
    providers: [
        CuponService
    ],
    exports: [
        CuponService
    ]
})
export class CuponModule {

}
