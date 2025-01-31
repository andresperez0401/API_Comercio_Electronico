import { IAplicationService } from "../../Utils/IAplicationService";
import { Either } from "../../Utils/Either";
import { Pedido } from "../Dominio/Pedido";
import { RepositorioPedido } from "../Dominio/RepositorioPedido";


export class BuscarPedidosService implements IAplicationService<string, Iterable<Pedido>> {
    private repositorioPedido: RepositorioPedido;

    constructor(repositorioPedido: RepositorioPedido) {
        this.repositorioPedido = repositorioPedido;
    }

    async execute(): Promise<Either<Iterable<Pedido>, Error>> {
        return await this.repositorioPedido.buscarPedidos();
    }
}