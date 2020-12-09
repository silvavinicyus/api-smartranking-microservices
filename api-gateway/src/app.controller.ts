import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
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
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ){        
    return await this.clienteAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }
}
