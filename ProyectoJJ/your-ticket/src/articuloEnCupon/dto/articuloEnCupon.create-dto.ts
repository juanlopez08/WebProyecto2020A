import {IsNumber, IsOptional, IsPositive} from "class-validator";

export class ArticuloEnCuponCreateDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    valor?: number;
}