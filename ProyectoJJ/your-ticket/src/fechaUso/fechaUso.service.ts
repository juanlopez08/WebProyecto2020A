import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FechaUsoEntity} from "./fechaUso.entity";
import {Repository} from "typeorm";

@Injectable()
export class FechaUsoService {
    constructor(
        @InjectRepository(FechaUsoEntity)
        private repositorio: Repository<FechaUsoEntity>
    ) {
    }
}