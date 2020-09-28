import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ArticuloEntity} from "./articulo.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {CuponEntity} from "../cupon/cupon.entity";

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

    buscarTodos(textoConsulta?: string) {
        const consulta: FindManyOptions<ArticuloEntity> = {
            where: [
                {
                    nombreArticulo: Like(`%${textoConsulta}%`),
                },
                {
                    descripcionArticulo: Like(`%${textoConsulta}%`),
                },
            ],
            relations: ['articuloEnCupones', 'articuloEnCupones.cupon']
        }
        const relaciones: FindManyOptions<ArticuloEntity> = {
            relations: ['articuloEnCupones', 'articuloEnCupones.cupon']
        }
        if (textoConsulta === undefined) {
            return this.repositorio.find(relaciones);
        } else {
            return this.repositorio.find(consulta);
        }
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