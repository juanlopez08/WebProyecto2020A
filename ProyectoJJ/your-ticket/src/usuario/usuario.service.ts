import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }

    crearUno(nuevoUsuario: UsuarioEntity) {
        return this.repositorio.save(nuevoUsuario);
    }

    buscarTodos(textoConsulta?: string) {
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    cedula: Like(`%${textoConsulta}%`)
                },
                {
                    nombreUsuario: Like(`%${textoConsulta}%`)
                },
                {
                    apellidoUsuario: Like(`%${textoConsulta}%`)
                },
                {
                    correoUsuario: Like(`%${textoConsulta}%`)
                },
            ],
            relations: ['usuarioTieneRoles', 'usuarioGuardaCupones']
        }
        if (textoConsulta === undefined) {
            return this.repositorio.find();
        } else {
            return this.repositorio.find(consulta);
        }
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(usuarioEditado: UsuarioEntity) {
        return this.repositorio.save(usuarioEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }

}