import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FechaUsoEntity} from "./fechaUso.entity";
import {FindManyOptions, Repository} from "typeorm";
import {UsuarioGuardaCuponEntity} from "../usuarioGuardaCupon/usuarioGuardaCupon.entity";

@Injectable()
export class FechaUsoService {
    constructor(
        @InjectRepository(FechaUsoEntity)
        private repositorio: Repository<FechaUsoEntity>
    ) {
    }

    crearUno(nuevoFechaUso: FechaUsoEntity) {
        return this.repositorio.save(nuevoFechaUso);
    }

    buscarTodos() {
        const consulta: FindManyOptions<FechaUsoEntity> = {
            relations: [
                'usuarioGuardaCupon',
                'usuarioGuardaCupon.cupon',
                'usuarioGuardaCupon.cupon.establecimiento',
                'usuarioGuardaCupon.usuario',
            ]
        }
        return this.repositorio.find(consulta);
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(fechaUsoEditado: FechaUsoEntity) {
        return this.repositorio.save(fechaUsoEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}