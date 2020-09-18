import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioGuardaCuponEntity} from "./usuarioGuardaCupon.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioGuardaCuponService {
    constructor(
        @InjectRepository(UsuarioGuardaCuponEntity)
        private repositorio: Repository<UsuarioGuardaCuponEntity>
    ) {
    }
}