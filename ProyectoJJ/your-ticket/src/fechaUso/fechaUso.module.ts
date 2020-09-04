import {Module} from "@nestjs/common";
import {FechaUsoService} from "./fechaUso.service";
import {FechaUsoController} from "./fechaUso.controller";

@Module({
    controllers:[
        FechaUsoController
    ],
    imports:[],
    providers:[
        FechaUsoService
    ],
})
export class FechaUsoModule {

}