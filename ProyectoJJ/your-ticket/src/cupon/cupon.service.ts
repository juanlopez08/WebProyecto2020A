import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CuponEntity} from "./cupon.entity";
import {Repository} from "typeorm";

@Injectable()
export class CuponService {
    constructor(
        @InjectRepository(CuponEntity)
        private repositorio: Repository<CuponEntity>
    ) {
    }
}