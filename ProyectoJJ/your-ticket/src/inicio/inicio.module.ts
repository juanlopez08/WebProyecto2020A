import {Module} from "@nestjs/common";
import {InicioController} from "./inicio.controller";

@Module({
    controllers: [
        InicioController
    ],
    imports: [

    ],
    providers: [

    ]
})
export class InicioModule{

}