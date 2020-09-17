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
        length: 45,
    })
    nombreArticulo: string;

    @Column({
        name: 'precio_articulo',
        type: "float",
    })

    @Column({
        name: 'descripcion_articulo',
        type: 'varchar',
        length: 100
    })
    correoUsuario: string;
}