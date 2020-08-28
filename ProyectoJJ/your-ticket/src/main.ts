import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const express = require('express')
//const cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;

  /*
  AQUI CONFIGURACION
  ANTES DEL APP.LISTEN()
  */

  //para inseguras y seguras
  //app.use(cookieParser())

  //para cookies firmadas
  //app.use(cookieParser('Me gustan los poliperros'));

  //app.set('view engine', 'ejs')
 // app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
