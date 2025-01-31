import { Producto } from "../Dominio/Producto";
import { IAplicationService } from "../../Utils/IAplicationService";
import { CrearProductoDTO } from "../Dominio/dto/CrearProductoDTO";
import { Either } from "../../Utils/Either";
import { RepositorioProducto } from "../Dominio/RepositorioProducto";


export class CrearProductoService implements IAplicationService<CrearProductoDTO, Producto>{

    private repositorioProducto: RepositorioProducto;

    constructor(repositorioProducto: RepositorioProducto){
        this.repositorioProducto = repositorioProducto;
    }

    async execute(product: CrearProductoDTO): Promise<Either<Producto, Error>> {
        
        const producto = Producto.crearProducto(product.nombre, product.descripcion,
                                                product.precio, product.disponibilidad);
        
        const resultado = await this.repositorioProducto.crearProducto(producto);
        
        return resultado;
    }
}