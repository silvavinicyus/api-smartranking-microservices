import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clienteAdminBackend: ClientProxy;

  constructor() {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:haBMS1MYHI2E@184.73.151.25:5672/smartranking'],
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
