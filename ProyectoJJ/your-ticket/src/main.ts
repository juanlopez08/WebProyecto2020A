import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

//const cookieParser = require('cookie-parser')

async function bootstrap() {
    const app = await NestFactory.create(AppModule) as any;

    //para inseguras y seguras
    //app.use(cookieParser())

    //para cookies firmadas
    //app.use(cookieParser('Me gustan los poliperros'));

    app.set('view engine', 'ejs');
    app.use(express.static('publico'));
    app.use(
        session({
            name: 'server-session-id',
            secret: 'Aqui vamos de nuevo',
            resave: true,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore(),
        }),
    );
    await app.listen(3000);
}

bootstrap();
