// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('articulo')
export class ArticuloEntity{

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
        scale: 4,
    })
    precioArticulo: number;

    @Column({
        name: 'descripcion_articulo',
        type: 'varchar',
        length: 100
    })
    descripcionArticulo: string;
}