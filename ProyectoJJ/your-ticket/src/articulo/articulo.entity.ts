// @ts-ignore
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArticuloEnCuponEntity} from "../articuloEnCupon/articuloEnCupon.entity";

@Entity('articulo')
export class ArticuloEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_articulo',
    })
    idArticulo: number;

    @Column({
        name: 'nombre_articulo',
        type: 'varchar',
        length: 20,
    })
    nombreArticulo: string;

    @Column({
        name: 'precio_articulo',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    precioArticulo: number;

    @Column({
        name: 'descripcion_articulo',
        type: 'varchar',
        length: 100
    })
    descripcionArticulo: string;

    // RELACIONES

    @OneToMany(
        type => ArticuloEnCuponEntity, // Entidad con la que nos relacionamos
        articuloEnCupon => articuloEnCupon.articulo  // Campo con el que nos relacionamos
    )
    articuloEnCupones: ArticuloEnCuponEntity[]
}