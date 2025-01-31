import { IAplicationService } from "../../Utils/IAplicationService";
import { RepositorioProducto } from "../Dominio/RepositorioProducto";
import { Either } from "../../Utils/Either";


export class EliminarProductoService implements IAplicationService<string, string>{

    private repositorioProducto: RepositorioProducto;

    constructor(repositorioProducto: RepositorioProducto){
        this.repositorioProducto = repositorioProducto;
    }

    async execute(id: string): Promise<Either<string, Error>> {
        
        const resultado = await this.repositorioProducto.eliminarProducto(id);

        return resultado;
    }
}