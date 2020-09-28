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
import {UsuarioEntity} from "./usuario/usuario.entity";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {ArticuloEnCuponEntity} from "./articuloEnCupon/articuloEnCupon.entity";
import {CuponEntity} from "./cupon/cupon.entity";
import {EstablecimientoEntity} from "./establecimiento/establecimiento.entity";
import {FechaUsoEntity} from "./fechaUso/fechaUso.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon/usuarioGuardaCupon.entity";
import {UsuarioTieneRolEntity} from "./usuarioTieneRol/usuarioTieneRol.entity";
import {InicioModule} from "./inicio/inicio.module";


@Module({
    imports: [
        ArticuloModule,
        ArticuloEnCuponModule,
        CuponModule,
        EstablecimientoModule,
        FechaUsoModule,
        InicioModule,
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
                entities: [
                     ArticuloEntity,
                     ArticuloEnCuponEntity,
                     CuponEntity,
                     EstablecimientoEntity,
                     FechaUsoEntity,
                     RolEntity,
                     UsuarioEntity,
                     UsuarioGuardaCuponEntity,
                     UsuarioTieneRolEntity,
                ],
                synchronize: true,  // Actualizar esquema
                dropSchema: false,  // Eliminar esquema
            }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {



}
