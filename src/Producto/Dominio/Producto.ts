import { Optional } from "../../Utils/Optional";
import { DescripcionProducto } from "./DescripcionProducto";
import { IdProducto } from "./IdProducto";
import { NombreProducto } from "./NombreProducto";

export class Producto {
    private idProducto: Optional<IdProducto>;
    private nombre: NombreProducto;
    private descripcion: DescripcionProducto;
    private disponibilidad: number;


    constructor(nombre: NombreProducto,descripcion: DescripcionProducto,
                disponibilidad: number, idProducto: IdProducto) {
    
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.disponibilidad = disponibilidad;
        this.idProducto = new Optional<IdProducto>(idProducto);

    }

    static crearProducto(
        nombre: string,
        descripcion: string,
        disponibilidad: number,
        id?: string): Producto {
        return new Producto(
            NombreProducto.crearNombreProducto(nombre),
            DescripcionProducto.crearDescripcion(descripcion),
            disponibilidad,
            IdProducto.crearIdProducto(id)
        );
    }

    getNombre(): string {
        return this.nombre.getValue();
    }

    getDescripcion(): string {
        return this.descripcion.getValue();
    }

    getDisponibilidad(): number {
        return this.disponibilidad;
    }

    getIdProducto(): string {
        return this.idProducto.getValue().getValue();
    }

}