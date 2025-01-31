import { IdPedido } from "./IdPedido";
import { IdUsuario } from "../../Usuario/Dominio/IdUsuario";
import { DetalleProducto } from "./DetalleProducto";
import { EstadoPedido } from "./EstadoPedido";
import { Optional } from "../../Utils/Optional";

export class Pedido {

    private idPedido: IdPedido;
    private idUsuario: IdUsuario;
    private fecha: Date;
    private estado: EstadoPedido;
    private detallePedido: Optional<Array<DetalleProducto>>;
    private montoTotal!: number;

    private constructor(
        idPedido: IdPedido,
        idUsuario: IdUsuario,
        fecha: Date,
        estado: EstadoPedido,
        detallePedido: Optional<Array<DetalleProducto>>
    ){
        this.idPedido = idPedido;
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.estado = estado;
        this.detallePedido = detallePedido;

        if(this.detallePedido.hasvalue()){
            this.montoTotal = this.calcularMontoTotal();
        }
    }

    static crearPedido(
        idUsuario: string,
        fecha: Date,
        estado: EstadoPedido,
        detallePedido: Array<DetalleProducto>,
        id?: string
    ): Pedido{
        return new Pedido(
            IdPedido.crearIdPedido(id),
            IdUsuario.crearIdUsuario(idUsuario),
            fecha,
            estado,
            new Optional<Array<DetalleProducto>>(detallePedido)
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






}