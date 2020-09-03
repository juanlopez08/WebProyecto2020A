import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
    TypeOrmModule
      .forRoot({
        name: 'default',  
        type: 'mysql',  
        host: 'localhost',  
        port: 3306,  // puerto juanjo
        //port: // puerto juan
        username: 'root',  
        password: 'root',  
        database: 'webprojectdb',
        entities: [  
        ],
        synchronize: true,  // Actualizar esquema
        dropSchema: false,  // Eliminar esquema
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
