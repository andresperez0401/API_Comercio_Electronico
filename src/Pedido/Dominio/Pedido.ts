import { IdPedido } from "./IdPedido";
import { IdUsuario } from "../../Usuario/Dominio/IdUsuario";
import { DetalleProducto } from "./DetalleProducto";
import { EstadoPedido } from "./EstadoPedido";
import { Optional } from "../../Utils/Optional";
import { FechaPedido } from "./FechaPedido";

export class Pedido {

    private idPedido: Optional<IdPedido>;
    private idUsuario: IdUsuario;
    private fecha: FechaPedido;
    private estado: EstadoPedido;
    private detallePedido: Optional<DetalleProducto[]>;
    private montoTotal!: number;

    private constructor(
        idUsuario: IdUsuario,
        fecha: FechaPedido,
        estado: EstadoPedido,
        detallePedido: Optional<DetalleProducto[]>,
        idPedido: IdPedido
    ){
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.estado = estado;
        this.detallePedido = detallePedido;
        this.idPedido = new Optional<IdPedido>(idPedido);

        if(!this.detallePedido.hasvalue()){
            this.montoTotal = this.calcularMontoTotal();
        }
    }

    static crearPedido(
        idUsuario: string,
        fecha: string,
        estado: EstadoPedido,
        detallePedido: Optional<DetalleProducto[]>,
        idPedido?: string
    ): Pedido{
        return new Pedido(
            IdUsuario.crearIdUsuario(idUsuario),
            FechaPedido.crearFechaPedido(fecha),
            estado,
            detallePedido,
            IdPedido.crearIdPedido(idPedido),
        );
    }

    calcularMontoTotal(): number{
        let montoTotal = 0;
        this.detallePedido.getValue().forEach(detalle => {
            montoTotal += detalle.getPrecioProducto() * detalle.getCantidad();
        });
        return montoTotal;
    }

    serMontoTotal(montoTotal: number): void{
        this.montoTotal = this.calcularMontoTotal();
    }

    getIdPedido(): string{
        return this.idPedido.getValue().getValue();
    }

    getIdUsuario(): string{
        return this.idUsuario.getValue();
    }

    getFecha(): string{
        return this.fecha.getValue();
    }

    getEstado(): string{
        return this.estado;
    }

    getDetallePedido(): Optional<Array<DetalleProducto>>{
        return this.detallePedido;
    }

    getMontoTotal(): number{
        return this.montoTotal;
    }
}