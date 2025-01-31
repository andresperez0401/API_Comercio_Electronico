import { Either } from "../../Utils/Either";
import { Producto } from "./Producto";

export interface RepositorioProducto {

    crearProducto(producto: Producto): Promise<Either<Producto, Error>>;
    buscarProductoPorId(id: string): Promise<Either<Producto, Error>>;
    buscarProductos(): Promise<Either<Iterable<Producto>, Error>>;
    eliminarProducto(id: string): Promise<Either<string, Error>>;
    actualizarProducto(producto: Producto): Promise<Either<string, Error>>;

}