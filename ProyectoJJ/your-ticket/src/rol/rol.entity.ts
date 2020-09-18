// @ts-ignore
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioTieneRolEntity} from "../usuarioTieneRol/usuarioTieneRol.entity";

@Entity('rol')
export class RolEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_rol',
    })
    idRol: number;

    @Column({
        name: 'tipo_rol',
        type: 'varchar',
        length: 45,
    })
    tipoRol: string;

    // RELACIONES

    @OneToMany(
        type => UsuarioTieneRolEntity,
        usuarioTieneRol => usuarioTieneRol.rol
    )
    usuarioTieneRoles: UsuarioTieneRolEntity[];
}