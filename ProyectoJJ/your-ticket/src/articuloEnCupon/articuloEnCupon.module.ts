import {Module} from "@nestjs/common";
import {ArticuloEnCuponController} from "./articuloEnCupon.controller";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";

@Module({
    controllers: [
        ArticuloEnCuponController
    ],
    imports:[
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
