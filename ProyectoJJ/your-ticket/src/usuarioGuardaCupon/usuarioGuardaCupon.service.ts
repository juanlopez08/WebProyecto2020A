import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

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

    buscarTodos() {
        const consulta: FindManyOptions<UsuarioGuardaCuponEntity> = {
            relations: ['cupon', 'usuario', 'cupon.establecimiento']
        }
        return this.repositorio.find(consulta);
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    buscarUnoGuardado(idCupon: number, idUsuario: number) {
        const consulta: FindManyOptions<UsuarioGuardaCuponEntity> = {
            where: [
                {
                    cupon: idCupon,
                    usuario: idUsuario
                }
            ],
            relations: ['fechaUsos', 'cupon', 'usuario', 'cupon.establecimiento'],
        }
        return this.repositorio.findOne(consulta);
    }

    editarUno(usuarioGuardaCuponEditado: UsuarioGuardaCuponEntity) {
        return this.repositorio.save(usuarioGuardaCuponEditado)
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
}