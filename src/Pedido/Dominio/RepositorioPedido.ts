import { Pedido } from "./Pedido";
import { Either } from "../../Utils/Either";

export interface RepositorioPedido {

    crearPedido(pedido: Pedido):Promise<Either<Pedido, Error>>;
    buscarPedidosPorIdUsuario(idUsuario: string):Promise<Either<Iterable<Pedido>, Error>>;
    buscarPedidos():Promise<Either<Iterable<Pedido>, Error>>;
   // eliminarPedido(idPedido: string):Promise<Either<string, Error>>;

}