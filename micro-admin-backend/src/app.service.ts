import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jogador } from './interfaces/jogadores/jogadores.interface';
import { Categoria } from './interfaces/categorias/categorias.interface';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class AppService {

  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ){}

  private readonly logger = new Logger(AppService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria>{
    
    try{
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch(error){
      this.logger.log(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

}
