import {Injectable} from "@nestjs/common";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ArticuloEnCuponService {
    constructor(
        @InjectRepository(ArticuloEnCuponEntity)
        private repositorio: Repository<ArticuloEnCuponEntity>
    ) {
    }

    crearUno(nuevoArticuloEnCupon: ArticuloEnCuponEntity) {
        return this.repositorio.save(nuevoArticuloEnCupon);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(articuloEnCuponEditado: ArticuloEnCuponEntity) {
        return this.repositorio.save(articuloEnCuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}