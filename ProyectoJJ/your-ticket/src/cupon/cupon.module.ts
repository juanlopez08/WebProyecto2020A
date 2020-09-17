import {Module} from "@nestjs/common";
import {CuponController} from "./cupon.controller";
import {CuponService} from "./cupon.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CuponEntity} from "./cupon.entity";

@Module({
    controllers:[
        CuponController
    ],
    imports:[
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
