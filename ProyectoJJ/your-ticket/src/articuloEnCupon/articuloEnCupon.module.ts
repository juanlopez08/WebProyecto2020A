import {Module} from "@nestjs/common";
import {ArticuloEnCuponController} from "./articuloEnCupon.controller";
import {ArticuloEnCuponService} from "./articuloEnCupon.service";

@Module({
    controllers: [
        ArticuloEnCuponController
    ],
    imports:[],
    providers: [
        ArticuloEnCuponService
    ],
})
export class ArticuloEnCuponModule {

}
