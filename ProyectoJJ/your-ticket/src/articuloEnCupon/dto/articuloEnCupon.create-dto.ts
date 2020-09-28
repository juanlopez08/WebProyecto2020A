import {IsNumber, IsOptional, IsPositive} from "class-validator";

export class ArticuloEnCuponCreateDto {
    @IsNumber()
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @IsOptional()
    valor?: number;
}