import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticuloModule} from "./articulo/articulo.module";
import {ArticuloEnCuponModule} from "./articuloEnCupon/articuloEnCupon.module";
import {CuponModule} from "./cupon/cupon.module";
import {EstablecimientoModule} from "./establecimiento/establecimiento.module";
import {FechaUsoModule} from "./fechaUso/fechaUso.module";
import {RolModule} from "./rol/rol.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioGuardaCuponModule} from "./usuarioGuardaCupon/usuarioGuardaCupon.module";
import {UsuarioTieneRolModule} from "./usuarioTieneRol/usuarioTieneRol.module";


@Module({
    imports: [
        ArticuloModule,
        ArticuloEnCuponModule,
        CuponModule,
        EstablecimientoModule,
        FechaUsoModule,
        RolModule,
        UsuarioModule,
        UsuarioGuardaCuponModule,
        UsuarioTieneRolModule,
        TypeOrmModule
            .forRoot({
                name: 'default',
                type: 'mysql',
                host: 'localhost',
                port: 3306,  // puerto juanjo
                //port: // puerto juan
                username: 'root',
                password: 'root',
                database: 'webprojectdb',
                entities: [],
                synchronize: true,  // Actualizar esquema
                dropSchema: false,  // Eliminar esquema
            }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
