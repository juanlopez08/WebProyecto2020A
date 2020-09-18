// @ts-ignore
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}