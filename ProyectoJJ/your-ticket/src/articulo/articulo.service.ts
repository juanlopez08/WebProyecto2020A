import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ArticuloEntity} from "./articulo.entity";
import {Repository} from "typeorm";

@Injectable()
export class ArticuloService {
    constructor(
        @InjectRepository(ArticuloEntity)
        private repositorio: Repository<ArticuloEntity>
    ) {
    }

    crearUno(nuevoArticulo: ArticuloEntity) {
        return this.repositorio.save(nuevoArticulo);
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(articuloEditado: ArticuloEntity) {
        return this.repositorio.save(articuloEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}