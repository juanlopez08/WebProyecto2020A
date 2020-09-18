import {Module} from "@nestjs/common";
import {UsuarioTieneRolService} from "./usuarioTieneRol.service";
import {UsuarioTieneRolController} from "./usuarioTieneRol.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioTieneRolEntity} from "./usuarioTieneRol.entity";

@Module({
    controllers: [
        UsuarioTieneRolController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UsuarioTieneRolEntity,
                ],
                'default'
            )
    ],
    providers: [
        UsuarioTieneRolService
    ],
})
export class UsuarioTieneRolModule {

}