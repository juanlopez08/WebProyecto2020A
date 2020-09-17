import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('cupon')
export class CuponEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_cupon',
    })
    idCupon: number;

    @Column({
        name: 'path_imagen_cupon',
        type: 'varchar',
        length: 100,
    })
    pathImagenCupon: string;

    @Column({
        name: 'path_codigoqr_cupon',
        type: 'varchar',
        length: 100,
    })
    pathCCodigoQRCupon: string;

    @Column({
        name: 'informacion_cupon',
        type: 'varchar',
        length: 100,
    })
    informacionnCupon: string;

    @Column({
        name: 'estado_cupon',
        type: 'varchar',
        //enum: ['activo','inactivo'],
    })
    estadoCupon: string;

    @Column({
        name: 'cantidad_usos',
        type: 'int',
    })
    cantidadUsos: number;
}