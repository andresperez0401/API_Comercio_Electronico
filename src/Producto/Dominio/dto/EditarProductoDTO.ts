export class EditarProductoDTO {
    id : string;
    nombre: string;
    descripcion: string;
    precio: number;
    disponibilidad: number;

    constructor(id: string, nombre: string, descripcion: string, precio: number, disponibilidad: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }
}