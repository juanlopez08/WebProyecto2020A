import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('establecimiento')
export class EstablecimientoEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_establecimiento',
    })
    idEstablecimiento: number;

    @Column({
        name: 'nombre_establecimiento',
        type: 'varchar',
        length: 60,
    })
    nombreEstablecimiento: string;

    @Column({
        name: 'categoria_establecimiento',
        type: 'varchar',
        length: 60,
    })
    categoriaEstablecimiento: string;

    @Column({
        name: 'telefono_establecimiento',
        type: 'varchar',
        length: 45,
    })
    telefonoEstablecimiento: string;

    @Column({
        name: 'direccion_establecimiento',
        type: 'varchar',
        length: 45,
    })
    direccionEstablecimiento: string;
}