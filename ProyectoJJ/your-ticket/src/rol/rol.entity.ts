// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}