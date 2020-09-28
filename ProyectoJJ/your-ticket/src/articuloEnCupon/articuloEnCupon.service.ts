import {Injectable} from "@nestjs/common";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";

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

    buscarTodos() {
        return this.repositorio.find();
    }

    buscarUno(idCupon: number, idArticulo: number) {
        const consulta: FindManyOptions<ArticuloEnCuponEntity> = {
            where: [
                {
                    cupon: idCupon,
                    articulo: idArticulo,
                }
            ],
            relations: ['articulo', 'cupon'],
        }
        return this.repositorio.findOne(consulta);
    }

    buscarTodosPorCupon(idCupon: number) {
        const consulta: FindManyOptions<ArticuloEnCuponEntity> = {
            where: [
                {
                    cupon: idCupon,
                }
            ],
            relations: ['articulo', 'cupon'],
        }
        return this.repositorio.find(consulta);
    }

    editarUno(articuloEnCuponEditado: ArticuloEnCuponEntity) {
        return this.repositorio.save(articuloEnCuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}