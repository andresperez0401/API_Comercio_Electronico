import { IAplicationService } from "../../Utils/IAplicationService";
import { Producto } from "../Dominio/Producto";
import { RepositorioProducto } from "../Dominio/RepositorioProducto";
import { Either } from "../../Utils/Either";

export class BuscarProductosService implements IAplicationService<string, Iterable<Producto>>{

    private repositorioProducto: RepositorioProducto;

    constructor (repositorioProducto: RepositorioProducto){
        this.repositorioProducto = repositorioProducto;
    }

    async execute(): Promise<Either<Iterable<Producto>, Error>> {
        return await this.repositorioProducto.buscarProductos();
    }
}