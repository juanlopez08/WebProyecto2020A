import {Module} from "@nestjs/common";
import {CuponController} from "./cupon.controller";
import {CuponService} from "./cupon.service";
import {CuponEntity} from "./cupon.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

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
