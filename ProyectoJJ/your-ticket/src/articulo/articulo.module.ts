import {Module} from "@nestjs/common";
import {ArticuloController} from "./articulo.controller";
import {ArticuloService} from "./articulo.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticuloEntity} from "./articulo.entity";

@Module({
    controllers: [
        ArticuloController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    ArticuloEntity
                ],
                'default'
            )
    ],
    providers: [
        ArticuloService
    ],
})
export class ArticuloModule {

}
