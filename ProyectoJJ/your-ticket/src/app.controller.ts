import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {UsuarioLoginDto} from "./usuario/dto/usuario.login-dto";
import {isNotEmptyObject, validate, ValidationError} from "class-validator";
import {UsuarioService} from "./usuario/usuario.service";
import {type} from "os";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    @Get()
    getHello(
        @Res() res,
    ) {
        return res.redirect('/login');
    }

    @Get('login')
    login(
        @Query() parametrosConsulta,
        @Res() response,
    ) {
        return response.render(
            'login/login',
            {
                error: parametrosConsulta.error,
            })
    }

    @Post('login')
    async logginPost(
        @Body() parametrosConsulta,
        @Res() response,
        @Session() session,
    ) {
        const usuarioValido = new UsuarioLoginDto()
        usuarioValido.correoUsuario = parametrosConsulta.correoUsuario;
        usuarioValido.contrasenaUsuario = parametrosConsulta.contrasenaUsuario;

        const errores: ValidationError[] = await validate(usuarioValido);
        let respuesta;
        try {
            respuesta = await this._usuarioService.logeo(usuarioValido.correoUsuario, usuarioValido.contrasenaUsuario)
        } catch (e) {
            console.log(e);
            const mensajeError = 'Usuario o contraseña incorrectos'
            return response.redirect('/login?error=' + mensajeError);
        }
        if (errores.length < 1 && respuesta.length > 0) {
            session.correoUsuario = usuarioValido.correoUsuario;
            session.idUsuario = respuesta[0].idUsuario;
            return response.redirect('/inicio');
        } else {
            console.log('ERROR', errores);
            const mensajeError = 'Usuario o contraseña incorrectos';
            return response.redirect('/login?error=' + mensajeError);
        }
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() session,
        @Req() request
    ) {
        session.correoUsuario = undefined;
        session.idUsuario = undefined;
        request.session.destroy();
        return response.redirect('login')
    }
}
