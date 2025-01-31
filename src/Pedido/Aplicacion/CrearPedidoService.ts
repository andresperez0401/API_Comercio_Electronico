import { IAplicationService } from "../../Utils/IAplicationService";
import { Either } from "../../Utils/Either";
import { Pedido } from "../Dominio/Pedido";
import { RepositorioPedido } from "../Dominio/RepositorioPedido";
import { CrearPedidoDto } from "../Dominio/dto/CrearPedidoDTO";
import { EstadoPedido } from "../Dominio/EstadoPedido";

export class CrearPedidoService implements IAplicationService<CrearPedidoDto, Pedido> {
    
    private repositorioPedido: RepositorioPedido;
    
    constructor(private repositorio: RepositorioPedido) {
        this.repositorioPedido = repositorio;
    }

    async execute(pedido: CrearPedidoDto): Promise<Either<Pedido, Error>> {

        const estadoDelPedido = EstadoPedido.convertirEstado(pedido.estado);

        //Esto nos ayudara a validar el estado del pedido introducido y que no se pueda ingresar cualquier valor
        if(estadoDelPedido.isLeft()){

            const order = Pedido.crearPedido(pedido.idUsuario, pedido.fecha, estadoDelPedido.getLeft(), pedido.detallePedido, pedido.id);
            return await this.repositorio.crearPedido(order);
        }
        else{
            return Either.makeRight(estadoDelPedido.value);
        }
    }
}