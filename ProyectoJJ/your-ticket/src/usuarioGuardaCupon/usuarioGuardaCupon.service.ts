import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioGuardaCuponService {
    constructor(
        @InjectRepository(UsuarioGuardaCuponEntity)
        private repositorio: Repository<UsuarioGuardaCuponEntity>
    ) {
    }

    crearUno(nuevoUsuarioGuardaCupon: UsuarioGuardaCuponEntity) {
        return this.repositorio.save(nuevoUsuarioGuardaCupon);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(usuarioGuardaCuponEditado: UsuarioGuardaCuponEntity) {
        return this.repositorio.save(usuarioGuardaCuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}