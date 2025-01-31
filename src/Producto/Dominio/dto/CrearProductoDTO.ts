export class CrearProductoDTO {

    nombre: string;
    descripcion: string;
    precio: number;
    disponibilidad: number;

    constructor(nombre: string, descripcion: string, precio: number, disponibilidad: number){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }
}