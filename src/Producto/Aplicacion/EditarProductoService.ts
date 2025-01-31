import { IAplicationService } from "../../Utils/IAplicationService";
import { Producto } from "../Dominio/Producto";
import { EditarProductoDTO } from "../Dominio/dto/EditarProductoDTO";
import { RepositorioProducto } from "../Dominio/RepositorioProducto";
import { Either } from "../../Utils/Either";


export class EditarProductoService implements IAplicationService<EditarProductoDTO, string>{

    private repositorioProducto: RepositorioProducto;

    constructor(repositorioProducto: RepositorioProducto){
        this.repositorioProducto = repositorioProducto;
    }   

    async execute(product: EditarProductoDTO): Promise<Either<string, Error>> {

        const producto = Producto.crearProducto(
            product.nombre,
            product.descripcion,
            product.precio,
            product.disponibilidad,
            product.id
        );
        return await this.repositorioProducto.actualizarProducto(producto);
    }





}