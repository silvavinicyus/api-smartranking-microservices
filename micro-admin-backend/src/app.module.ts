import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaSchema } from './interfaces/categorias/categorias.schema';
import { JogadorSchema } from './interfaces/jogadores/jogadores.schema';
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION,
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
    ),
    MongooseModule.forFeature([
      {name: 'Categoria', schema: CategoriaSchema},
      {name: 'Jogador', schema: JogadorSchema}
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
