// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario_guarda_cupon')
export class UsuarioGuardaCuponEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario_guarda_cupon',
    })
    idUsuarioGuardaCupon: number;
}