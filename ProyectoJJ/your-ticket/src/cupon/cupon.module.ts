import {Module} from "@nestjs/common";
import {CuponController} from "./cupon.controller";
import {CuponService} from "./cupon.service";

@Module({
    controllers:[
        CuponController
    ],
    imports:[],
    providers:[
        CuponService
    ],
})
export class CuponModule {

}