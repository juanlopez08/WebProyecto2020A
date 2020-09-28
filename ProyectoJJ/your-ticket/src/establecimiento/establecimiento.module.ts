import {forwardRef, Module} from "@nestjs/common";
import {EstablecimientoController} from "./establecimiento.controller";
import {EstablecimientoService} from "./establecimiento.service";
import {EstablecimientoEntity} from "./establecimiento.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CuponModule} from "../cupon/cupon.module";

@Module({
    controllers: [
        EstablecimientoController
    ],
    imports: [
        forwardRef(() => CuponModule),
        TypeOrmModule
            .forFeature(
                [
                    EstablecimientoEntity,
                ],
                'default'
            )
    ],
    providers: [
        EstablecimientoService
    ],
    exports: [
        EstablecimientoService
    ]
})
export class EstablecimientoModule {

}