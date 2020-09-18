import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('articuloEnCupon')
export class ArticuloEnCuponEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_artEnCup',
    })
    idArtEnCup: number;

    @Column({
        name: 'porcentaje',
        type: "int",
        nullable: true,
    })
    porcentaje: number;

    @Column({
        name: 'valor',
        type: 'float',
        nullable: true,
    })
    valor: number;
}