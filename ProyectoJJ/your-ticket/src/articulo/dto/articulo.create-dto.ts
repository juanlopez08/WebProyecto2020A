import {IsAlphanumeric, IsNotEmpty, IsNumber, IsPositive, MaxLength, MinLength} from "class-validator";

export class ArticuloCreateDto {
    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombreArticulo: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precioArticulo: number;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    descripcionArticulo: string
}