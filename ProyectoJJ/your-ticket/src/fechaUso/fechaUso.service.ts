import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FechaUsoEntity} from "./fechaUso.entity";
import {Repository} from "typeorm";

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

    buscarTodos(){
        return this.repositorio.find();
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