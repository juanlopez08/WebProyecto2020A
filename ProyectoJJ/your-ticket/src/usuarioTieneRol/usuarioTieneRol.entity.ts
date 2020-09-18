// @ts-ignore
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('usuario_tiene_rol')
export class UsuarioTieneRolEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario_tiene_rol',
    })
    idUsuarioTieneRol: number;

    // RELACIONES

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.usuarioTieneRoles
    )
    usuario: UsuarioEntity[];

    @ManyToOne(
        type => RolEntity,
        rol => rol.usuarioTieneRoles
    )
    rol: RolEntity[];
}