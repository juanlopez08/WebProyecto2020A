import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioTieneRolEntity} from "./usuarioTieneRol.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioTieneRolService {
    constructor(
        @InjectRepository(UsuarioTieneRolEntity)
        private repositorio: Repository<UsuarioTieneRolEntity>
    ) {
    }

    crearUno(nuevoUsuarioTieneRol: UsuarioTieneRolEntity) {
        return this.repositorio.save(nuevoUsuarioTieneRol);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(usuarioTieneRolEditado: UsuarioTieneRolEntity) {
        return this.repositorio.save(usuarioTieneRolEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}