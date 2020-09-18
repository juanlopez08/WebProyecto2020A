import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}