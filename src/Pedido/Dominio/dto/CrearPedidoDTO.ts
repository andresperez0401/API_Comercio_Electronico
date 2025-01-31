import { DetalleProducto } from "../DetalleProducto";

export class CrearPedidoDto{

    idUsuario: string;
    estado: string;
    fecha: string;
    detallePedido: DetalleProducto[];
    idPedido?: string;

    constructor(
        idUsuario: string,
        estado: string,
        fecha: string,
        detallePedido: {idProducto: string; cantidad: number; precio: number}[],
        idPedido?: string,
    ){
        this.idUsuario = idUsuario;
        this.estado = estado;
        this.fecha = fecha;
        this.detallePedido =  detallePedido.map(item => 
                              DetalleProducto.crearDetalleProducto(item.idProducto, item.cantidad, item.precio));
        this.idPedido = idPedido;
    }

}