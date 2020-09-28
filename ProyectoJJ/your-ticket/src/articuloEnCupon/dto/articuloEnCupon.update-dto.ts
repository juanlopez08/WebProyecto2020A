import {IsNumber, IsOptional, IsPositive} from "class-validator";

export class ArticuloEnCuponUpdateDto {
    @IsNumber()
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @IsOptional()
    valor?: number;
}