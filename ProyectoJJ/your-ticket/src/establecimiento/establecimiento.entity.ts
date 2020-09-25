// @ts-ignore
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CuponEntity} from "../cupon/cupon.entity";

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
        name: 'path_imagen_establecimiento',
        type: 'varchar',
        length: 500,
    })
    pathImagenEstablecimiento: string;

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

    // RELACIONES

    @OneToMany(
        type => CuponEntity, // Entidad con la que nos relacionamos
        cupon => cupon.establecimiento  // Campo con el que nos relacionamos
    )
    cupones: CuponEntity[];
}