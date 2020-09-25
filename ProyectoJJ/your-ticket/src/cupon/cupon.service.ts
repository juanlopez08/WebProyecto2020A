import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CuponEntity} from "./cupon.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

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

    buscarTodos(textoConsulta?: string) {
        const consulta: FindManyOptions<CuponEntity> = {
            where: [
                {
                    informacionCupon: Like(`%${textoConsulta}%`)
                },
            ],
            relations: ['establecimiento']
        }
        const consultaEstablecimiento : FindManyOptions<CuponEntity> = {
            relations: ['establecimiento']
        }
        if (textoConsulta === undefined) {
            return this.repositorio.find(consultaEstablecimiento);
        } else {
            return this.repositorio.find(consulta);
        }
    }

    buscarTodosPorEstablecimiento(id: number, textoConsulta?: string) {
        const consulta: FindManyOptions<CuponEntity> = {
            where: [
                {
                    establecimiento: id,
                    informacionCupon: Like(`%${textoConsulta}%`)
                },
            ],
            relations: ['establecimiento']
        }
        return this.repositorio.find(consulta);

    }

    buscarUno(id?: number) {
        const consulta: FindManyOptions<CuponEntity> = {
            where: [
                {
                    idCupon: id,
                },
            ],
            relations: ['establecimiento']
        }
        return this.repositorio.findOne(consulta);
    }

    editarUno(cuponEditado: CuponEntity) {
        return this.repositorio.save(cuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}