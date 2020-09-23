// @ts-ignore
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArticuloEnCuponEntity} from "../articuloEnCupon/articuloEnCupon.entity";
import {EstablecimientoEntity} from "../establecimiento/establecimiento.entity";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";

@Entity('cupon')
export class CuponEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_cupon',
    })
    idCupon: number;

    @Column({
        name: 'path_imagen_cupon',
        type: 'varchar',
        length: 500,
    })
    pathImagenCupon: string;

    @Column({
        name: 'path_codigoqr_cupon',
        type: 'varchar',
        length: 500,
    })
    pathCodigoQRCupon: string;

    @Column({
        name: 'informacion_cupon',
        type: 'varchar',
        length: 100,
    })
    informacionCupon: string;

    @Column({
        name: 'estado_cupon',
        type: 'varchar',
        length: 10,
    })
    estadoCupon: string;

    @Column({
        name: 'cantidad_usos',
        type: 'int',
    })
    cantidadUsos: number;

    // RELACIONES

    @OneToMany(
        type => ArticuloEnCuponEntity, // Entidad con la que nos relacionamos
        articuloEnCupon => articuloEnCupon.articulo  // Campo con el que nos relacionamos
    )
    articuloEnCupones: ArticuloEnCuponEntity[];

    @OneToMany(
        type => UsuarioGuardaCuponEntity,
        establecimiento => establecimiento.cupon
    )
    usuarioGuardaCupones: UsuarioGuardaCuponEntity[];

    @ManyToOne(
        type => EstablecimientoEntity,
        establecimiento => establecimiento.cupones
    )
    establecimiento: EstablecimientoEntity[];


}