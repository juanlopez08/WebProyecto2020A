import {Injectable} from "@nestjs/common";
import {ArticuloEnCuponEntity} from "./articuloEnCupon.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ArticuloEnCuponService {
    constructor(
        @InjectRepository(ArticuloEnCuponEntity)
        private repositorio: Repository<ArticuloEnCuponEntity>
    ) {
    }
}