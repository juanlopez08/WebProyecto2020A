import {Module} from "@nestjs/common";
import {EstablecimientoController} from "./establecimiento.controller";
import {EstablecimientoService} from "./establecimiento.service";
import {EstablecimientoEntity} from "./establecimiento.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [
        EstablecimientoController
    ],
    imports: [
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