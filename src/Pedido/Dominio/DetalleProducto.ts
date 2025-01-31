import { IdProducto } from "../../Producto/Dominio/IdProducto";
import { Optional } from "../../Utils/Optional";
import { IdPedido } from "./IdPedido";

export class DetalleProducto {

    private idProducto: IdProducto;
    private idPedido: Optional<IdPedido>;
    private cantidad: number;
    private precioProducto: number;

    private constructor(idProducto: IdProducto, cantidad: number, precioProducto: number, idPedido: IdPedido){	
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioProducto = precioProducto;
        this.idPedido = new Optional<IdPedido>(idPedido);
    }

    static crearDetalleProducto(idProducto: string,cantidad: number, precioProducto: number,  idPedido?: string): DetalleProducto{
        return new DetalleProducto(IdProducto.crearIdProducto(idProducto),
                                    cantidad, precioProducto, IdPedido.crearIdPedido(idPedido));
    }

    getIdProducto(): string{
        return this.idProducto.getValue();
    }

    getCantidad(): number{
        return this.cantidad;
    }

    getPrecioProducto(): number{
        return this.precioProducto;
    }

    getIdPedido(): string{
        return this.idPedido.getValue().getValue();
    }

    setIdPedido(idPedido: string): void{
        this.idPedido = new Optional<IdPedido>(IdPedido.crearIdPedido(idPedido));
    }

}