import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuarioTieneRol')
export class UsuarioTieneRolEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario_tiene_rol',
    })
    idUsuarioTieneRol: number;
}