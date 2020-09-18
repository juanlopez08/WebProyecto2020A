// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario_tiene_rol')
export class UsuarioTieneRolEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario_tiene_rol',
    })
    idUsuarioTieneRol: number;
}