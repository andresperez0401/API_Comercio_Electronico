import { Either } from "../../Utils/Either";
import { Pedido } from "../Dominio/Pedido";
import { RepositorioPedido } from "../Dominio/RepositorioPedido";
import { IAplicationService } from "../../Utils/IAplicationService";


export class buscarPedidosPorIdUsuarioService implements IAplicationService<string, Iterable<Pedido>>{
    private repositorioPedido: RepositorioPedido;

    constructor(repositorioPedido: RepositorioPedido) {
        this.repositorioPedido = repositorioPedido;
    }

    async execute(idUsuario: string): Promise<Either<Iterable<Pedido>, Error>> {
        return await this.repositorioPedido.buscarPedidosPorIdUsuario(idUsuario);
    }
}