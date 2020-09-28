import {Module} from "@nestjs/common";
import {ArticuloEnCuponController} from "./articuloEnCupon.controller";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticuloModule} from "../articulo/articulo.module";
import {CuponModule} from "../cupon/cupon.module";

@Module({
    controllers: [
        ArticuloEnCuponController
    ],
    imports: [
        ArticuloModule,
        CuponModule,
        TypeOrmModule
            .forFeature(
                [
                    ArticuloEnCuponEntity,
                ],
                'default'
            )
    ],
    providers: [
        ArticuloEnCuponService
    ],
})
export class ArticuloEnCuponModule {

}
