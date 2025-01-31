import { IAplicationService } from '../../Utils/IAplicationService';
import { Either } from '../../Utils/Either';
import { Producto } from '../Dominio/Producto';
import { RepositorioProducto } from '../Dominio/RepositorioProducto';

export class BuscarProductoPorIdService
  implements IAplicationService<string, Producto>
{
  private repositorioProducto: RepositorioProducto;

  constructor(repositorioProducto: RepositorioProducto) {
    this.repositorioProducto = repositorioProducto;
  }

  async execute(idProducto: string): Promise<Either<Producto, Error>> {
    return await this.repositorioProducto.buscarProductoPorId(idProducto);
  }
}