import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
require('dotenv').config();

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clienteAdminBackend: ClientProxy;

  constructor() {    
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_CONNECTION],        
        queue: 'admin-backend'
      },
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ){        
    this.clienteAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias')
  getCategorias(
    @Query('idCategoria') _id: string
  ): Observable<any>{
    return this.clienteAdminBackend.send('consultar-categorias', _id ? _id : '');
  }

  @Put('categorias/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string
  ){
    this.clienteAdminBackend.emit('atualizar-categoria', {id: _id, categoria: atualizarCategoriaDto});
  }
}
