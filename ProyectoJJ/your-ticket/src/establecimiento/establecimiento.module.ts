import {Module} from "@nestjs/common";
import {EstablecimientoController} from "./establecimiento.controller";
import {EstablecimientoService} from "./establecimiento.service";

@Module({
    controllers:[
        EstablecimientoController
    ],
    imports:[],
    providers:[
        EstablecimientoService
    ],
})
export class EstablecimientoModule {

}