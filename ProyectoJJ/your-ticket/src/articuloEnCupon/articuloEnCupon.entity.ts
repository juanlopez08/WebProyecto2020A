// @ts-ignore
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArticuloEntity} from "../articulo/articulo.entity";
import {CuponEntity} from "../cupon/cupon.entity";

@Entity('articulo_en_cupon')
export class ArticuloEnCuponEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_artEnCup',
    })
    idArtEnCup: number;

    @Column({
        name: 'porcentaje',
        type: 'int',
        nullable: true,
    })
    porcentaje: number;

    @Column({
        name: 'valor',
        type: 'decimal',
        precision: 10,
        scale: 4,
        nullable: true,
    })
    valor: number;

    // RELACIONES

    @ManyToOne(
        type => ArticuloEntity,  // Entidad con la que nos relacionamos
        articulo => articulo.articuloEnCupones  // Campo con el que nos relacionamos
    )
    articulo: ArticuloEntity[];

    @ManyToOne(
        type => CuponEntity,
        cupon => cupon.articuloEnCupones
    )
    cupon: CuponEntity[];
}