import {Module} from "@nestjs/common";
import {ArticuloController} from "./articulo.controller";
import {ArticuloService} from "./articulo.service";
import {ArticuloEntity} from "./articulo.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [
        ArticuloController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    ArticuloEntity,
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
