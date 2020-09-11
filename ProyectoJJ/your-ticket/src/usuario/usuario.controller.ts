import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        // VALIDACIONES CON EL CREATE DTO
        try {
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta;
        } catch (e) {
            console.log(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }
}
