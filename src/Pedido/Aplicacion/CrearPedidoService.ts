import { IAplicationService } from "../../Utils/IAplicationService";
import { Either } from "../../Utils/Either";
import { Pedido } from "../Dominio/Pedido";
import { RepositorioPedido } from "../Dominio/RepositorioPedido";
import { CrearPedidoDto } from "../Dominio/dto/CrearPedidoDTO";
import { convertirEstadoPedido, EstadoPedido } from "../Dominio/EstadoPedido";
import { DetalleProducto } from "../Dominio/DetalleProducto";
import { Optional } from "../../Utils/Optional";
import { validarFecha } from "../Dominio/FechaPedido";

export class CrearPedidoService implements IAplicationService<CrearPedidoDto, Pedido> {
    
    private repositorioPedido: RepositorioPedido;
    
    constructor(private repositorio: RepositorioPedido) {
        this.repositorioPedido = repositorio;
    }

    async execute(pedido: CrearPedidoDto): Promise<Either<Pedido, Error>> {

        const estadoDelPedido = convertirEstadoPedido(pedido.estado);

        const fechaValidada = validarFecha(pedido.fecha);

        //Esto nos ayudara a validar el estado del pedido introducido y que no se pueda ingresar cualquier valor
        if(estadoDelPedido.isLeft() && fechaValidada.isLeft()){

            const order = Pedido.crearPedido(
                pedido.idUsuario,
                pedido.fecha,
                estadoDelPedido.getLeft(),
                new Optional<DetalleProducto[]>(pedido.detallePedido),
            );
            
            return await this.repositorio.crearPedido(order);
        }
        else{

            if(fechaValidada.isRight()){
                return Either.makeRight(fechaValidada.getRight());
            }
            else{
                return Either.makeRight(estadoDelPedido.getRight());  
            }
        }
    }
}