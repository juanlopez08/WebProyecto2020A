import {IsAlphanumeric, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength} from "class-validator";

export class ArticuloCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombreArticulo: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precioArticulo: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    descripcionArticulo: string
}