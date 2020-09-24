import {Module} from "@nestjs/common";
import {CuponController} from "./cupon.controller";
import {CuponService} from "./cupon.service";
import {CuponEntity} from "./cupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstablecimientoModule} from "../establecimiento/establecimiento.module";

@Module({
    controllers:[
        CuponController
    ],
    imports:[
        EstablecimientoModule,
        TypeOrmModule
            .forFeature(
                [
                    CuponEntity,
                ],
                'default'
            )
    ],
    providers:[
        CuponService
    ],
})
export class CuponModule {

}
