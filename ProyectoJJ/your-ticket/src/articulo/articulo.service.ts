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
}