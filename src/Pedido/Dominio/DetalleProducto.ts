import { IdProducto } from "../../Producto/Dominio/IdProducto";


export class DetalleProducto {

    private idProducto: IdProducto;
    private cantidad: number;
    private precioProducto: number;

    private constructor(idProducto: IdProducto, cantidad: number, precioProducto: number){
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioProducto = precioProducto;
    }

    static crearDetalleProducto(idProducto: string, cantidad: number, precioProducto: number): DetalleProducto{
        return new DetalleProducto(IdProducto.crearIdProducto(idProducto), cantidad, precioProducto);
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

}