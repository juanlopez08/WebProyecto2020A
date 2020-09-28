import {Module} from "@nestjs/common";
import {FechaUsoService} from "./fechaUso.service";
import {FechaUsoController} from "./fechaUso.controller";
import {FechaUsoEntity} from "./fechaUso.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioGuardaCuponModule} from "../usuarioGuardaCupon/usuarioGuardaCupon.module";

@Module({
    controllers: [
        FechaUsoController
    ],
    imports: [
        UsuarioGuardaCuponModule,
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