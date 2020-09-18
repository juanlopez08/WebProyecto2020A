// @ts-ignore
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";

@Entity('fecha_uso')
export class FechaUsoEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_fecha_uso',
    })
    idUsuario: number;

    @Column({
        name: 'fecha_uso',
        type: 'date',
        nullable: true
    })
    fechaUso?: string

    // RELACIONES

    @ManyToOne(
        type => UsuarioGuardaCuponEntity,
        usuarioGuardaCupon => usuarioGuardaCupon.fechaUsos
    )
    usuarioGuardaCupon: UsuarioGuardaCuponEntity[];
}