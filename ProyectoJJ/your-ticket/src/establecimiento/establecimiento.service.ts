import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EstablecimientoEntity} from "./establecimiento.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class EstablecimientoService {
    constructor(
        @InjectRepository(EstablecimientoEntity)
        private repositorio: Repository<EstablecimientoEntity>
    ) {
    }

    crearUno(nuevoEstablecimiento: EstablecimientoEntity) {
        return this.repositorio.save(nuevoEstablecimiento);
    }

    buscarTodos(textoConsulta?: string) {
        const consulta: FindManyOptions<EstablecimientoEntity> = {
            where: [
                {
                    nombreEstablecimiento: Like(`%${textoConsulta}%`)
                },
            ],
            relations: ['cupones']
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

    editarUno(establecimientoEditado: EstablecimientoEntity) {
        return this.repositorio.save(establecimientoEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}