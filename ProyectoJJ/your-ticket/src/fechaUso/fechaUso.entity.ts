// @ts-ignore
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";

@Entity('fecha_uso')
export class FechaUsoEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_fecha_uso',
    })
    idFechaUso: number;

    @Column({
        name: 'fecha_de_uso',
        type: 'varchar',
        length: 10,
        nullable: true
    })
    fechaUso?: string;

    // RELACIONES

    @ManyToOne(
        type => UsuarioGuardaCuponEntity,
        usuarioGuardaCupon => usuarioGuardaCupon.fechaUsos,
        {onDelete: "CASCADE"},
    )
    usuarioGuardaCupon: UsuarioGuardaCuponEntity;
}