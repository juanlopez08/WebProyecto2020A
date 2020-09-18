import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuarioGuardaCupon')
export class UsuarioGuardaCuponEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario_guarda_cupon',
    })
    idUsuarioGuardaCupon: number;
}