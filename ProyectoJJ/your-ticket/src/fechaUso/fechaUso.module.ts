import {Module} from "@nestjs/common";
import {FechaUsoService} from "./fechaUso.service";
import {FechaUsoController} from "./fechaUso.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FechaUsoEntity} from "./fechaUso.entity";

@Module({
    controllers: [
        FechaUsoController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    FechaUsoEntity,
                ],
                'default'
            )
    ],
    providers: [
        FechaUsoService
    ],
})
export class FechaUsoModule {

}