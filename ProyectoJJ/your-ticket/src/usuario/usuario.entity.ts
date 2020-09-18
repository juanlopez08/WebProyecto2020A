// @ts-ignore
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";
import {UsuarioTieneRolEntity} from "../usuarioTieneRol/usuarioTieneRol.entity";

@Entity('usuario')
export class UsuarioEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id_usuario',
    })
    idUsuario: number;

    @Column({
        name: 'cedula',
        type: 'varchar',
        length: 10,
        unique: true
    })
    cedula: string;

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
        type: 'varchar',
        length: 10,
        nullable: true
    })
    fechaNacimiento?: string

    // RELACIONES

    @OneToMany(
        type => UsuarioGuardaCuponEntity,
        usuarioGuardaCupon => usuarioGuardaCupon.cupon
    )
    usuarioGuardaCupones: UsuarioGuardaCuponEntity[];

    @OneToMany(
        type => UsuarioTieneRolEntity,
        usuarioTieneRol => usuarioTieneRol.usuario
    )
    usuarioTieneRoles: UsuarioTieneRolEntity[];
}