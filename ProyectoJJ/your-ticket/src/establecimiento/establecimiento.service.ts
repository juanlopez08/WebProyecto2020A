import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EstablecimientoEntity} from "./establecimiento.entity";
import {Repository} from "typeorm";

@Injectable()
export class EstablecimientoService {
    constructor(
        @InjectRepository(EstablecimientoEntity)
        private repositorio: Repository<EstablecimientoEntity>
    ) {
    }
}