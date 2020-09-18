import {Module} from "@nestjs/common";
import {ArticuloEnCuponController} from "./articuloEnCupon.controller";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

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
