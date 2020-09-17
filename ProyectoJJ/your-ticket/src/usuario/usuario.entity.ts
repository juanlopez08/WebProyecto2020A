import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario')
export class UsuarioEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario',
    })
    idUsuario: number;

    @Column({
        name: 'nombre_usuario',
        type: 'varchar',
        length: 60,
    })
    nombreUsuario: string;

    @Column({
        name: 'apellido_usuario',
        type: 'varchar',
        length: 60,
    })
    apellidoUsuario: string

    @Column({
        name: 'correo_usuario',
        type: 'varchar',
        length: 100
    })
    correoUsuario: string;

    @Column({
        name: 'contrasena_usuario',
        type: 'varchar',
        length: 60
    })
    contrasenaUsuario: string

    @Column({
        name: 'fecha_nacimiento',
        type: 'date',
        nullable: true
    })
    fechaNacimiento?: string
}