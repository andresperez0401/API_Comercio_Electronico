import { DetalleProducto } from "../DetalleProducto";

export class CrearPedidoDto{

    idUsuario: string;
    estado: string;
    fecha: Date;
    detallePedido: Array<DetalleProducto>;
    id?: string;

    constructor(
        idUsuario: string,
        estado: string,
        fecha: Date,
        detallePedido: Array<DetalleProducto>,
        id?: string
    ){
        this.idUsuario = idUsuario;
        this.estado = estado;
        this.fecha = fecha;
        this.detallePedido = detallePedido;
        this.id = id;
    }

}