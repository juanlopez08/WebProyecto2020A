import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioTieneRolEntity} from "./usuarioTieneRol.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioTieneRolService {
    constructor(
        @InjectRepository(UsuarioTieneRolEntity)
        private repositorio: Repository<UsuarioTieneRolEntity>
    ) {
    }
}