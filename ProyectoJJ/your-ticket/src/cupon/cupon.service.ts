import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CuponEntity} from "./cupon.entity";
import {Repository} from "typeorm";

@Injectable()
export class CuponService {
    constructor(
        @InjectRepository(CuponEntity)
        private repositorio: Repository<CuponEntity>
    ) {
    }

    crearUno(nuevoCupon: CuponEntity) {
        return this.repositorio.save(nuevoCupon);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(cuponEditado: CuponEntity) {
        return this.repositorio.save(cuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}