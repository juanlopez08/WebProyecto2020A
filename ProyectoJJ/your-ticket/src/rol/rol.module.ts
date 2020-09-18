import {Module} from "@nestjs/common";
import {RolService} from "./rol.service";
import {RolController} from "./rol.controller";
import {RolEntity} from "./rol.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [
        RolController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    RolEntity,
                ],
                'default'
            )
    ],
    providers: [
        RolService
    ],
})
export class RolModule {

}